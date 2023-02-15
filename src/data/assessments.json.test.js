
import assessmentsData from './assessments.json';

describe('assessments.json', () => {

  it('has two assessments', () => {
    expect(assessmentsData.length).toBe(2);
  });

});