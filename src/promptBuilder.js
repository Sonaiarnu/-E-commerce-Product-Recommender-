/**
 * Constructs the prompt for the AI model based on the product and user behavior.
 * 
 * @param {Object} product - The product catalog information.
 * @param {string} product.id - Product ID.
 * @param {string} product.name - Product Name.
 * @param {string} product.category - Product Category.
 * @param {Object} userBehavior - The user behavior data.
 * @param {string[]} userBehavior.viewedCategories - List of viewed categories.
 * @param {string[]} userBehavior.viewedProducts - List of viewed products.
 * @param {string[]} userBehavior.purchasedProducts - List of purchased products.
 * @param {string} userBehavior.interactionSummary - Summary of user interaction.
 * @returns {string} The constructed prompt.
 */
export function buildExplanationPrompt(product, userBehavior) {
    return `You are an AI assistant integrated into an e-commerce product
recommendation system.

Your responsibility is to generate a clear, concise, and trustworthy
explanation answering the question:
"Why is this product recommended to the user?"

You MUST strictly follow these rules:
1. Use only the provided product catalog data and user behavior.
2. Do NOT invent, assume, or hallucinate any user actions or preferences.
3. Keep the explanation user-friendly, non-technical, and easy to understand.
4. The explanation must be 2–3 short sentences.
5. Focus on relevance between user behavior and the recommended product.
6. Do not include marketing hype, exaggeration, or unsupported claims.

INPUT DATA:

Product Catalog Information:
- Product ID: ${product.id}
- Product Name: ${product.name}
- Product Category: ${product.category}

User Behavior Data:
- Viewed Categories: ${userBehavior.viewedCategories.join(', ')}
- Viewed Products: ${userBehavior.viewedProducts.join(', ')}
- Purchased Products: ${userBehavior.purchasedProducts.join(', ')}
- Interaction History Summary: ${userBehavior.interactionSummary}

TASK:
Analyze the relationship between the user’s behavior and the recommended
product. Generate a short explanation clearly describing why this product
matches the user’s interests based on their browsing and/or purchase history.

OUTPUT REQUIREMENTS:
- Plain text only
- No bullet points
- No emojis
- No technical terminology
- No assumptions beyond given data`;
}
