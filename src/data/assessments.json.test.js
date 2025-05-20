import assessmentsData from './assessments.json';

describe('assessments.json', () => {
  it('has 5 assessments', () => {
    expect(assessmentsData.assessments.length).toBe(5);
  });
});
