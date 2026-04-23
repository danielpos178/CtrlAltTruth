import { describe, it, expect } from 'vitest';
import { calculateStylometry } from '@/utils/stylometry';

describe('calculateStylometry', () => {
  it('should return zeros for empty text', () => {
    const result = calculateStylometry('');
    expect(result).toEqual({
      score: 0,
      meanSentenceLength: 0,
      stdDev: 0,
      avgWordLength: 0,
      lexicalDiversity: 0
    });
  });

  it('should calculate metrics for a simple sentence', () => {
    const text = 'This is a simple sentence.';
    const result = calculateStylometry(text);
    
    // 5 words, length of words: 4, 2, 1, 6, 8 => average is (4+2+1+6+8)/5 = 21/5 = 4.2
    expect(result.meanSentenceLength).toBe(5);
    expect(result.avgWordLength).toBe(4.2);
    expect(result.lexicalDiversity).toBe(100); // All unique words
  });

  it('should handle multiple sentences and calculate variance', () => {
    const text = 'This is short. This is a significantly longer sentence to test variance.';
    const result = calculateStylometry(text);
    
    // Sentence 1: 3 words
    // Sentence 2: 9 words
    // Mean: 6
    // Variance: ((3-6)^2 + (9-6)^2) / 2 = (9 + 9) / 2 = 9
    // StdDev: 3
    expect(result.meanSentenceLength).toBe(6);
    expect(result.stdDev).toBe(3);
  });
});
