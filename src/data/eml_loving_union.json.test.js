import emlLovingUnion from './eml_loving_union.json';

describe('eml_loving_union.json', () => {
  it('has one section', () => {
    expect(emlLovingUnion.assessment.sections.length).toBe(1);
  });

  it('the section has 10 questions', () => {
    expect(emlLovingUnion.assessment.sections[0].questions.length).toBe(10);
  });

  it('has 3 buckets in scoring', () => {
    expect(emlLovingUnion.scoring.buckets.length).toBe(3);
  });
});
