import express from 'express';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import chalk from 'chalk';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import { AgentManager } from './agent/AgentManager';
import { SkillGenerator } from './skills/SkillGenerator';
import { IntegrationHub } from './integrations/IntegrationHub';
import { ModelManager } from './models/ModelManager';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ServerOptions {
  port: number;
  host: string;
  dev: boolean;
}

export async function startServer(options: ServerOptions) {
  const app = express();
  const server = createServer(app);
  const io = new SocketIOServer(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  // Middleware
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.tailwindcss.com"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'", "ws:", "wss:"]
      }
    }
  }));
  app.use(compression());
  app.use(cors());
  app.use(morgan('combined'));
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // Static files
  app.use('/static', express.static(path.join(__dirname, '../static')));
  app.use(express.static(path.join(__dirname, '../ui/dist')));

  // Initialize core components
  const agentManager = new AgentManager();
  const skillGenerator = new SkillGenerator();
  const integrationHub = new IntegrationHub();
  const modelManager = new ModelManager();

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ 
      status: 'healthy', 
      version: '1.0.0',
      timestamp: new Date().toISOString()
    });
  });

  app.get('/api/models', async (req, res) => {
    try {
      const models = await modelManager.listModels();
      res.json(models);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch models' });
    }
  });

  app.get('/api/agents', async (req, res) => {
    try {
      const agents = await agentManager.listAgents();
      res.json(agents);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch agents' });
    }
  });

  app.post('/api/agents', async (req, res) => {
    try {
      const agent = await agentManager.createAgent(req.body);
      res.json(agent);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create agent' });
    }
  });

  app.get('/api/agents/:id', async (req, res) => {
    try {
      const agent = await agentManager.getAgent(req.params.id);
      res.json(agent);
    } catch (error) {
      res.status(404).json({ error: 'Agent not found' });
    }
  });

  app.post('/api/agents/:id/execute', async (req, res) => {
    try {
      const { input, context } = req.body;
      const result = await agentManager.executeAgent(req.params.id, input, context);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to execute agent' });
    }
  });

  app.get('/api/integrations', async (req, res) => {
    try {
      const integrations = await integrationHub.listIntegrations();
      res.json(integrations);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch integrations' });
    }
  });

  app.post('/api/skills/generate', async (req, res) => {
    try {
      const { agentId, task, context } = req.body;
      const skill = await skillGenerator.generateSkill(agentId, task, context);
      res.json(skill);
    } catch (error) {
      res.status(500).json({ error: 'Failed to generate skill' });
    }
  });

  // WebSocket connections
  io.on('connection', (socket) => {
    console.log(chalk.blue(`Client connected: ${socket.id}`));

    socket.on('join-agent', (agentId) => {
      socket.join(`agent-${agentId}`);
      console.log(chalk.green(`Client ${socket.id} joined agent ${agentId}`));
    });

    socket.on('agent-execution', async (data) => {
      const { agentId, input, context } = data;
      
      try {
        // Start execution in background
        const execution = agentManager.executeAgent(agentId, input, context);
        
        // Emit progress updates
        socket.emit('execution-start', { agentId, timestamp: Date.now() });
        
        const result = await execution;
        socket.emit('execution-complete', { agentId, result });
        
      } catch (error) {
        socket.emit('execution-error', { agentId, error: error instanceof Error ? error.message : error });
      }
    });

    socket.on('disconnect', () => {
      console.log(chalk.yellow(`Client disconnected: ${socket.id}`));
    });
  });

  // Serve UI for all other routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../ui/dist/index.html'));
  });

  // Start server
  return new Promise<void>((resolve, reject) => {
    server.listen(options.port, options.host, () => {
      console.log(chalk.green(`🚀 NeuralForge server running on http://${options.host}:${options.port}`));
      console.log(chalk.blue(`📊 Dashboard: http://${options.host}:${options.port}/dashboard`));
      console.log(chalk.cyan(`🤖 Agent Builder: http://${options.host}:${options.port}/builder`));
      resolve();
    });

    server.on('error', (error) => {
      reject(error);
    });
  });
}
