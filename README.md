# Postery

A modern poster management application built with Angular 19, featuring image upload, cropping, and a responsive masonry grid layout.

## 🚀 Features

- **Poster Management**: Create, view, edit, and delete posters
- **Image Processing**: Upload and crop images with `ngx-image-cropper`
- **Responsive Design**: Mobile-first approach with TailwindCSS
- **Modern Architecture**: Standalone components with lazy loading
- **Mock API**: JSON Server for development and testing
- **Docker Support**: Containerized deployment ready

## 🛠️ Tech Stack

- **Framework**: Angular 19 with standalone components
- **Styling**: TailwindCSS 4.x with utility classes
- **State Management**: RxJS observables
- **Image Processing**: ngx-image-cropper
- **Notifications**: @ngxpert/hot-toast
- **Testing**: Karma + Jasmine
- **Code Quality**: ESLint + Prettier
- **Backend**: JSON Server (development)

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd postery
```

2. Install dependencies:
```bash
npm install
```

3. Start the development servers:
```bash
# Start Angular dev server (localhost:4200)
npm start

# Start JSON Server API (localhost:3000) - in another terminal
npm run start:server
```

## 🔧 Available Scripts

### Development
- `npm start` - Start Angular development server
- `npm run start:server` - Start JSON Server for API mock
- `npm run build` - Build for production
- `npm run watch` - Build in watch mode

### Code Quality
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm test` - Run unit tests

### Docker
- `docker build . -t postery` - Build Docker image
- `docker run -p 3000:3000 -p 4200:4200 postery` - Run containerized app

## 🏗️ Architecture

### Project Structure
```
src/app/
├── core/           # Core functionality (guards, interceptors, error handling)
├── features/       # Feature modules organized by domain
│   └── posters/    # Poster management feature
│       ├── pages/  # Smart components (list, details, form)
│       ├── services/ # Data access layer
│       └── types/  # TypeScript interfaces
├── shared/         # Shared utilities and services
└── ui/             # Reusable UI components
```

### Key Design Patterns

- **Feature-Based Organization**: Business logic grouped by domain
- **Standalone Components**: No NgModules, following Angular's modern approach
- **Lazy Loading**: Routes use `loadChildren` for code splitting
- **Reactive Programming**: RxJS observables for data flow
- **Utility-First CSS**: TailwindCSS with `tailwind-merge` for class management

## 🎨 UI Components

The application includes a custom UI component library located in `src/app/ui/`:

- Reusable components with consistent styling
- Type-safe CSS variants using `class-variance-authority`
- Utility functions for class merging and optimization
- Responsive design patterns

## 📊 Data Model

### Poster Type
```typescript
export type Poster = {
  id: string;
  title: string;
  description: string;
  imageData: string; // Base64 encoded image
};
```

### API Endpoints
- `GET /posters` - List all posters
- `GET /posters/:id` - Get poster by ID
- `POST /posters` - Create new poster
- `PUT /posters/:id` - Update poster
- `DELETE /posters/:id` - Delete poster

## 🧪 Testing

Run unit tests:
```bash
npm test
```

Run specific test file:
```bash
ng test --include="**/component-name.component.spec.ts"
```

## 🔧 Development Guidelines

### Code Standards
- **Component Selectors**: Use `app-` prefix with kebab-case
- **Directive Selectors**: Use `app` prefix with camelCase
- **File Organization**: Barrel exports through `index.ts` files
- **Styling**: Utility-first approach with TailwindCSS

### Environment Configuration
- Development: `src/environments/environment.ts`
- Production: `src/environments/environment.prod.ts`
- API URLs and feature flags configured per environment

## 🐳 Docker Deployment

The application includes a multi-stage Dockerfile:

1. **Build Stage**: Builds the Angular application
2. **Runtime Stage**: Serves both frontend and JSON Server API
3. **Ports**: 4200 (frontend) and 3000 (API)

```bash
# Build and run
docker build . -t postery
docker run -p 3000:3000 -p 4200:4200 postery
```

## 🔗 Key Dependencies

- **@angular/core**: ^19.2.0 - Angular framework
- **@ngxpert/hot-toast**: ^4.2.0 - Toast notifications
- **ngx-image-cropper**: ^9.1.5 - Image cropping functionality
- **tailwindcss**: ^4.1.11 - Utility-first CSS framework
- **class-variance-authority**: ^0.7.1 - Type-safe CSS variants
- **json-server**: ^1.0.0-beta.3 - Mock REST API

## 📝 Additional Resources

For more information about Angular CLI commands and options, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli).

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.