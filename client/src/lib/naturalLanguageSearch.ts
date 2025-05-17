import type { Product } from "@shared/schema";

// Common words to filter out from search queries
const stopWords = [
  'a', 'an', 'the', 'and', 'or', 'but', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
  'in', 'on', 'at', 'to', 'for', 'with', 'by', 'about', 'like', 'through', 'over', 'before',
  'after', 'between', 'under', 'above', 'of', 'during', 'would', 'could', 'should', 'can',
  'will', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'this', 'that', 'these', 'those',
  'look', 'looking', 'find', 'finding', 'search', 'searching', 'want', 'wanting', 'need',
  'needing', 'interested', 'seeking', 'show', 'showing', 'display', 'displaying'
];

// Common investment/business related phrases and their associated keywords
const intentMapping = {
  revenue: ['revenue', 'arr', 'sales', 'income', 'profitable', 'profit', 'money', 'earning', 'cash flow', 'making money'],
  growth: ['growing', 'growth', 'scaling', 'scale', 'expanding', 'expand', 'increase', 'increasing', 'opportunity', 'opportunities'],
  age: ['old', 'new', 'established', 'startup', 'start-up', 'mature', 'young', 'early stage', 'late stage', 'years', 'months', 'year old'],
  users: ['users', 'customers', 'user base', 'customer base', 'audience', 'subscribers', 'active users', 'monthly active'],
  industry: [
    'saas', 'software', 'tech', 'technology', 'health', 'healthcare', 'education', 'e-commerce', 'ecommerce', 
    'fintech', 'financial', 'marketplace', 'platform', 'app', 'application', 'mobile', 'web', 'b2b', 'b2c',
    'content', 'media', 'entertainment', 'gaming'
  ]
};

// Extracts key terms from a natural language query
function extractKeyTerms(query: string): string[] {
  // Convert to lowercase and remove punctuation
  const cleanedQuery = query.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
  
  // Split into words
  const words = cleanedQuery.split(/\s+/);
  
  // Filter out stop words
  return words.filter(word => !stopWords.includes(word) && word.length > 2);
}

// Detect user intent from the query
function detectIntents(query: string): string[] {
  const lowerQuery = query.toLowerCase();
  const detectedIntents: string[] = [];
  
  // Check for each intent in the query
  Object.entries(intentMapping).forEach(([intent, keywords]) => {
    for (const keyword of keywords) {
      if (lowerQuery.includes(keyword)) {
        detectedIntents.push(intent);
        break;
      }
    }
  });
  
  return detectedIntents;
}

// Calculate a relevance score for a product based on the query
function calculateRelevanceScore(product: Product, keyTerms: string[], intents: string[]): number {
  let score = 0;
  const productText = `${product.headline} ${product.description} ${product.industry} ${product.features} ${product.techStack || ''} ${product.growthOpportunities || ''}`.toLowerCase();
  
  // Score based on key terms
  keyTerms.forEach(term => {
    const regex = new RegExp(`\\b${term}\\b`, 'gi');
    const matches = productText.match(regex);
    if (matches) {
      score += matches.length * 2; // Give more weight to exact matches
    }
    
    // Partial matching
    if (productText.includes(term)) {
      score += 1;
    }
  });
  
  // Score based on detected intents
  intents.forEach(intent => {
    switch(intent) {
      case 'revenue':
        if (product.arr) {
          score += 3;
          // Add more weight for high revenue products if query implies revenue importance
          if (product.arr.includes('million') || parseInt(product.arr.replace(/[^0-9]/g, '')) > 500) {
            score += 2;
          }
        }
        break;
      case 'growth':
        if (product.growthOpportunities && 
            (product.growthOpportunities.toLowerCase().includes('growth') ||
             product.growthOpportunities.toLowerCase().includes('expanding') ||
             product.growthOpportunities.toLowerCase().includes('scale'))) {
          score += 3;
        }
        break;
      case 'age':
        // Prioritize based on detected age preference (newer vs. established)
        const ageMatch = intent.toLowerCase().includes('new') || intent.toLowerCase().includes('startup') ?
          !product.age.includes('5+') : product.age.includes('5+');
        if (ageMatch) {
          score += 2;
        }
        break;
      case 'users':
        if (product.totalUsers || product.activeUsers) {
          score += 3;
        }
        break;
      case 'industry':
        // Industry is handled by key terms matching
        break;
    }
  });
  
  return score;
}

// Main function to search products using natural language
export function naturalLanguageSearch(products: Product[], query: string): Product[] {
  // Log inputs for debugging
  console.log("Natural language search called with query:", query);
  console.log("Number of products to search:", products.length);
  
  if (!query || query.trim() === '') {
    console.log("Empty query - returning all products");
    return products;
  }
  
  const keyTerms = extractKeyTerms(query);
  const intents = detectIntents(query);
  
  console.log("Extracted key terms:", keyTerms);
  console.log("Detected intents:", intents);
  
  // If we couldn't extract meaningful terms or intents, return all products
  if (keyTerms.length === 0 && intents.length === 0) {
    console.log("No meaningful terms or intents found - returning all products");
    return products;
  }
  
  // Calculate relevance score for each product
  const scoredProducts = products.map(product => {
    const score = calculateRelevanceScore(product, keyTerms, intents);
    return {
      product,
      score
    };
  });
  
  // Sort by relevance score (descending)
  scoredProducts.sort((a, b) => b.score - a.score);
  
  // Filter out irrelevant results (score of 0)
  const relevantProducts = scoredProducts.filter(item => item.score > 0);
  
  console.log("Scored products:", scoredProducts.map(p => ({ 
    title: p.product.headline, 
    score: p.score 
  })));
  console.log("Relevant products found:", relevantProducts.length);
  
  // Return products ordered by relevance
  return relevantProducts.map(item => item.product);
}

// Utility function to generate response explaining the search results
export function generateSearchExplanation(query: string, results: Product[]): string {
  if (!query || results.length === 0) {
    return '';
  }
  
  const keyTerms = extractKeyTerms(query);
  const intents = detectIntents(query);
  
  if (keyTerms.length === 0 && intents.length === 0) {
    return 'Showing all available products.';
  }
  
  let explanation = `Found ${results.length} products matching your search`;
  
  if (keyTerms.length > 0) {
    explanation += ` for "${keyTerms.join(', ')}"`;
  }
  
  if (intents.length > 0) {
    const intentExplanations: {[key: string]: string} = {
      revenue: 'revenue performance',
      growth: 'growth potential',
      age: 'business age',
      users: 'user base',
      industry: 'industry sector'
    };
    
    const intentsFormatted = intents.map(i => intentExplanations[i] || i).join(', ');
    explanation += `, prioritizing ${intentsFormatted}`;
  }
  
  return explanation + '.';
}