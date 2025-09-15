# Developer Portfolio 2025

A modern, interactive portfolio website built with React, TypeScript, and Tailwind CSS. Features engaging mini-games, animations, and a sleek dark theme design.

## Features

### Core Components
- **Hero Section** - Animated landing page with dynamic background
- **About** - Personal information and background
- **Services** - Professional services offered
- **Skills** - Technical skills showcase
- **Portfolio** - Project gallery and work samples
- **Contact** - Contact form and information
- **Footer** - Site links and social media

### Interactive Features
- **Custom Cursor** - Enhanced cursor with animations
- **Animated Background** - Dynamic visual effects
- **Scroll Progress Indicator** - Visual scroll tracking
- **Voice Commands** - Voice control integration
- **Confirmation Modals** - User action confirmations

### Mini Games & Tools
- **Snake Game** - Classic snake game implementation
- **Typing Test** - Speed typing challenge
- **Reaction Test** - Reaction time measurement game
- **JS Engine Visualizer** - JavaScript engine visualization tool

## Tech Stack

### Frontend Framework
- **React 18.3.1** - UI library
- **TypeScript 4.9.5** - Type safety
- **React Router 7.9.1** - Routing and navigation

### Styling
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **PostCSS 8.5.6** - CSS processing
- **Autoprefixer 10.4.21** - CSS vendor prefixing

### Animation & UI
- **Framer Motion 12.23.12** - Animation library
- **React Icons 4.12.0** - Icon components

### Development Tools
- **ESLint** - Code linting
- **Prettier 3.6.2** - Code formatting
- **React Scripts 5.0.1** - Build tooling

### Testing
- **Jest** - Testing framework
- **React Testing Library** - Component testing
- **Web Vitals** - Performance monitoring

## Installation

### Prerequisites
- Node.js (v16 or higher)
- Yarn package manager

### Setup

1. Clone the repository:
```bash
git clone [repository-url]
cd developer-portfolio-2025
```

2. Install dependencies:
```bash
yarn install
```

3. Create environment variables:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
yarn start
```

The application will open at [http://localhost:3000](http://localhost:3000)

## Available Scripts

### Development
- `yarn start` - Run development server
- `yarn build` - Build for production
- `yarn test` - Run test suite
- `yarn eject` - Eject from Create React App (irreversible)

### Code Quality
- `yarn lint` - Check for linting errors
- `yarn lint:fix` - Auto-fix linting errors
- `yarn format` - Format code with Prettier
- `yarn format:check` - Check code formatting
- `yarn typecheck` - Run TypeScript type checking
- `yarn check-all` - Run all checks (typecheck, lint, format)
- `yarn fix-all` - Fix all auto-fixable issues

## Project Structure

```
developer-portfolio-2025/
├── public/              # Static assets
├── src/
│   ├── assets/         # Images, fonts, etc.
│   ├── components/     # React components
│   │   ├── About.tsx
│   │   ├── AnimatedBackground.tsx
│   │   ├── Contact.tsx
│   │   ├── CustomCursor.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── HomePage.tsx
│   │   ├── Navigation.tsx
│   │   ├── Portfolio.tsx
│   │   ├── Services.tsx
│   │   ├── Skills.tsx
│   │   └── ...
│   ├── pages/          # Page components
│   │   ├── JSEngineVisualizerPage.tsx
│   │   ├── ReactionTestPage.tsx
│   │   ├── SnakeGamePage.tsx
│   │   └── TypingTestPage.tsx
│   ├── styles/         # Global styles
│   ├── utils/          # Utility functions
│   ├── data/           # Static data
│   ├── App.tsx         # Main app component
│   ├── index.tsx       # Entry point
│   └── index.css       # Global CSS
├── .eslintrc.json      # ESLint configuration
├── .prettierrc         # Prettier configuration
├── tailwind.config.js  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
├── package.json        # Project dependencies
└── yarn.lock          # Locked dependencies
```

## Configuration Files

### TypeScript Configuration
- Strict type checking enabled
- JSX support for React
- ES6+ target compilation

### ESLint Configuration
- React and TypeScript rules
- Prettier integration for consistent formatting

### Tailwind Configuration
- Custom theme extensions
- Responsive design utilities
- Dark mode support

## Browser Support

### Production
- Modern browsers (>0.2% market share)
- Not dead browsers
- No Opera Mini

### Development
- Latest Chrome
- Latest Firefox
- Latest Safari

## Deployment

Build the project for production:

```bash
yarn build
```

The build folder will contain optimized static files ready for deployment to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- AWS S3
- Firebase Hosting

## Performance Optimization

- Code splitting with React.lazy()
- Image optimization
- CSS minification
- JavaScript bundling and minification
- Tree shaking for unused code removal

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For any inquiries or feedback, please reach out through the contact form on the website or open an issue in the repository.

## Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first approach
- Framer Motion for smooth animations
- All open-source contributors