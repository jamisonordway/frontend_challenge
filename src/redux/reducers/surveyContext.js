export default function surveyContext(surveyContextStr = '', action) {
  switch (action.type) {
    case 'SET_SURVEY_CONTEXT':
      return action.surveyContext;
    default:
      return surveyContextStr;
  }
}
