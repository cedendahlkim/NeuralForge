#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { startServer } from './server';
import { createAgent } from './agent';
import { initializeProject } from './init';

const program = new Command();

program
  .name('neural-forge')
  .description('Visual AI Agent Builder with Self-Improving Local Agents')
  .version('1.0.0');

program
  .command('start')
  .description('Start the NeuralForge visual builder')
  .option('-p, --port <number>', 'Port to run on', '3000')
  .option('-h, --host <string>', 'Host to bind to', 'localhost')
  .option('--dev', 'Run in development mode')
  .action(async (options) => {
    const spinner = ora('Starting NeuralForge...').start();
    
    try {
      await startServer({
        port: parseInt(options.port),
        host: options.host,
        dev: options.dev || false
      });
      
      spinner.succeed(chalk.green('NeuralForge started successfully!'));
      console.log(chalk.blue(`\n🚀 Open your browser and navigate to:`));
      console.log(chalk.cyan(`   http://${options.host}:${options.port}`));
      console.log(chalk.gray(`\n💡 Press Ctrl+C to stop the server`));
      
    } catch (error) {
      spinner.fail(chalk.red('Failed to start NeuralForge'));
      console.error(chalk.red(error instanceof Error ? error.message : error));
      process.exit(1);
    }
  });

program
  .command('create-agent')
  .description('Create a new AI agent')
  .argument('<name>', 'Agent name')
  .option('-t, --template <template>', 'Template to use', 'personal-assistant')
  .option('-d, --description <description>', 'Agent description')
  .action(async (name, options) => {
    const spinner = ora(`Creating agent: ${name}...`).start();
    
    try {
      const agent = await createAgent({
        name,
        template: options.template,
        description: options.description
      });
      
      spinner.succeed(chalk.green(`Agent "${name}" created successfully!`));
      console.log(chalk.blue(`\n📝 Agent ID: ${agent.id}`));
      console.log(chalk.cyan(`🎯 Template: ${options.template}`));
      
    } catch (error) {
      spinner.fail(chalk.red('Failed to create agent'));
      console.error(chalk.red(error instanceof Error ? error.message : error));
      process.exit(1);
    }
  });

program
  .command('init')
  .description('Initialize a new NeuralForge project')
  .argument('[name]', 'Project name')
  .option('-t, --template <template>', 'Project template', 'default')
  .action(async (name, options) => {
    const projectName = name || 'neural-forge-project';
    const spinner = ora(`Initializing project: ${projectName}...`).start();
    
    try {
      await initializeProject({
        name: projectName,
        template: options.template
      });
      
      spinner.succeed(chalk.green(`Project "${projectName}" initialized!`));
      console.log(chalk.blue(`\n📁 Created directory: ${projectName}/`));
      console.log(chalk.cyan(`🚀 Get started: cd ${projectName} && neural-forge start`));
      
    } catch (error) {
      spinner.fail(chalk.red('Failed to initialize project'));
      console.error(chalk.red(error instanceof Error ? error.message : error));
      process.exit(1);
    }
  });

program
  .command('version')
  .description('Show version information')
  .action(() => {
    console.log(chalk.blue('NeuralForge v1.0.0'));
    console.log(chalk.gray('Built with ❤️ by Gracestack AB'));
    console.log(chalk.cyan('https://neuralforge.dev'));
  });

program.parse();
