import Utils from './Utils.js';

describe('Utils', () => {
  it('getAssessmentId prepends "a" to id', () => {
    expect(Utils.getAssessmentId(1)).toBe('a1');
  });

  it('getSectionId prepends "s" to id', () => {
    expect(Utils.getSectionId(1)).toBe('s1');
  });

  it('getQuestionId prepends "q" to id', () => {
    expect(Utils.getQuestionId(1)).toBe('q1');
  });

  describe('getIndexFromQuestionId', () => {
    it('gets index from valid question id', () => {
      expect(Utils.getIndexFromQuestionId('q1')).toBe(0);
    });

    it('returns null for invalid question id', () => {
      expect(Utils.getIndexFromQuestionId('b1')).toBe(null);
    });
  });

  describe('getFrequencyMap', () => {

    it('return empty map if there is no data', () => {
      const map = Utils.getFrequencyMap([]);
      expect(map.size).toBe(0);
    });

    it('computes frequency correctly', () => {
      const map = Utils.getFrequencyMap([1,2,1,3]);
      expect(map.get(1)).toBe(2);
      expect(map.get(2)).toBe(1);
      expect(map.get(3)).toBe(1);
    });

    it('excludes undefined values', () => {
      const map = Utils.getFrequencyMap([1,2,1,undefined]);
      expect(map.get(1)).toBe(2);
      expect(map.get(2)).toBe(1);      
    });

  });
});
