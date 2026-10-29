import assessmentsData from './assessments.json' with { type: 'json' };

describe('assessments.json', () => {
  it('has 5 assessments', () => {
    expect(assessmentsData.assessments).toHaveLength(5);
  });
});
