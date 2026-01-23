# 🔗 URL to url Converter

A modern, full-stack URL shortening and management application built with **Next.js 15**, **MongoDB**, and **NextAuth**. Transform long, cumbersome URLs into sleek, memorable links with custom aliases and full analytics.


## ✨ Features

- **Custom Short URLs**: Choose your own "preferred word" aliases for meaningful links.
- **Social Authentication**: Secure sign-in via Google, GitHub, LinkedIn, and Facebook using NextAuth.
- **Personal Dashboard**: Manage all your converted links in one place.
- **Real-time Editing**: Update your original URLs or aliases on the fly.
- **Profile Management**: Customize your public profile with name, username, and Cloudinary-powered avatar uploads.
- **Copy-to-Clipboard**: One-click sharing functionality.
- **Responsive Design**: Beautifully crafted with Tailwind CSS for seamless use on any device.
- **Interactive UI**: Uses Lordicons for smooth, premium micro-animations.

## 🚀 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Frontend**: React 19, Tailwind CSS
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Image Hosting**: [Cloudinary](https://cloudinary.com/)
- **Animations**: [Lordicon](https://lordicon.com/)
- **Icons**: Lucide React / SVG
- **Notifications**: [React-Toastify](https://fkhadra.github.io/react-toastify/introduction)

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/m-umer-iqbal/P24-Next-URL-to-url-Converter.git
   cd P24-Next-URL-to-url-Converter
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env.local` file in the root directory and add the following:

   ```env
   # Database
   MONGODB_URI=your_mongodb_connection_string

   # Providers
   GOOGLE_CLIENT_ID=...
   GOOGLE_CLIENT_SECRET=...
   GITHUB_ID=...
   GITHUB_SECRET=...
   FACEBOOK_CLIENT_ID=...
   FACEBOOK_CLIENT_SECRET=...
   LINKEDIN_CLIENT_ID=...
   LINKEDIN_CLIENT_SECRET=...

   # URL Hosting
   NEXT_PUBLIC_HOST=http://localhost:3000

   # Cloudinary (for profile images)
   CLOUDINARY_CLOUD_NAME=...
   CLOUDINARY_API_KEY=...
   CLOUDINARY_API_SECRET=...
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

```text
├── app/                  # Next.js App Router (Pages, API, Layouts)
│   ├── api/              # Backend API endpoints
│   ├── [preferWord]/     # Dynamic redirect logic
│   ├── convert/          # URL converter page
│   ├── myurls/           # User dashboard
│   └── profile/          # User profile management
├── components/           # Reusable UI components (Header, Footer, etc.)
├── context/              # React Context for global state
├── db/                   # Database connection logic
├── models/               # Mongoose schemas
├── public/               # Static assets
└── lib/                  # Helper functions and utilities
```

---
Built with ❤️ by Umer Iqbal