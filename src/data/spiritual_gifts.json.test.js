import spiritualGiftsData from './spiritual_gifts.json' with { type: 'json' };

describe('spiritual_gifts.json', () => {
  it('has only has one section', () => {
    expect(spiritualGiftsData.assessment.sections).toHaveLength(1);
  });

  it('assessment has 80 questions', () => {
    expect(spiritualGiftsData.assessment.sections[0].questions).toHaveLength(
      80
    );
  });

  it('assesses 16 gifts', () => {
    const gifts = Object.entries(spiritualGiftsData.scoring);
    expect(gifts).toHaveLength(16);
  });

  it('all questions are used in scoring', () => {
    const gifts = Object.entries(spiritualGiftsData.scoring);
    const questions = gifts
      .map((arr) => arr[1])
      .reduce((acc, val) => acc.concat(val), []);
    const set = new Set(questions);
    expect(set.size).toBe(80);
  });

  it('each question has 2 attributes id and question', () => {
    const expectedProperties = ['id', 'question'];
    const allQuestions = spiritualGiftsData.assessment.sections
      .map((s) => s.questions)
      .reduce((acc, val) => acc.concat(val), []);
    allQuestions.forEach((obj) => {
      for (let prop of expectedProperties) {
        expect(obj).toHaveProperty(prop);
      }
    });
  });
});
