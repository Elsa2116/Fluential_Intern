# Fluent

Fluent is a responsive Next.js JavaScript web app for browsing courses and viewing detailed course information.

## Features implemented

- Landing page with hero, app name (`Fluent`), short description, and CTA buttons (`Browse Courses`, `Sign Up`)
- Courses listing page showing:
  - Course title
  - Truncated description (100–150 chars)
  - Price
  - Duration (hours)
  - Rating
  - Enrollments
- Clickable course cards navigating to a dedicated detail page
- Course detail page showing full description, price, duration, rating, and enrollments
- Responsive layout for mobile and desktop
- Search + sorting on listing page

## Tech stack

- Next.js (App Router)
- React
- Tailwind CSS
- JavaScript (JS/JSX)

## Real API with Next.js

The app uses Next.js API routes (not direct component-only mock usage):

- `GET /api/courses` → list all courses
- `GET /api/courses/[slug]` → fetch one course by slug

Source data is stored in `src/data/courses.js` and served through these API endpoints.

## Run locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start development server:

   ```bash
   npm run dev
   ```

3. Open:

   ```
   http://localhost:3000
   ```

4. Production build check:

   ```bash
   npm run build
   ```

## Deploy (Vercel)

1. Push repository to GitHub
2. Go to Vercel Dashboard → New Project
3. Import this GitHub repository
4. Keep default Next.js settings and deploy
5. Copy deployed URL

## GitHub submission steps

```bash
git add .
git commit -m "Complete Fluent internship task: landing, courses listing, detail, and Next.js API routes"
git push -u origin main
```

Then submit:

- Public GitHub repo link
- Live deployed link (Vercel/Netlify)
