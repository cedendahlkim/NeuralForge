# Contributing to NeuralForge

Thank you for your interest in contributing to NeuralForge! We welcome contributions from developers, AI researchers, and enthusiasts of all skill levels.

## 🚀 Quick Start

1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/yourusername/NeuralForge.git
   cd NeuralForge
   ```

3. **Set up development environment**
   ```bash
   # Install Python dependencies
   pip install -e .[dev]
   
   # Install Node.js dependencies
   npm install
   cd ui && npm install && cd ..
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## 📋 How to Contribute

### 🐛 Reporting Bugs

- Use the [issue tracker](https://github.com/gracestack/NeuralForge/issues) for bug reports
- Include:
  - Clear description of the issue
  - Steps to reproduce
  - Expected vs actual behavior
  - Environment details (OS, Python/Node version, etc.)
  - Relevant logs or screenshots

### 💡 Feature Requests

- Open an issue with the "enhancement" label
- Describe the feature and its use case
- Explain why it would be valuable
- Consider if it aligns with our project goals

### 🔧 Code Contributions

#### Areas Where We Need Help

- **Core Agent Engine**: Improve agent execution, memory systems
- **Skill Generation**: Enhance AI skill creation and optimization
- **UI/UX**: Build better visual interfaces for agent building
- **Integrations**: Add new platform integrations (Discord, Slack, etc.)
- **Documentation**: Improve guides, API docs, tutorials
- **Testing**: Write unit tests, integration tests, E2E tests

#### Development Workflow

1. **Create an issue** (or comment on existing one) to discuss your approach
2. **Create a branch** from `main`:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes** following our coding standards
4. **Test your changes**:
   ```bash
   # Run Python tests
   pytest
   
   # Run Node.js tests
   npm test
   
   # Run linting
   black .
   isort .
   flake8 .
   npm run lint
   ```
5. **Commit your changes**:
   ```bash
   git commit -m 'feat: add amazing feature'
   ```
6. **Push to your fork**:
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request** with a clear description

## 🎯 Coding Standards

### Python

- Use **Black** for code formatting
- Use **isort** for import sorting
- Follow **PEP 8** style guide
- Add type hints to all functions
- Write docstrings for all modules and functions
- Keep functions focused and small

### TypeScript/JavaScript

- Use **Prettier** for code formatting
- Use **ESLint** for linting
- Prefer functional programming patterns
- Add JSDoc comments for complex functions
- Use TypeScript strict mode

### General Guidelines

- Write **self-documenting code**
- Keep **commit messages** clear and conventional
- Add **tests** for new features
- Update **documentation** as needed
- Consider **performance** implications

## 🧪 Testing

### Running Tests

```bash
# Python tests
pytest

# Node.js tests
npm test

# Coverage report
pytest --cov=neural_forge
npm run test:coverage
```

### Writing Tests

- **Unit tests** for individual functions
- **Integration tests** for component interactions
- **E2E tests** for user workflows
- Mock external dependencies
- Test edge cases and error conditions

## 📚 Documentation

### Types of Documentation

- **API Documentation**: Generated from docstrings
- **User Guides**: Step-by-step tutorials
- **Developer Docs**: Architecture and contribution guides
- **Examples**: Code snippets and use cases

### Writing Documentation

- Use clear, simple language
- Include code examples
- Add screenshots for UI features
- Keep documentation up-to-date

## 🏗️ Architecture

### Core Components

- **AgentManager**: Manages AI agents lifecycle
- **SkillGenerator**: Creates and optimizes agent skills
- **ModelManager**: Handles AI model interactions
- **IntegrationHub**: Manages external integrations
- **MemorySystem**: Stores and retrieves agent memories

### Design Principles

- **Modularity**: Components should be independent
- **Extensibility**: Easy to add new features
- **Performance**: Optimize for speed and efficiency
- **Security**: Follow security best practices
- **Usability**: Prioritize developer experience

## 🤝 Community

### Code of Conduct

We are committed to providing a welcoming and inclusive environment. Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md).

### Getting Help

- **Discord**: Join our [Discord community](https://discord.gg/neuralforge)
- **GitHub Issues**: Ask questions and report problems
- **Documentation**: Check our [docs](https://docs.neuralforge.dev)
- **Discussions**: Participate in GitHub Discussions

### Recognition

- Contributors are recognized in our README
- Top contributors get special Discord roles
- Exceptional contributions may be invited to the core team

## 🎁 Contribution Types

### 🐛 Bug Fixes
- Small fixes: `patch` version bump
- Critical fixes: `minor` version bump

### ✨ Features
- New features: `minor` version bump
- Breaking changes: `major` version bump

### 📝 Documentation
- Improved docs: No version bump needed
- New guides: `patch` version bump

### 🧪 Tests
- Added tests: No version bump needed
- Test improvements: No version bump needed

## 🏆 Recognition

### Contributor Levels

- **Contributor**: 1+ merged PRs
- **Active Contributor**: 5+ merged PRs
- **Core Contributor**: 20+ merged PRs
- **Maintainer**: By invitation only

### Benefits

- GitHub contributor badge
- Discord role and recognition
- Early access to new features
- Input on project direction
- Potential for paid opportunities

## 📋 Release Process

1. **Development** happens on `main`
2. **Release candidates** are created for testing
3. **Stable releases** are tagged and published
4. **Documentation** is updated with each release

## 🔧 Development Tools

### Recommended VS Code Extensions

- Python extension
- TypeScript and JavaScript Language Features
- Prettier - Code formatter
- ESLint
- GitLens
- Docker

### Environment Setup

```bash
# Python virtual environment
python -m venv venv
source venv/bin/activate  # Linux/Mac
# or
venv\Scripts\activate  # Windows

# Pre-commit hooks
pre-commit install
```

## 🎯 Current Priorities

We're currently focusing on:

1. **🤖 Agent Performance**: Improve execution speed and reliability
2. **🎨 UI/UX**: Enhance the visual builder interface
3. **🔗 Integrations**: Add more platform connections
4. **📚 Documentation**: Improve guides and API docs
5. **🧪 Testing**: Increase test coverage

Check our [project board](https://github.com/gracestack/NeuralForge/projects) for current tasks.

## 💫 Thank You!

Every contribution helps make NeuralForge better. Whether you're fixing a typo, adding a feature, or reporting a bug, we appreciate your effort to improve the project.

**Happy coding! 🚀**
