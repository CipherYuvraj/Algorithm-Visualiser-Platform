🎯 Contributing to Algorithm Visualizer Pro
Thank you for your interest in contributing to Algorithm Visualizer Pro! We're excited to have you join our mission to make algorithm learning accessible and engaging through interactive visualizations. 🚀

📋 Table of Contents
- [Getting Started](#-getting-started)
- [Development Setup](#️-development-setup)
- [Contribution Workflow](#-contribution-workflow)
- [Branch Naming Conventions](#-branch-naming-conventions)
- [Coding Standards](#-coding-standards)
- [Pull Request Process](#-pull-request-process)
- [Issue Guidelines](#-issue-guidelines)
- [Community Guidelines](#-community-guidelines)

🚀 Getting Started
Prerequisites
Before you begin, ensure you have the following installed:

- **Node.js** (v18.x or higher) - [Download here](https://nodejs.org/)
- **npm** (v8.x or higher) - Usually comes with Node.js
- **Python** (v3.11 or higher) - [Download here](https://python.org/)
- **Git** - [Download here](https://git-scm.com/)
- **Code Editor** - We recommend [VS Code](https://code.visualstudio.com/)

Tech Stack
- **Frontend**: React 18 + Vite + TailwindCSS + Canvas API + Lucide Icons
- **Backend**: FastAPI + Python + Uvicorn + Pydantic
- **Deployment**: Vercel (Frontend) + Render/Railway (Backend)
- **Containerization**: Docker + Docker Compose
- **Algorithms**: Sorting, Graph, String, Dynamic Programming
- **Visualization**: HTML5 Canvas + Custom Animation Engine
- **Testing**: Jest + React Testing Library + Pytest

🛠️ Development Setup

1. Fork and Clone the Repository
```bash
# Fork the repository on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/Algorithm-Visualizer-Platform.git
cd Algorithm-Visualizer-Platform

# Add the original repository as upstream
git remote add upstream https://github.com/CipherYuvraj/Algorithm-Visualizer-Platform.git
```

2. Install Dependencies
```bash
# Frontend dependencies
cd frontend
npm install

# Backend dependencies
cd ../backend
pip install -r requirements.txt

# Or use the convenience scripts
npm run install:all  # Install both frontend and backend dependencies
```

3. Environment Setup
```bash
# Copy environment files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Edit the .env files with your configuration
```

Required Environment Variables:
```bash
# Backend (.env)
ENVIRONMENT=development
PORT=8000
CORS_ORIGINS=["http://localhost:3000", "http://localhost:5173"]

# Frontend (.env)
VITE_API_BASE_URL=http://localhost:8000
VITE_APP_TITLE="Algorithm Visualizer Pro"
VITE_ENABLE_ANALYTICS=false
```

4. Start Development Servers
```bash
# Start both frontend and backend simultaneously
npm run dev

# Or start individually:
npm run dev:backend   # Backend on port 8000
npm run dev:frontend  # Frontend on port 3000
```

5. Verify Setup
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/health

🔄 Contribution Workflow

1. Create a New Branch
```bash
# Sync with upstream
git checkout main
git pull upstream main

# Create a new branch (see naming conventions below)
git checkout -b feature/dijkstra-algorithm-visualization
```

2. Make Your Changes
- Write clean, readable code
- Follow our coding standards
- Add tests for new features
- Update documentation as needed
- Test algorithm visualizations thoroughly

3. Test Your Changes
```bash
# Frontend tests
cd frontend
npm test
npm run lint
npm run type-check
npm run build

# Backend tests
cd backend
pytest
python -m flake8
python main.py --test
```

4. Commit Your Changes
```bash
# Stage your changes
git add .

# Commit with a descriptive message
git commit -m "feat: add Dijkstra's algorithm visualization

- Implement shortest path visualization with step-by-step execution
- Add interactive controls for speed and step-through mode
- Include performance metrics and complexity analysis
- Add comprehensive test coverage

Closes #123"
```

🌿 Branch Naming Conventions
Use descriptive branch names that follow this pattern:

Branch Types
- `feature/` - New algorithms or features
- `bugfix/` - Bug fixes
- `hotfix/` - Critical production fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Adding or updating tests
- `chore/` - Maintenance tasks
- `ui/` - UI/UX improvements

Examples
- `feature/bubble-sort-animation`
- `feature/graph-builder-interface`
- `bugfix/canvas-rendering-performance`
- `hotfix/api-timeout-handling`
- `docs/algorithm-complexity-guide`
- `refactor/visualization-engine-cleanup`
- `test/add-e2e-algorithm-execution`
- `ui/dark-mode-improvements`

Issue-Based Branches
If working on a specific issue, include the issue number:
- `feature/issue-45-binary-search-tree`
- `bugfix/issue-78-mobile-canvas-touch`

📝 Coding Standards

TypeScript/JavaScript Guidelines
- Use TypeScript for new frontend code
- Define interfaces for all data structures
- Avoid `any` type - use proper typing
- Use meaningful variable names

```typescript
// Good
interface AlgorithmStep {
  id: number;
  description: string;
  highlightedElements: number[];
  complexity: TimeComplexity;
}

// Avoid
const step: any = { ... };
```

React Guidelines
- Use functional components with hooks
- Use TypeScript interfaces for props
- Follow component structure:

```tsx
interface AlgorithmVisualizerProps {
  algorithm: string;
  data: number[];
  speed: number;
}

const AlgorithmVisualizer: React.FC<AlgorithmVisualizerProps> = ({ 
  algorithm, 
  data, 
  speed 
}) => {
  // Hooks
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  
  // Event handlers
  const handlePlay = () => setIsPlaying(!isPlaying);
  
  // Render logic
  return (
    <div className="algorithm-visualizer">
      {/* JSX */}
    </div>
  );
};

export default AlgorithmVisualizer;
```

Python Guidelines
- Follow PEP 8 style guide
- Use type hints for all functions
- Write docstrings for classes and functions
- Use meaningful variable names

```python
from typing import List, Dict, Optional

class AlgorithmService:
    """Service for executing and tracking algorithm steps."""
    
    async def execute_algorithm(
        self, 
        algorithm: str, 
        data: List[int]
    ) -> Dict[str, any]:
        """
        Execute algorithm and return step-by-step visualization data.
        
        Args:
            algorithm: Name of the algorithm to execute
            data: Input data for the algorithm
            
        Returns:
            Dictionary containing algorithm steps and metadata
        """
        # Implementation
```

Canvas & Visualization Guidelines
- Use RequestAnimationFrame for smooth animations
- Implement proper cleanup for canvas contexts
- Handle different screen sizes and pixel ratios
- Optimize for 60fps performance

```typescript
// Good canvas usage
const animate = useCallback(() => {
  if (!canvasRef.current) return;
  
  const ctx = canvasRef.current.getContext('2d');
  if (!ctx) return;
  
  // Clear and redraw
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawVisualization(ctx, currentState);
  
  if (isPlaying) {
    animationFrameRef.current = requestAnimationFrame(animate);
  }
}, [currentState, isPlaying]);
```

Code Formatting
We use Prettier and ESLint for consistent formatting:

```bash
# Frontend formatting
npm run format
npm run lint
npm run lint:fix

# Backend formatting
black .
flake8 .
```

Naming Conventions
- **Files**: kebab-case (`sorting-visualizer.tsx`)
- **Components**: PascalCase (`SortingVisualizer`)
- **Variables/Functions**: camelCase (`executeAlgorithm`)
- **Constants**: UPPER_SNAKE_CASE (`DEFAULT_ANIMATION_SPEED`)
- **CSS Classes**: kebab-case (`algorithm-step-highlight`)

CSS/Styling Guidelines
- Use TailwindCSS utility classes primarily
- Follow responsive-first approach
- Use consistent spacing (4, 8, 16, 24, 32px scale)
- Algorithm-themed color palette:

```css
/* Primary colors */
blue-500 to blue-700   /* Primary actions */
green-500 to green-700 /* Success/completed */
red-500 to red-700     /* Current/active */
yellow-400 to yellow-600 /* Comparing */
gray-100 to gray-800   /* Default/inactive */
```

Git Commit Messages
Follow the Conventional Commits specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Types:
- `feat`: New algorithm or feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `perf`: Performance improvements

Examples:
```
feat(sorting): add heap sort visualization with step controls
fix(canvas): resolve mobile touch interaction issues
docs(api): update algorithm endpoint documentation
test(graph): add unit tests for BFS traversal logic
perf(animation): optimize canvas rendering for large datasets
```

🔄 Pull Request Process

1. Before Submitting
- [ ] Code follows the style guidelines
- [ ] Tests pass (`npm test` & `pytest`)
- [ ] Build succeeds (`npm run build`)
- [ ] No TypeScript errors (`npm run type-check`)
- [ ] Algorithm visualizations work correctly
- [ ] Documentation is updated (if applicable)
- [ ] Commit messages follow conventions

2. Pull Request Template
When creating a PR, use this template:

```markdown
## 🎯 Description
Brief description of the algorithm or feature added and its educational value.

## 🔧 Type of Change
- [ ] New algorithm implementation
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update
- [ ] Performance improvement

## 🧪 Testing
- [ ] Algorithm logic tests added/updated
- [ ] Visualization rendering tests added/updated
- [ ] Manual testing completed across different devices
- [ ] Performance testing for large datasets

## 📸 Screenshots/GIFs (if applicable)
Include screenshots or GIFs showing the algorithm visualization in action.

## 🎓 Educational Value
Explain how this contribution improves algorithm learning:
- What concepts does it teach?
- What makes the visualization effective?
- How does it compare to existing implementations?

## ✅ Checklist
- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in algorithm logic
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my algorithm works correctly
- [ ] New and existing unit tests pass locally with my changes
- [ ] The visualization is smooth and educational

## 🔗 Related Issues
Closes #123
Related to #456
```

3. Review Process
- **Automated Checks**: GitHub Actions will run tests and linting
- **Algorithm Review**: Maintainers will verify algorithm correctness
- **Visualization Review**: UI/UX review for educational effectiveness
- **Code Review**: General code quality and standards
- **Feedback**: Address any requested changes
- **Approval**: Once approved, your PR will be merged

🐛 Issue Guidelines

Reporting Bugs
Use the bug report template and include:

- **Environment**: OS, Node.js version, Python version, browser
- **Algorithm**: Which algorithm was being visualized
- **Steps to reproduce**: Clear, numbered steps
- **Expected behavior**: What should happen
- **Actual behavior**: What actually happens
- **Screenshots/Video**: If applicable, especially for visualization bugs
- **Console errors**: Browser console and terminal errors

Algorithm Requests
For new algorithm suggestions, include:

- **Algorithm name**: Clear name and category
- **Educational value**: Why this algorithm should be included
- **Complexity**: Time/space complexity information
- **Use cases**: Real-world applications
- **References**: Links to algorithm descriptions or papers
- **Visualization ideas**: How it could be effectively visualized

Good First Issues
Look for issues labeled:

- `good first issue` - Perfect for newcomers
- `help wanted` - We need community help
- `documentation` - Help improve our docs
- `frontend` - Frontend-specific tasks
- `backend` - Backend-specific tasks
- `algorithm` - New algorithm implementations
- `ui/ux` - User interface improvements

🌍 Community Guidelines

Code of Conduct
- Be respectful and inclusive to all contributors
- Use welcoming language and be patient with newcomers
- Focus on constructive feedback in code reviews
- Help others learn algorithms and programming concepts
- Share knowledge about algorithm optimization and visualization techniques

Getting Help
- **Discussions**: Use GitHub Discussions for questions
- **Issues**: Create an issue for bugs or feature requests
- **Email**: Contact yuvraj.udaywal45@gmail.com for urgent matters
- **Documentation**: Check our comprehensive docs first

Recognition
Contributors are recognized through:

- Contributors section in README
- Release notes crediting contributors
- Special algorithm-contributor badges
- Hacktoberfest participation (during October)
- Featured contributions in project showcase

🎯 Areas for Contribution

We especially welcome contributions in:

🎨 **Frontend Visualization**
- Canvas rendering optimizations
- Animation improvements and effects
- Mobile-responsive visualizations
- Accessibility improvements
- Dark/light theme enhancements

⚙️ **Backend Algorithms**
- New algorithm implementations
- Performance optimizations
- API endpoint improvements
- Error handling enhancements
- Algorithm complexity analysis

🧮 **Algorithm Categories**
- **Sorting**: Radix sort, Counting sort, Tim sort
- **Graph**: A* search, Floyd-Warshall, Bellman-Ford
- **String**: KMP, Rabin-Karp, Boyer-Moore
- **Dynamic Programming**: LCS, Knapsack variations, Edit distance
- **Tree**: AVL trees, Red-Black trees, B-trees
- **Advanced**: Machine learning algorithms, Cryptographic algorithms

📱 **Features**
- Algorithm comparison tools
- Performance benchmarking
- Code explanation system
- Progress tracking
- Social sharing features

📚 **Documentation**
- Algorithm explanations and tutorials
- API documentation
- Deployment guides
- Educational content
- Video tutorials

🧪 **Testing**
- Unit tests for algorithms
- Integration tests for visualizations
- Performance testing
- Cross-browser testing
- Mobile testing

🌟 Recognition

Contributor Levels
- 🌱 **Algorithm Seedling**: First contribution
- 🎯 **Visualization Contributor**: 5+ contributions
- 🚀 **Algorithm Expert**: 15+ contributions
- 🏆 **Visualization Master**: Core contributor with significant impact

Benefits
- Name in README contributors section
- Special badges in future platform features
- Priority support and feedback
- Input on project roadmap and algorithm priorities
- Potential maintainer invitation
- Conference speaking opportunities (when applicable)

📞 Contact

- **Project Maintainer**: Yuvraj Udaywal
- **Email**: yuvraj.udaywal45@gmail.com
- **GitHub**: [@CipherYuvraj](https://github.com/CipherYuvraj)
- **LinkedIn**: [Yuvraj Udaywal](https://www.linkedin.com/in/yuvraj-udaywal-7a5ba9275/)

## Algorithm Categories We're Looking For

### High Priority
- Advanced sorting algorithms (Radix, Counting, Bucket)
- Graph algorithms (A*, Floyd-Warshall, Topological Sort)
- String matching algorithms (KMP, Boyer-Moore)
- Tree traversal and balancing algorithms

### Medium Priority
- Dynamic programming problems
- Greedy algorithms
- Divide and conquer algorithms
- Cryptographic algorithms (educational purpose)

### Future Considerations
- Machine learning algorithm visualizations
- Quantum algorithm simulations
- Parallel algorithm demonstrations

Thank you for contributing to Algorithm Visualizer Pro! Together, we're making algorithm education more accessible and engaging for students worldwide. Every contribution helps build a better learning experience! 🎓💡

Happy coding and keep visualizing! 🚀✨