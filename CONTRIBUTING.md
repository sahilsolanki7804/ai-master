# Contributing to AI Master

Thanks for your interest in contributing! Here's how to get started.

## Setup for Development

1. Fork the repository
2. Clone your fork
3. Create a feature branch: `git checkout -b feature/my-feature`
4. Make your changes
5. Test thoroughly
6. Commit: `git commit -m "Add my feature"`
7. Push: `git push origin feature/my-feature`
8. Open a Pull Request

## Code Style

- Use TypeScript for type safety
- Follow existing naming conventions
- Components use PascalCase
- Utilities use camelCase
- Add comments for complex logic
- Format with Prettier (auto on save)

## Component Structure

```typescript
'use client'; // For client components

import React from 'react';
import { Icon } from 'lucide-react';

interface ComponentProps {
  prop1: string;
  prop2?: number;
}

export function MyComponent({ prop1, prop2 }: ComponentProps) {
  return (
    <div>
      {prop1}
    </div>
  );
}
```

## Testing

```bash
# Run linter
npm run lint

# Build check
npm run build
```

## Commit Messages

Use clear, descriptive commit messages:

```
Add feature: Model comparison UI
Fix: Dark mode toggle not persisting
Refactor: Simplify chat component
Docs: Update setup guide
```

## Pull Request Guidelines

1. Keep PRs focused and small
2. Provide clear description of changes
3. Include screenshots for UI changes
4. Reference related issues
5. Ensure tests pass

## Areas We Need Help

- 🐛 Bug fixes
- 📚 Documentation
- 🎨 UI/UX improvements
- ⚡ Performance optimizations
- 🌐 Internationalization

## Questions?

Open an issue or ask in PRs. We're here to help!

Happy coding! 💻
