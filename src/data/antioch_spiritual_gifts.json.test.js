import assessmentData from './antioch_spiritual_gifts.json';

describe('antioch_spiritual_gifts.json', () => {
  it('has 1 section', () => {
    expect(assessmentData.assessment.sections.length).toBe(1);
  });

  it('has 138 questions in section', () => {
    expect(assessmentData.assessment.sections[0].questions.length).toBe(138);
    assessmentData.assessment.sections[0].questions.forEach((q, i) => {
      expect(q.id).toBe(i + 1);
      expect(q.question).toBeDefined();
      expect(q.question).not.toBeNull();
    });
  });

  describe('scoring', () => {
    it('has 23 buckets', () => {
      expect(assessmentData.scoring.buckets.length).toBe(23);
    });

    it('has buckets with 6 values', () => {
      assessmentData.scoring.buckets.forEach((bucket, i) => {
        console.log(bucket);
        expect(bucket.values.length).toBe(6);
        bucket.values.forEach((val, j) => {
          switch (j) {
            case 0:
              expect(val).toBe(1 + i);
              break;
            case 1:
              expect(val).toBe(24 + i);
              break;
            case 2:
              expect(val).toBe(47 + i);
              break;
            case 3:
              expect(val).toBe(70 + i);
              break;
            case 4:
              expect(val).toBe(93 + i);
              break;
            case 5:
              expect(val).toBe(116 + i);
              break;
          }
        });
      });
    });
  });
});
