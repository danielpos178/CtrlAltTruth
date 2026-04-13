
// Licensed under the GNU AGPL-3.0-only.

export interface StylometryResult {
  score: number;
  meanSentenceLength: number;
  stdDev: number;
  avgWordLength: number;
  lexicalDiversity: number;
}

export function calculateStylometry(text: string): StylometryResult {
  // Step 1: Parse sentences correctly (handle ..., abbreviations, and ?!)
  // A robust regex to split sentences, considering common punctuation.
  const sentences = text
    .replace(/([.?!])\s*(?=[A-ZĂÂÎȘȚ])/g, "$1|")
    .split("|")
    .map(s => s.trim())
    .filter(s => s.length > 0);

  if (sentences.length === 0) {
    return { score: 0, meanSentenceLength: 0, stdDev: 0, avgWordLength: 0, lexicalDiversity: 0 };
  }
  
  // Step 2: Calculate word count for each sentence
  const lengths = sentences.map(s => s.split(/\s+/).filter(w => w.replace(/[^a-zA-Z0-9ăâîșțĂÂÎȘȚ]/g, '').length > 0).length);
  
  // Step 3: Calculate Mean (mu)
  const meanSentenceLength = lengths.reduce((sum, len) => sum + len, 0) / lengths.length;
  
  // Step 4: Calculate Variance and Standard Deviation (sigma)
  const variance = lengths.reduce((sum, len) => sum + Math.pow(len - meanSentenceLength, 2), 0) / lengths.length;
  const stdDev = Math.sqrt(variance);
  
  // Step 5: Calculate Average Word Length & Lexical Diversity
  const words = text.trim().split(/\s+/).map(w => w.replace(/[^a-zA-Z0-9ăâîșțĂÂÎȘȚ]/g, '').toLowerCase()).filter(w => w.length > 0);
  const avgWordLength = words.length > 0 
    ? words.reduce((sum, word) => sum + word.length, 0) / words.length
    : 0;
    
  const uniqueWords = new Set(words);
  const lexicalDiversity = words.length > 0 ? (uniqueWords.size / words.length) * 100 : 0;
  
  // Evaluation Logic
  // Human text: High stdDev (burstiness), AI text: Low stdDev (uniform lengths)
  let score = 0;
  if (stdDev <= 2) {
    score = 95;
  } else if (stdDev >= 8) {
    score = 10;
  } else {
    // Linear interpolation between 2 and 8
    score = 95 - ((stdDev - 2) / 6) * 85;
  }
  
  // Adjust slightly based on avgWordLength
  if (avgWordLength > 6) {
    score = Math.min(100, score + 10);
  } else if (avgWordLength < 4.5) {
    score = Math.max(0, score - 10);
  }
  
  return {
    score: Math.round(score),
    meanSentenceLength: parseFloat(meanSentenceLength.toFixed(1)),
    stdDev: parseFloat(stdDev.toFixed(2)),
    avgWordLength: parseFloat(avgWordLength.toFixed(1)),
    lexicalDiversity: parseFloat(lexicalDiversity.toFixed(1))
  };
}
