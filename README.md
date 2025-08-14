# CB Construction - Future Building Solutions 🏗️

A modern, futuristic web application for CB Construction showcasing smart building solutions, sustainable technologies, and innovative construction services.

## ✨ Features

### 🎨 Design & UI
- **Dual Theme Support**: Seamless dark/light mode with system preference detection
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Modern Glass Morphism**: Beautiful glass card effects and backdrop blur
- **Animated Backgrounds**: Dynamic floating particles and gradient animations
- **Smooth Transitions**: Polished animations and hover effects

### 🚀 Core Functionality
- **Smart Dashboard**: Interactive project showcase with real-time statistics
- **Dynamic Theme Toggle**: Manual override with automatic system theme detection
- **Live Clock**: Real-time display in the header
- **Auto-rotating Projects**: Automatic project carousel with hover interactions
- **Contact Form**: Modern contact form with project type selection

### 🏢 Business Sections
- **Hero Section**: Compelling introduction with technology stack preview
- **Services**: Smart Commercial, Future Living, Digital Infrastructure, Adaptive Renovation
- **Featured Projects**: Showcase of major construction projects with progress tracking
- **Awards & Recognition**: Company achievements and certifications
- **Statistics**: Live company metrics and performance indicators
- **Technology**: Innovation showcase with AI, IoT, and sustainable tech

## 🛠️ Tech Stack

### Frontend
- **React 19.1.0** - Modern UI library with latest features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework

### UI Components & Icons
- **Lucide React** - Beautiful icon library
- **Framer Motion** - Smooth animations and transitions
- **Custom Components** - Reusable, theme-aware components

### Development Tools
- **ESLint** - Code linting and quality assurance
- **TypeScript Compiler** - Type checking and compilation
- **PostCSS** - CSS processing and optimization

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd web-app
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Start development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
# Build the application
pnpm build

# Preview the build
pnpm preview
```

## 📁 Project Structure

```
src/
├── components/          # Organized component modules
│   ├── features/       # Feature-specific components
│   │   ├── ChatBot.tsx    # AI ChatBot component
│   │   ├── Project.tsx    # Project showcase component
│   │   └── contact.tsx    # Contact form component
│   ├── layout/         # Layout components
│   │   └── Header.tsx     # Main header component
│   ├── ui/            # Reusable UI components
│   │   └── FuturisticParticles.tsx  # Animated background
│   └── index.ts       # Centralized component exports
├── pages/             # Application pages
│   ├── Dashboard.tsx  # Main dashboard page
│   ├── Profile.tsx    # User profile page
│   ├── Signin.tsx     # Sign in page
│   └── Signup.tsx     # Sign up page
├── hooks/             # Custom React hooks
│   └── useProjects.ts # Projects data management
├── services/          # API services
│   └── chatBotService.ts  # ChatBot API integration
├── config/            # Configuration files
│   ├── supabase.ts    # Supabase client setup
│   └── chatBotConfig.ts   # ChatBot configuration
├── contexts/          # React contexts
│   └── ThemeContext.tsx   # Theme management
├── utils/             # Utility functions
│   └── cookies.ts     # Cookie management utilities
├── types/             # TypeScript type definitions
│   └── index.ts       # Centralized type exports
├── assets/            # Static assets
└── App.tsx           # Root application component
```

### Documentation
- `docs/` - Setup guides and documentation
- `database/` - SQL scripts for database setup
- `tests/` - Test files and test documentation
```

## 🎯 Key Components

### Dashboard (`/src/pages/Dashboard.tsx`)
- Main application page with all sections
- Theme management and state handling
- Responsive layout and navigation
- Integration of all business sections

### Contact (`/src/components/contact.tsx`)
- Theme-aware contact form
- Project type selection
- Responsive design
- Form validation ready

### FuturisticParticles (`/src/components/FuturisticParticles.tsx`)
- Animated background elements
- Performance optimized
- Mobile-friendly rendering

## 🎨 Theme System

The application features a sophisticated dual-theme system:

### Dark Mode (Default)
- Deep blue/slate gradients
- Glass morphism effects
- Cyan/purple accent colors
- High contrast for readability

### Light Mode
- Clean white backgrounds
- Warm subtle gradients
- Enhanced contrast ratios
- Eye-comfortable design

### Theme Features
- **System Detection**: Automatically detects user's system preference
- **Manual Override**: Toggle button for user preference
- **Persistent State**: Maintains theme choice across sessions
- **Smooth Transitions**: Animated theme switching

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Enhanced layouts for tablet screens
- **Desktop Enhanced**: Full-featured desktop experience
- **Touch Friendly**: Optimized touch targets and interactions

## 🔧 Configuration

### Tailwind CSS
Custom configuration in `tailwind.config.js` with:
- Custom color schemes for dark/light themes
- Extended spacing and sizing utilities
- Animation utilities and transitions
- Typography enhancements
- Glass morphism utilities
- Responsive breakpoint customizations

### Vite Configuration
Optimized build settings in `vite.config.ts`:
- React plugin configuration
- Build optimization and minification
- Development server settings
- Hot module replacement (HMR)
- Asset handling and optimization

### TypeScript Configuration
Multi-configuration setup:
- `tsconfig.json` - Base TypeScript configuration
- `tsconfig.app.json` - Application-specific settings
- `tsconfig.node.json` - Node.js environment configuration

