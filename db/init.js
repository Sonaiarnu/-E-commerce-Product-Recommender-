import Database from 'better-sqlite3';

const db = new Database('rec-sys.db');

console.log('Initializing database...');

// 1. Users & Behavior
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT
  );

  CREATE TABLE IF NOT EXISTS user_behavior (
    user_id TEXT,
    viewed_categories TEXT, -- Stored as JSON string for simplicity
    viewed_products TEXT,
    purchased_products TEXT,
    interaction_summary TEXT
  );
`);

// 2. Products
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    name TEXT,
    category TEXT,
    stock_status TEXT
  );
`);

// Seed Data
const insertUser = db.prepare('INSERT OR REPLACE INTO users (id, name) VALUES (?, ?)');
const insertBehavior = db.prepare('INSERT OR REPLACE INTO user_behavior (user_id, viewed_categories, viewed_products, purchased_products, interaction_summary) VALUES (?, ?, ?, ?, ?)');
const insertProduct = db.prepare('INSERT OR REPLACE INTO products (id, name, category, stock_status) VALUES (?, ?, ?, ?)');

insertUser.run('8821X9', 'Active User');

insertBehavior.run(
    '8821X9',
    JSON.stringify(["Office Furniture", "Home Decor", "Electronics"]),
    JSON.stringify(["Adjustable Standing Desk", "Monitor Stand"]),
    JSON.stringify(["Mechanical Keyboard"]),
    "User has shown strong interest in upgrading their home office setup."
);

const products = [
    { id: "P101", name: "Ergonomic Office Chair", category: "Office Furniture", stock: "In Stock" },
    { id: "P102", name: "4K Ultrawide Monitor", category: "Electronics", stock: "Low Stock" },
    { id: "P103", name: "Minimalist Desk Lamp", category: "Home Decor", stock: "In Stock" },
    { id: "P104", name: "Noise Cancelling Headphones", category: "Audio", stock: "In Stock" }
];

products.forEach(p => {
    insertProduct.run(p.id, p.name, p.category, p.stock);
});

console.log('Database seeded successfully.');
db.close();
