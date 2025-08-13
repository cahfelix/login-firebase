# System Patterns: Firebase Authentication System

## Architecture Patterns

### Component Architecture
```
App (Root)
├── Providers (Theme, Auth, Notifications)
├── Router (React Router)
├── Routes
│   ├── Public Routes (Login, Register)
│   └── Protected Routes (Dashboard)
└── Global Components (ProtectedRoute)
```

### State Management Pattern
- **Context API**: Global authentication state
- **Local State**: Component-specific UI state
- **Firebase State**: Server-side authentication state
- **Derived State**: Computed values from auth state

### Authentication Flow Pattern
1. **Initialization**: AuthProvider wraps app
2. **State Sync**: Firebase auth state listener
3. **Route Protection**: ProtectedRoute guards
4. **State Updates**: Context methods for auth actions
5. **Persistence**: Firebase handles token management

## Design Patterns

### Provider Pattern
```typescript
// AuthProvider wraps entire app
<AuthProvider>
  <App />
</AuthProvider>

// Components consume via hook
const { currentUser, login } = useAuth();
```

### Higher-Order Component Pattern
```typescript
// ProtectedRoute wraps protected components
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>
```

### Custom Hook Pattern
```typescript
// Encapsulates auth logic
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
```

### Error Boundary Pattern
- Global error handling for auth failures
- Graceful degradation for network issues
- User-friendly error messages

## Code Organization Patterns

### Feature-Based Structure
```
src/
├── components/     # Reusable UI components
├── contexts/       # Global state management
├── config/         # Configuration files
├── types/          # TypeScript definitions
└── utils/          # Helper functions
```

### Naming Conventions
- **Components**: PascalCase (Login.tsx, Dashboard.tsx)
- **Hooks**: camelCase with 'use' prefix (useAuth)
- **Constants**: UPPER_SNAKE_CASE
- **Files**: PascalCase for components, camelCase for utilities

### Import Organization
```typescript
// 1. React imports
import React, { useState } from 'react';

// 2. Third-party imports
import { Button, TextField } from '@mui/material';

// 3. Internal imports
import { useAuth } from '../contexts/AuthContext';
```

## Security Patterns

### Environment Variable Pattern
- Sensitive data in .env files
- Different configs for dev/prod
- Never commit actual secrets

### Route Protection Pattern
```typescript
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  
  if (loading) return <LoadingSpinner />;
  return currentUser ? children : <Navigate to="/login" />;
};
```

### Input Validation Pattern
- Client-side validation for UX
- Server-side validation via Firebase
- Sanitization of user inputs

## Error Handling Patterns

### Async Error Handling
```typescript
try {
  await login(email, password);
  navigate('/dashboard');
} catch (error) {
  setError('Login failed. Please check your credentials.');
}
```

### Global Error Handling
- Notification system for user feedback
- Console logging for debugging
- Graceful fallbacks for failures

## Performance Patterns

### Code Splitting
- Route-based splitting
- Component lazy loading
- Dynamic imports for large dependencies

### Memoization
- React.memo for expensive components
- useMemo for computed values
- useCallback for stable references

### Bundle Optimization
- Tree shaking for unused code
- Vite for fast development builds
- Production optimizations

## Testing Patterns

### Component Testing
- Unit tests for individual components
- Integration tests for user flows
- Mock Firebase for testing

### Authentication Testing
- Mock auth states
- Test protected routes
- Verify error handling
