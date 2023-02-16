import Utils from './Utils.js';

describe('Utils', () => {

  it('getAssessmentId prepends "a" to id', () => {
    expect(Utils.getAssessmentId(1)).toBe("a1");
  });

  it('getSectionId prepends "s" to id', () => {
    expect(Utils.getSectionId(1)).toBe("s1");
  });

  it('getQuestionId prepends "q" to id', () => {
    expect(Utils.getQuestionId(1)).toBe("q1");
  });

  it('getIndexFromQuestionId gets index from valid question id', () => {
    expect(Utils.getIndexFromQuestionId("q1")).toBe(0);
  });

  it('getIndexFromQuestionId returns null for invalid question id', () => {
    expect(Utils.getIndexFromQuestionId("b1")).toBe(null);
  });

});