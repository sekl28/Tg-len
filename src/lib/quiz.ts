import { QuizQuestion, Casino, QuizAnswer, QuizResult, UserPreferences } from '@/types/casino';

// Quiz questions configuration - 3 questions as per requirements
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'games',
    question: 'What type of games do you prefer?',
    type: 'single',
    category: 'games',
    options: [
      {
        id: 'slots',
        label: 'Slots',
        tags: ['slots'],
        weight: 1
      },
      {
        id: 'table_games',
        label: 'Table Games',
        tags: ['table_games'],
        weight: 1
      },
      {
        id: 'live_casino',
        label: 'Live Casino',
        tags: ['live_casino'],
        weight: 1
      }
    ]
  },
  {
    id: 'currency',
    question: 'Which currency do you prefer to use?',
    type: 'single',
    category: 'payments',
    options: [
      {
        id: 'cad',
        label: 'Canadian Dollar (CAD)',
        tags: ['cad'],
        weight: 1
      },
      {
        id: 'crypto',
        label: 'Cryptocurrency',
        tags: ['cryptocurrency'],
        weight: 1
      },
      {
        id: 'doesnt_matter',
        label: "Doesn't matter",
        tags: ['any_currency'],
        weight: 1
      }
    ]
  },
  {
    id: 'bonuses',
    question: 'What kind of bonuses are most important to you?',
    type: 'single',
    category: 'bonuses',
    options: [
      {
        id: 'no_deposit',
        label: 'No Deposit Bonus',
        tags: ['no_deposit_bonus'],
        weight: 1
      },
      {
        id: 'welcome_bonus',
        label: 'Welcome Bonus',
        tags: ['welcome_bonus'],
        weight: 1
      },
      {
        id: 'not_important',
        label: 'Not important',
        tags: ['any_bonus'],
        weight: 1
      }
    ]
  }
];

// Simplified casino matching algorithm for 3-question quiz
export function calculateCasinoMatch(casino: Casino, answers: QuizAnswer[]): QuizResult {
  const casinoTags = casino.attributes.tags || [];
  const matchedCriteria: string[] = [];
  let matchCount = 0;
  
  // Check each answer for tag matches
  answers.forEach(answer => {
    const question = QUIZ_QUESTIONS.find(q => q.id === answer.questionId);
    if (!question) return;
    
    answer.selectedOptions.forEach(optionId => {
      const option = question.options.find(o => o.id === optionId);
      if (!option) return;
      
      // Check if casino has any of the option's tags
      const hasMatchingTag = option.tags.some(tag => 
        casinoTags.some(casinoTag => 
          casinoTag.toLowerCase() === tag.toLowerCase()
        )
      );
      
      if (hasMatchingTag) {
        matchCount++;
        matchedCriteria.push(option.label);
      }
    });
  });
  
  // Calculate match percentage (0-100%)
  const matchPercentage = Math.round((matchCount / answers.length) * 100);
  
  // Generate recommendation reason
  const recommendationReason = generateRecommendationReason(casino, matchedCriteria, matchCount);
  
  return {
    casino,
    matchScore: matchPercentage,
    matchedCriteria,
    recommendationReason
  };
}

// Extract user preferences from quiz answers
function extractUserTags(answers: QuizAnswer[]): string[] {
  const tags: string[] = [];
  
  answers.forEach(answer => {
    const question = QUIZ_QUESTIONS.find(q => q.id === answer.questionId);
    if (!question) return;
    
    answer.selectedOptions.forEach(optionId => {
      const option = question.options.find(o => o.id === optionId);
      if (option) {
        tags.push(...option.tags);
      }
    });
  });
  
  return [...new Set(tags)]; // Remove duplicates
}

// Generate personalized recommendation reason
function generateRecommendationReason(
  casino: Casino, 
  matchedCriteria: string[], 
  matchCount: number
): string {
  const { attributes } = casino;
  
  if (matchCount === 3) {
    return `Perfect match! ${attributes.name} meets all your preferences: ${matchedCriteria.join(', ')}.`;
  } else if (matchCount === 2) {
    return `Great match! ${attributes.name} aligns with most of your preferences: ${matchedCriteria.join(', ')}.`;
  } else if (matchCount === 1) {
    return `Good option! ${attributes.name} matches your preference for ${matchedCriteria[0]}.`;
  } else {
    return `${attributes.name} is a solid choice with high ratings and great features.`;
  }
}

// Get top casino recommendations based on quiz results
export function getTopRecommendations(
  casinos: Casino[], 
  answers: QuizAnswer[], 
  limit: number = 3
): QuizResult[] {
  if (!casinos.length || !answers.length) return [];
  
  const results = casinos
    .map(casino => calculateCasinoMatch(casino, answers))
    .sort((a, b) => {
      // Primary sort: match score
      if (b.matchScore !== a.matchScore) {
        return b.matchScore - a.matchScore;
      }
      // Secondary sort: casino rating
      return b.casino.attributes.rating - a.casino.attributes.rating;
    })
    .slice(0, limit);
  
  return results;
}

// Generate mock casino tags for the 3-question quiz
export function generateCasinoTags(casino: Casino): string[] {
  const tags: string[] = [];
  
  // Game types - randomly assign based on casino characteristics
  const gameTypes = ['slots', 'table_games', 'live_casino'];
  const randomGameType = gameTypes[casino.id % gameTypes.length];
  tags.push(randomGameType);
  
  // Currency preferences - most casinos support CAD, some crypto
  tags.push('cad'); // All Canadian casinos support CAD
  if (casino.id % 3 === 0) {
    tags.push('cryptocurrency'); // Every 3rd casino supports crypto
  }
  if (casino.id % 2 === 0) {
    tags.push('any_currency'); // Every 2nd casino is flexible with currency
  }
  
  // Bonus types - assign based on casino attributes
  if (casino.attributes.noDeposit) {
    tags.push('no_deposit_bonus');
  }
  
  if (casino.attributes.bonusAmount) {
    tags.push('welcome_bonus');
  }
  
  // Some casinos don't focus on bonuses
  if (casino.id % 4 === 0) {
    tags.push('any_bonus');
  }
  
  return tags;
}
