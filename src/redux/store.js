import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducers/index';

const finalCreateStore = compose(composeWithDevTools(applyMiddleware(thunk)))(createStore);

export default function configureStore(initialState = {
  users: [],
  currentPage: 1,
  userSurveyResults: {},
  userInfo: {},
  surveyContext: 'driver',
}) {
  return finalCreateStore(reducer, initialState);
}
