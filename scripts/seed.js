import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import fs from 'fs';
import path from 'path';

// Note: service-account.json is acquired via Firebase Console Project Settings > Service Accounts
const serviceAccountPath = path.resolve('./service-account.json');

if (!fs.existsSync(serviceAccountPath)) {
  console.warn("WARNING: 'service-account.json' not found. Please place your admin credentials in the project root to run this script.");
  console.log("Create 'service-account.json' by going to: Firebase Console > Project Settings > Service Accounts > Generate New Private Key");
  process.exit(1);
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

const collectionsData = [
  { id: 'bridal-heritage', name: 'Bridal Heritage', description: 'Traditional heavy zari border silk sarees for brides', imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800' },
  { id: 'festive-elegance', name: 'Festive Elegance', description: 'Lightweight rich tissue and organza sarees', imageUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800' }
];

const productsData = [
  {
    name: "Golden Crimson Kanchipuram Saree",
    fabric: "Kanchipuram Silk",
    collection: "Bridal Heritage",
    price: 26500,
    availability: true,
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1200"
    ],
    description: "Woven by master weavers of Tamil Nadu, this bridal masterpiece boasts a crimson red hue with heavy pure gold zari weave depicting traditional peacock motifs.",
    weave: "Pure Handloom Zari Weave",
    colour: "Crimson Red & Antique Gold",
    careInstructions: "Dry Clean Only. Storage wrapped in soft muslin cloth.",
    createdAt: new Date(),
    featured: true
  },
  {
    name: "Sage Pastel Organza Zardosi Saree",
    fabric: "Organza",
    collection: "Festive Elegance",
    price: 18500,
    availability: true,
    images: [
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=1200"
    ],
    description: "An elegant sage green organza saree with delicate hand-embroidered Zardosi floral borders, perfect for summer morning weddings and receptions.",
    weave: "Handcrafted Zardosi",
    colour: "Sage Green & Silver Zari",
    careInstructions: "Dry Clean Only. Do not iron directly on hand embroidery.",
    createdAt: new Date(),
    featured: true
  },
  {
    name: "Midnight Blue Banarasi Silk Saree",
    fabric: "Banarasi Silk",
    collection: "Bridal Heritage",
    price: 32000,
    availability: true,
    images: [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1200"
    ],
    description: "A rich midnight blue pure Banarasi silk saree adorned with intricate floral jaal pattern in gold zari. Standard 5.5 meters length with run-along blouse piece.",
    weave: "Handcrafted Banarasi Brocade",
    colour: "Midnight Blue & Gold Zari",
    careInstructions: "Dry Clean Only. Avoid direct sprays of perfumes on zari threads.",
    createdAt: new Date(),
    featured: false
  },
  {
    name: "Scarlet Crimson Georgette Saree",
    fabric: "Georgette",
    collection: "Festive Elegance",
    price: 15500,
    availability: true,
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200"
    ],
    description: "Perfect drape Georgette saree featuring intricate hand-done Gota Patti borders and delicate bootis across the body.",
    weave: "Gota Patti Handwork",
    colour: "Scarlet Red & Gold Gota",
    careInstructions: "Dry Clean Only.",
    createdAt: new Date(),
    featured: false
  }
];

async function seed() {
  console.log("Seeding collections metadata...");
  for (const c of collectionsData) {
    await db.collection('collections').doc(c.id).set(c);
    console.log(`- Seeded collection: ${c.name}`);
  }
  
  console.log("Seeding products...");
  for (const p of productsData) {
    const docRef = await db.collection('products').add(p);
    console.log(`- Seeded product: ${p.name} (ID: ${docRef.id})`);
  }
  
  console.log("Database seeded successfully!");
  process.exit(0);
}

seed().catch(err => {
  console.error("Error seeding data:", err);
  process.exit(1);
});
