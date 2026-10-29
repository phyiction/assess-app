import emlLovingUnion from './eml_loving_union.json' with { type: 'json' };

describe('eml_loving_union.json', () => {
  it('has one section', () => {
    expect(emlLovingUnion.assessment.sections).toHaveLength(1);
  });

  it('the section has 10 questions', () => {
    expect(emlLovingUnion.assessment.sections[0].questions).toHaveLength(10);
  });

  it('has 3 buckets in scoring', () => {
    expect(emlLovingUnion.scoring.buckets).toHaveLength(3);
  });
});
