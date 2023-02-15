
const assessmentsData = require('./assessments.json');
const spiritualGiftsData = require('./spiritual_gifts.json');
const temperamentsData = require('./temperaments.json');

describe('assessments.json', () => {

  it('has two assessments', () => {
    expect(assessmentsData.length).toBe(2);
  });

});

describe('spiritual_gifts.json', () => {

  it('has only has one section', () => {
    expect(spiritualGiftsData.assessment.sections.length).toBe(1);
  });

  it('assessment has 80 questions', () => {
    expect(spiritualGiftsData.assessment.sections[0].questions.length).toBe(80);
  });

  it('assesses 16 gifts', () => {
    const gifts = Object.entries(spiritualGiftsData.scoring);
    expect(gifts.length).toBe(16);
  });

  it('all questions are used in scoring', () => {
    const gifts = Object.entries(spiritualGiftsData.scoring);
    const questions = gifts.map((arr) => arr[1]).reduce((acc,val) => acc.concat(val),[]);
    const set = new Set(questions);    
    expect(set.size).toBe(80);
  });

  it('each question has 2 attributes id and question', () => {
    const expectedProperties = ['id','question'];
    const allQuestions = spiritualGiftsData.assessment.sections.map((s) => s.questions).reduce((acc,val) => acc.concat(val),[]);
    allQuestions.forEach((obj) => {      
      for(let prop of expectedProperties){        
        expect(obj).toHaveProperty(prop);
      }      
    });
  });

});

describe('temperaments.json', () => {

  it('assessment has 4 sections', () => {
    expect(temperamentsData.assessment.sections.length).toBe(4);
  });

  it('assessment has 40 questions in total', () => {
    const questionCount = temperamentsData.assessment.sections.map((s) => s.questions.length).reduce((acc,val) => acc+val,0);
    expect(questionCount).toBe(40);
  });

  it('scoring has 4 temperaments', () => {
    expect(temperamentsData.scoring.temperaments.length).toBe(4);
  });

  it('answers has 40 elements for each temperament', () => {
    const totalElementCount = temperamentsData.scoring.temperaments.map((t) => t.answers.length).reduce((acc,val) => acc+val, 0);
    expect(totalElementCount).toBe(4*40);
  });

  it('each question has 5 attributes id, A, B, C, D', () => {
    const expectedProperties = ['id','A','B','C','D'];
    const allQuestions = temperamentsData.assessment.sections.map((s) => s.questions).reduce((acc,val) => acc.concat(val),[]);
    allQuestions.forEach((obj) => {      
      for(let prop of expectedProperties){        
        expect(obj).toHaveProperty(prop);
      }      
    });
  });

});