export default function userSurveyResults(userSurveyObj = {}, action) {
  switch (action.type) {
    case 'VIEW_SURVEY_RESULTS':
      return action.userSurveyResults;
    default:
      return userSurveyObj;
  }
}
