export default class Utils {
  static getAssessmentId(id) {
    return `a${id}`;
  }

  static getSectionId(id) {
    return `s${id}`;
  }

  static getQuestionId(id) {
    return `q${id}`;
  }

  static getIndexFromQuestionId(id) {
    const matches = id.match(/q(\d+)/);
    if (matches && matches.length == 2) {
      return matches[1] - 1;
    } else {
      return null;
    }
  }

  static getFrequencyMap(data) {
    return data.reduce((map, val) => {
      if (val !== undefined) {
        if (map.has(val)) {
          map.set(val, map.get(val) + 1);
        } else {
          map.set(val, 1);
        }
      }

      return map;
    }, new Map());
  }
}
