export default class Utils {
  
  static getAssessmentId(id){
    return `a${id}`;
  }

  static getSectionId(id){
    return `s${id}`;
  }

  static getQuestionId(id){
    return `q${id}`;
  }

  static getIndexFromQuestionId(id){
    const matches = id.match(/q(\d+)/);
    if(matches && matches.length == 2){
      return matches[1]-1;
    }else{
      return null;
    }
  }
}