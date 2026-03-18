<h1 align="center">AI Car Marketplace with NextJS, Tailwind CSS, NeonDB, Prisma, Clerk, ArcJet, Shadcn UI</h1>

## 🔗Live App: [ryder-ai.vercel.app](https://ryder-ai.vercel.app)

![Demo App](public/Screenshot%202026-01-24%20045928.png)

### Core Features:

- AI image-based car search

- Advanced filtering (make, model, price, etc.)

- Interactive EMI calculator

- Real-time test drive booking

- Admin dashboard with analytics and inventory tools

- AI-based car detail extraction from images

- Fully responsive UI using Next.js and ShadCN UI

### Create a .env file with following variables

```shell
# Database
DATABASE_URL=

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Google Gemini AI
GEMINI_API_KEY=

# Cloudinary (Image Storage)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Arcjet (Rate Limiting)
ARCJET_KEY=
```

### Run this app locally

```shell
npm run build
```

### Start the app

```shell
npm run dev
```
