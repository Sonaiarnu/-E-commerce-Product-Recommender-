import { buildExplanationPrompt } from './src/promptBuilder.js';
import { generateHeuristicExplanation } from './src/ruleBasedEngine.js';

// Sample Data
const sampleProduct = {
    id: "P12345",
    name: "Ergonomic Office Chair",
    category: "Office Furniture"
};

const sampleUserBehavior = {
    viewedCategories: ["Office Furniture", "Home Decor", "Electronics"],
    viewedProducts: ["Adjustable Standing Desk", "Monitor Stand"],
    purchasedProducts: ["Mechanical Keyboard"],
    interactionSummary: "User has shown strong interest in upgrading their home office setup."
};

console.log("=== Product Catalog Information ===");
console.log(sampleProduct);
console.log("\n=== User Behavior Data ===");
console.log(sampleUserBehavior);

console.log("\n---------------------------------------------------");
console.log("OPTION 1: Generated LLM Prompt (for external API)");
console.log("---------------------------------------------------");
console.log(buildExplanationPrompt(sampleProduct, sampleUserBehavior));

console.log("\n---------------------------------------------------");
console.log("OPTION 2: Simulated AI Explanation (Rule-Based)");
console.log("---------------------------------------------------");
console.log(generateHeuristicExplanation(sampleProduct, sampleUserBehavior));
