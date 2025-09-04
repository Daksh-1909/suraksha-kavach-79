# Suraksha Kavach - Disaster Preparedness Education Platform

## Project Overview

Suraksha Kavach is an interactive disaster preparedness education platform designed for schools and colleges. The platform provides gamified learning modules, virtual emergency drills, real-time safety protocols, and comprehensive disaster response training.

## Features

- **Interactive Learning Modules**: Gamified disaster preparedness education
- **Virtual Emergency Drills**: Practice emergency response scenarios
- **Real-time Safety Protocols**: Access to emergency procedures and contacts
- **AI-Powered Chat Assistant**: Get instant answers to safety questions
- **Progress Tracking**: Monitor learning progress and achievements
- **Emergency SOS System**: Quick access to emergency services
- **Evacuation Maps**: Interactive building evacuation routes
- **Admin Dashboard**: Comprehensive management tools for educators

## How to run this project locally

**Prerequisites**

Make sure you have Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

**Installation Steps**

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd suraksha-kavach

# Step 3: Install dependencies
npm install

# Step 4: Start the development server
npm run dev
```

The application will be available at `http://localhost:8080`

## Development

**Build for production**
```sh
npm run build
```

**Preview production build**
```sh
npm run preview
```

## Technology Stack

This project is built with modern web technologies:

**Frontend**
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe JavaScript for better development experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **shadcn/ui** - Beautiful, accessible React components built on Radix UI

**UI Components & Libraries**
- **Radix UI** - Low-level UI primitives for accessibility
- **Lucide React** - Beautiful, customizable icons
- **React Hook Form** - Performant, flexible forms with easy validation
- **React Router DOM** - Declarative routing for React applications
- **Recharts** - Composable charting library for React

**Development Tools**
- **ESLint** - Code linting and quality assurance
- **PostCSS** - CSS processing and optimization
- **Class Variance Authority** - Type-safe component variants

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components (shadcn/ui)
│   └── ...             # Feature-specific components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and configurations
├── pages/              # Route components
├── assets/             # Static assets (images, etc.)
└── main.tsx           # Application entry point
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
