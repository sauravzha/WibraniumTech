# WibraniumTech Digital Forge

A modern, professional website for WibraniumTech built with React, TypeScript, and Tailwind CSS.

## Features

- 🎨 Modern UI with glassmorphism effects and animations
- 📱 Fully responsive design
- ♿ Accessible (WCAG compliant)
- ⚡ Fast performance with optimized images
- 🔍 SEO-ready with structured data
- 📧 Contact form with validation
- 💬 Live chat widget
- 🌐 Multi-page application with React Router

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation
- **Build Tool**: Vite
- **Backend**: Supabase (optional)

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:

```bash
git clone [your-repo-url]
cd wibraniumtech-digital-forge-main
```

1. Install dependencies:

```bash
npm install
```

1. Start the development server:

```bash
npm run dev
```

1. Open [http://localhost:8080](http://localhost:8080) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler check

## Project Structure

```
src/
├── components/       # Reusable components
│   ├── layout/      # Layout components (Navbar, Footer)
│   ├── SEO/         # SEO-related components
│   └── ui/          # UI components (Button, Input, etc.)
├── pages/           # Page components
├── lib/             # Utilities and helpers
├── integrations/    # Third-party integrations
└── assets/          # Static assets

## Deployment

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready to be deployed to any static hosting service.

### Deployment Options

- **Vercel**: Connect your GitHub repo for automatic deployments
- **Netlify**: Drag and drop the `dist/` folder
- **GitHub Pages**: Use GitHub Actions for automated deployment
- **Any Static Host**: Upload the `dist/` folder contents

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_RECAPTCHA_SITE_KEY=your-recaptcha-site-key
VITE_GA_TRACKING_ID=your-google-analytics-id
```

## License

MIT License - feel free to use this project for your own purposes.

## Support

For support, email <info@wibraniumtech.com> or visit our contact page.
