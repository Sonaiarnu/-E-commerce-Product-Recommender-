import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';
import { generateHeuristicExplanation } from './src/ruleBasedEngine.js'; // Reusing our logic engine as the "LLM Service"

const app = express();
const port = 3000;
const db = new Database('rec-sys.db');

app.use(cors());
app.use(express.json());

// API: Get User Context
app.get('/api/user', (req, res) => {
    // In a real app, we'd get ID from session/auth. Hardcoding for demo.
    const userId = '8821X9';

    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
    const behavior = db.prepare('SELECT * FROM user_behavior WHERE user_id = ?').get(userId);

    if (!user || !behavior) {
        return res.status(404).json({ error: 'User not found' });
    }

    // Parse JSON strings back to arrays
    const formattedBehavior = {
        viewedCategories: JSON.parse(behavior.viewed_categories),
        viewedProducts: JSON.parse(behavior.viewed_products),
        purchasedProducts: JSON.parse(behavior.purchased_products),
        interactionSummary: behavior.interaction_summary
    };

    res.json({ user, behavior: formattedBehavior });
});

// API: Get Recommendations (Products)
app.get('/api/products', (req, res) => {
    const products = db.prepare('SELECT * FROM products').all();
    res.json(products);
});

// API: Generate Explanation (Simulated LLM Call)
app.post('/api/explain', (req, res) => {
    const { productId, userBehavior } = req.body;
    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(productId);

    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }

    // Here is where you would call OpenAI/Gemini API
    // const explanation = await callOpenAI(prompt);

    // For this demo, we use our local rule-based engine to simulate it
    const explanation = generateHeuristicExplanation(product, userBehavior);

    // Simulate network latency for realism
    setTimeout(() => {
        res.json({ explanation });
    }, 800);
});

app.listen(port, () => {
    console.log(`Backend API running at http://localhost:${port}`);
    console.log('Ready to serve recommendations and explanations.');
});
