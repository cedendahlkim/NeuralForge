import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';

// Layout Components
import Layout from './components/Layout';
import Sidebar from './components/Sidebar';

// Page Components
import Dashboard from './pages/Dashboard';
import AgentBuilder from './pages/AgentBuilder';
import AgentsList from './pages/AgentsList';
import SkillsMarketplace from './pages/SkillsMarketplace';
import Integrations from './pages/Integrations';
import Settings from './pages/Settings';

// Hooks
import { useSocket } from './hooks/useSocket';

// Styles
import './styles/globals.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  useSocket('http://localhost:3000');

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gray-900 text-white">
          <Layout>
            <div className="flex h-screen">
              <Sidebar />
              
              <main className="flex-1 overflow-hidden">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="h-full"
                >
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/builder" element={<AgentBuilder />} />
                    <Route path="/agents" element={<AgentsList />} />
                    <Route path="/skills" element={<SkillsMarketplace />} />
                    <Route path="/integrations" element={<Integrations />} />
                    <Route path="/settings" element={<Settings />} />
                  </Routes>
                </motion.div>
              </main>
            </div>
          </Layout>
        </div>
      </Router>
      
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1f2937',
            color: '#f3f4f6',
            border: '1px solid #374151',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#1f2937',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#1f2937',
            },
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
