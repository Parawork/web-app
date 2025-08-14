# Documentation

This folder contains project documentation and setup guides:

## Setup Guides
- `SUPABASE_SETUP.md` - Instructions for setting up Supabase database
- `CHATBOT_SETUP.md` - ChatBot integration guide
- `CHATBOT_WORKING.md` - ChatBot implementation details
- `backend-setup.md` - Backend setup instructions

## Testing
- `TESTING.md` - Test suite documentation and instructions

## Project Structure
The main project follows this organized structure:

```
src/
├── components/          # Organized component modules
│   ├── features/       # Feature-specific components (ChatBot, Project, Contact)
│   ├── layout/         # Layout components (Header)
│   ├── ui/            # Reusable UI components (FuturisticParticles)
│   └── index.ts       # Centralized component exports
├── pages/             # Page components
├── hooks/             # Custom React hooks
├── services/          # API services
├── config/            # Configuration files
├── contexts/          # React contexts
├── utils/             # Utility functions
├── types/             # TypeScript type definitions
└── assets/            # Static assets
```