### ESLint Configuration
Modern ESLint setup in `eslint.config.js`:
- React-specific rules and hooks
- TypeScript integration
- Modern JavaScript features
- Code quality enforcement

## 📦 Available Scripts

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm preview      # Preview production build
pnpm lint         # Run ESLint

# Alternative with npm
npm run dev
npm run build
npm run preview
npm run lint
```

## 🚀 Deployment

The application is built as a static site and can be deployed to various platforms:

### Recommended Platforms
- **Vercel** (Recommended for React/Vite projects)
  ```bash
  # Install Vercel CLI
  npm i -g vercel
  
  # Deploy
  vercel --prod
  ```

- **Netlify** (Drag-and-drop or Git integration)
  ```bash
  # Build command: npm run build
  # Publish directory: dist
  ```

- **GitHub Pages** (Free hosting)
  ```bash
  # Set base in vite.config.ts
  base: '/repository-name/'
  ```

### Build Configuration
```bash
# Production build
pnpm build

# Build output location
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   └── index-[hash].css
└── vite.svg
```

### Environment Variables
For production deployment, consider setting:
```bash
VITE_APP_NAME="CB Construction"
VITE_API_URL="https://api.cbconstruction.lk"
VITE_CONTACT_EMAIL="contact@cbconstruction.lk"
```

## 🎯 Performance Features

- **Code Splitting**: Automatic code splitting for optimal loading times
- **Tree Shaking**: Unused code elimination for smaller bundles
- **Asset Optimization**: Compressed images and optimized assets
- **Lazy Loading**: Components loaded on demand for better performance
- **Responsive Images**: Optimized for different screen sizes and resolutions
- **Bundle Analysis**: Built-in bundle size optimization
- **Memory Management**: Efficient React hooks and state management
- **Render Optimization**: Memoization and performance optimizations

## 🌐 Browser Compatibility

- **Chrome**: Latest version (recommended)
- **Firefox**: Latest version
- **Safari**: Latest version (iOS 12+)
- **Edge**: Latest version
- **Mobile Browsers**: iOS Safari, Chrome Mobile, Samsung Internet

## 📊 Key Metrics & Features

### User Experience
- **First Load**: < 3 seconds on 3G networks
- **Interactive**: < 1 second after load
- **Accessibility**: WCAG 2.1 AA compliant
- **Mobile Performance**: 90+ Lighthouse score

### Technical Metrics
- **Bundle Size**: Optimized for fast loading
- **Code Coverage**: High test coverage
- **Type Safety**: 100% TypeScript coverage
- **Component Reusability**: Modular architecture

## 🔒 Best Practices & Code Quality

### Development Standards
- **TypeScript**: Full type safety throughout the application
- **Component Architecture**: Reusable and maintainable components
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support
- **SEO Ready**: Semantic HTML, meta tags, and structured data
- **Performance**: Optimized rendering, animations, and state management

### Code Quality Tools
- **ESLint**: Linting and code quality enforcement
- **Prettier**: Code formatting and consistency
- **TypeScript**: Static type checking
- **Husky**: Git hooks for pre-commit quality checks

### Security Considerations
- **XSS Protection**: Sanitized user inputs
- **HTTPS**: Secure communication protocols
- **Content Security Policy**: Implemented security headers
- **Dependency Management**: Regular security audits

## 🐛 Troubleshooting

### Common Issues

**Build Errors**
```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Type checking
pnpm tsc --noEmit
```

**Development Server Issues**
```bash
# Check port availability
lsof -ti:5173

# Use different port
pnpm dev --port 3000
```

**Theme Not Switching**
- Check browser's system theme settings
- Clear local storage: `localStorage.clear()`
- Verify theme toggle button functionality

## 🧪 Testing

### Testing Strategy
- **Unit Tests**: Component testing with React Testing Library
- **Integration Tests**: User interaction flows
- **E2E Tests**: Full application testing with Playwright
- **Visual Regression**: Screenshot testing for UI consistency

### Running Tests
```bash
# Unit tests
pnpm test

# Coverage report
pnpm test:coverage

# E2E tests
pnpm test:e2e
```

## 🤝 Contributing

We welcome contributions to improve the CB Construction web application!

### Development Workflow
1. **Fork** the repository
2. **Clone** your fork locally
   ```bash
   git clone https://github.com/your-username/cb-construction-app.git
   cd cb-construction-app
   ```
3. **Create** a feature branch
   ```bash
   git checkout -b feature/amazing-feature
   ```
4. **Install** dependencies
   ```bash
   pnpm install
   ```
5. **Make** your changes
6. **Test** your changes
   ```bash
   pnpm lint
   pnpm build
   ```
7. **Commit** your changes
   ```bash
   git commit -m 'feat: add amazing feature'
   ```
8. **Push** to your branch
   ```bash
   git push origin feature/amazing-feature
   ```
9. **Open** a Pull Request

### Contribution Guidelines
- Follow the existing code style and conventions
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

### Code Style
- Use TypeScript for all new code
- Follow ESLint and Prettier configurations
- Use semantic commit messages
- Document complex logic with comments

## 📄 License

This project is proprietary software for CB Construction Sri Lanka.

## 📧 Contact

For support or inquiries:
- **Email**: future@cbconstruction.lk
- **Phone**: +94 77 352 8200
- **Address**: 123 Future Avenue, Colombo 03, Sri Lanka

---

**Built with ❤️ for the future of construction in Sri Lanka**
