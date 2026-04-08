# Johann Antisseril — Personal Portfolio

A personal portfolio site built with React, TypeScript, and Vite. Features a dark-themed UI with animated transitions, an about page with skills and work history, a projects showcase, a PDF resume viewer, and a contact page.

## Tech Stack

- **React 18** with **TypeScript**
- **Vite** — dev server and build tool
- **MUI (Material UI v5)** — component library and theming
- **Framer Motion** — page and element animations
- **React PDF** — in-browser resume viewer
- **Firebase** — hosting
- **React Router v6** — client-side routing

## Project Structure

```
src/
├── data/
│   └── profile.ts        # All personal content (bio, experience, skills, projects)
├── pages/
│   ├── Home.tsx
│   ├── About.tsx
│   ├── Projects.tsx
│   ├── Resume.tsx
│   ├── Contact.tsx
│   └── Layout.tsx
├── Top.tsx               # Navbar
├── App.tsx               # Theme + router setup
└── index.tsx             # Entry point
```

All site content (bio, work history, skills, projects, links) lives in `src/data/profile.ts`.

## Getting Started

```bash
npm install
npm run dev       # Start dev server at http://localhost:5173
npm run build     # Production build to dist/
npm run preview   # Preview production build locally
```

## Pages

- **Home** — landing with name and CTA buttons
- **About** — bio, work history, and skills (programming languages, cloud technologies, soft skills, AI tools)
- **Projects** — project cards with GitHub links
- **Resume** — in-browser PDF viewer with download option
- **Contact** — links to email, GitHub, and LinkedIn
