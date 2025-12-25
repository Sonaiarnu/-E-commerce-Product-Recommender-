/**
 * Generates a heuristic-based explanation for the recommended product.
 * This simulates the output of an AI by using simple logic rules.
 * 
 * @param {Object} product 
 * @param {Object} userBehavior 
 * @returns {string} The generated explanation.
 */
export function generateHeuristicExplanation(product, userBehavior) {
    const { category, name } = product;
    const { viewedCategories, purchasedProducts, interactionSummary } = userBehavior;

    // Rule 1: Category Match
    const categoryMatch = viewedCategories.some(c => c.toLowerCase() === category.toLowerCase());

    // Rule 2: Purchase Similarity (simplified check)
    // In a real system, we'd check semantic similarity, here we just check if they bought something
    const hasPurchases = purchasedProducts.length > 0;

    if (categoryMatch) {
        return `We recommended the ${product.name} because you've been browsing the ${product.category} category recently. Based on your interest in similar items, this seems like a great match for what you're looking for.`;
    } else if (hasPurchases) {
        return `Because you previously purchased items like ${userBehavior.purchasedProducts[0]}, we think you might enjoy the ${product.name}. It complements your collection and fits your style.`;
    } else {
        // Fallback based on interaction summary or generic popularity
        return `This recommendation is based on your recent activity, including ${interactionSummary}. We selected the ${product.name} as it aligns with the types of products you've explored.`;
    }
}
