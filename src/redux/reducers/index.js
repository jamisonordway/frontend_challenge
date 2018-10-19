import { combineReducers } from 'redux';
import users from './users';
import currentPage from './currentPage';
import userSurveyResults from './userSurveyResults';
import userInfo from './userInfo';
import surveyContext from './surveyContext';

export default combineReducers({
  users,
  currentPage,
  userSurveyResults,
  userInfo,
  surveyContext,
});
