import emlMarriageSinglenessData from './eml_marriage_singleness.json' with { type: 'json' };

describe('eml_marriage_singleness.json', () => {
  it('has two sections', () => {
    expect(emlMarriageSinglenessData.assessment.sections).toHaveLength(2);
  });

  it('each section has 10 questions', () => {
    for (let i = 0; i < 2; i++) {
      expect(
        emlMarriageSinglenessData.assessment.sections[i].questions
      ).toHaveLength(10);
    }
  });

  it('has 3 buckets in scoring', () => {
    expect(emlMarriageSinglenessData.scoring.buckets).toHaveLength(3);
  });
});
