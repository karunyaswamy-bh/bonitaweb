# Bonita Ropita — Luxury Saree Boutique

Bonita Ropita is a premium, world-class luxury saree boutique web application designed with a high-end editorial, visual-magazine aesthetic. The platform features an immersive customer shopping experience, a direct WhatsApp inquiry system, and a comprehensive Staff Administration Panel powered by a live Firebase backend.

---

## 🌟 Key Features

### 🛍️ Customer Storefront
- **High-End Editorial Design**: Stylized using a curated color palette of Champagne Gold, Royal Burgundy, and Ivory White, with custom textures and layouts.
- **Cinematic Visuals**: Parallax scroll effects, slow zoom-on-hover actions, and smooth micro-interactions that elevate user engagement.
- **Dynamic Catalogue**: Asymmetric luxury product layouts with seamless fabric filtering (Kanchipuram Silk, Organza, Banarasi Silk, Georgette, etc.).
- **Bespoke Inquiries**: Dynamic floating WhatsApp inquiry system that routes details of the specific product selected directly to the boutique.
- **Responsive Layout**: Tailored for pixel-perfect display across mobile, tablet, and desktop screens.

### 💼 Staff Admin Panel (`bonita-admin/`)
- **Real-time Metrics Dashboard**: Displays catalog size, customer click logs, inventory stats, and the most inquired saree in real-time.
- **Catalogue Manager**: Add, edit, or delete products with support for drag-and-drop image uploads.
- **Customer Click Analytics**: Tracks and logs WhatsApp clicks to see which products generate the most customer interest.
- **Store Configuration**: Live management of store coordinates (phone, WhatsApp link, email, address, and logo URL).
- **One-Click Database Seeding**: A built-in developer-friendly seeder that populates Firestore with collections and sample products instantly.

---

## 🛠️ Technology Stack

- **Frontend Framework**: [React (v19)](https://react.dev/) + [Vite](https://vite.dev/)
- **Styling**: [Tailwind CSS (v4)](https://tailwindcss.com/) + custom Vanilla CSS for glassmorphism and animations
- **Icons**: [Lucide React](https://lucide.dev/)
- **Backend Services**: [Firebase (v12)](https://firebase.google.com/)
  - **Firestore**: Real-time database for products, collections, settings, and inquiries
  - **Firebase Auth**: Secure login credentials for the admin dashboard
  - **Firebase Storage**: Asset storage for uploaded saree images
- **Deployment**: [Vercel](https://vercel.com/)

---

## 📂 Project Structure

```
├── bonita-admin/         # Separate staff admin panel React application
│   ├── src/
│   │   ├── components/   # Admin UI components
│   │   ├── context/      # Auth state context
│   │   ├── firebase/     # Admin Firebase config & API helpers
│   │   ├── pages/        # Dashboard, Login, Settings, Product Manager
│   │   └── data/         # Offline fallbacks
│   └── package.json
├── src/                  # Main customer storefront React application
│   ├── components/       # Storefront components (Navbar, Footer, Product Form)
│   ├── context/          # Storefront Auth state
│   ├── firebase/         # Storefront Firebase config
│   ├── hooks/            # Custom React hooks (useProducts, useSettings)
│   ├── pages/            # Home, Catalogue, Product Details, Admin Area
│   └── utils/            # Helper functions
├── scripts/              # Command-line database seed script
├── firestore.rules       # Security rules for Firestore Database
├── storage.rules         # Security rules for Firebase Storage
├── package.json          # Main storefront dependencies
└── vercel.json           # Vercel routing configuration
```

---

## ⚙️ Configuration & Setup

### 1. Clone & Install Dependencies
First, clone this repository:
```bash
git clone https://github.com/karunyaswamy-bh/bonitaweb.git
cd bonitaweb
```

Install dependencies for the storefront:
```bash
npm install
```

Install dependencies for the admin panel:
```bash
cd bonita-admin
npm install
cd ..
```

### 2. Environment Variables Configuration
To set up the database and services, create `.env` and `.env.local` files in the root folder, and a `.env.local` file inside the `bonita-admin` folder. Model them after `.env.example`:

```env
# Firebase Public Keys
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_DATABASE_URL=your_database_url
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 3. Firebase Backend Setup
1. **Firestore Database**: Go to Firebase Console > Firestore Database, click **Create Database**, and select **Test Mode** (or configure secure read/write rules).
2. **Firebase Authentication**: Enable **Email/Password** as a sign-in provider, and add your administration user credentials.
3. **Database Seeding**: Log in to the Admin Panel using the credentials `admin@bonitashop.com` (password: `password123`) and click **Seed Default Data** on the dashboard to populate your Firestore database instantly.

---

## 🚀 Running Locally & Deploying

### Local Development
To run the storefront locally:
```bash
npm run dev
```

To run the admin panel locally:
```bash
cd bonita-admin
npm run dev
```

### Deploy to Production (Vercel)
Deploy the storefront to Vercel using the Vercel CLI:
```bash
npx vercel --prod
```
