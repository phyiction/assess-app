import temperamentsData from './temperaments.json' with { type: 'json' };

describe('temperaments.json', () => {
  it('assessment has 4 sections', () => {
    expect(temperamentsData.assessment.sections).toHaveLength(4);
  });

  it('assessment has 40 questions in total', () => {
    const questionCount = temperamentsData.assessment.sections
      .map((s) => s.questions.length)
      .reduce((acc, val) => acc + val, 0);
    expect(questionCount).toBe(40);
  });

  it('scoring has 4 temperaments', () => {
    expect(temperamentsData.scoring.temperaments).toHaveLength(4);
  });

  it('answers has 40 elements for each temperament', () => {
    const totalElementCount = temperamentsData.scoring.temperaments
      .map((t) => t.answers.length)
      .reduce((acc, val) => acc + val, 0);
    expect(totalElementCount).toBe(4 * 40);
  });

  it('each question has 5 attributes id, A, B, C, D', () => {
    const expectedProperties = ['id', 'A', 'B', 'C', 'D'];
    const allQuestions = temperamentsData.assessment.sections
      .map((s) => s.questions)
      .reduce((acc, val) => acc.concat(val), []);
    allQuestions.forEach((obj) => {
      for (let prop of expectedProperties) {
        expect(obj).toHaveProperty(prop);
      }
    });
  });
});
