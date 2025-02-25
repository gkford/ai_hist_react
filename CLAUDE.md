# Development Guidelines for ai_hist_react

## Build & Development Commands
- `yarn dev` - Start development server
- `yarn build` - Build for production (TypeScript + Vite)
- `yarn lint` - Run ESLint on codebase
- `yarn preview` - Preview production build
- `yarn deploy` - Deploy to GitHub Pages

## Code Style Guidelines

### Architecture
- React functional components with hooks
- Zustand for state management (see state_management_context.md)
- Tailwind CSS for styling

### TypeScript
- Use `interface` for complex objects, `type` for simpler definitions
- Explicit type annotations on function parameters and returns
- Extend interfaces when needed (e.g., `CardState extends CardDefinition`)

### Naming Conventions
- Components: PascalCase (CardDesign.tsx)
- Hooks/Stores: camelCase with 'use' prefix (useCardStore.ts)
- Variables/Functions: camelCase
- Interfaces/Types: PascalCase with 'I' prefix for interfaces optional

### Imports
- React/external libraries first
- Local components with @/ paths
- Local utility/helper imports last

### Component Structure
- Use React.forwardRef pattern for components with refs
- Set displayName property for debugging
- Use named exports, not default exports

### Error Handling
- Null checks with early returns
- Optional chaining for potentially undefined values
- Conditional rendering with ternary operators