import * as _ from 'lodash';

const actions = {
  addUserList: (users = []) => ({
    type: 'ADD_USER_LIST',
    users,
  }),
  viewSurveyStatus: (userId = 0) => ({
    type: 'VIEW_SURVEY_STATUS',
    userId,
  }),
  sortByName: (meta = {}, users = [], order = 'asc') => {
    const splitName = (name) => {
      const parts = name.split(' ');

      if (parts.length === 2) {
        return parts[1];
      }

      // match for common surnames
      if (parts.length > 2) {
        const re = /\s(van|von|di|du|de|della|del|o’|mc|mac|saint|los|la)\s/i;
        const match = re.exec(name);
        return match ? match[1] : parts[1];
      }

      return name;
    };

    const userData = _.orderBy(users, [o => splitName(o.full_name)], [order]);

    return {
      type: 'SORT_USERS_BY_NAME',
      order,
      users: {
        meta,
        data: userData,
      },
    };
  },
  sortByEmail: (meta = {}, users = [], order = 'asc') => ({
    type: 'SORT_USERS_BY_EMAIL',
    order,
    users: {
      meta,
      data: _.orderBy(users, [o => o.email.toLowerCase()], [order]),
    },
  }),
  sortBySurveyStatus: (meta = {}, users = []) => ({
    type: 'SORT_USERS_BY_SURVEY_STATUS',
    users: {
      meta,
      data: users,
    },
  }),
  sortBySurveyDate: (meta = {}, users = [], order = 'asc') => ({
    type: 'SORT_USERS_BY_SURVEY_DATE',
    order,
    users: {
      meta,
      data: _.orderBy(users, [o => Date.parse(o.survey_date)], [order]),
    },
  }),
  moveToPage: (page, users) => ({
    type: 'MOVE_TO_PAGE',
    users,
    currentPage: page,
  }),
  viewSurveyResults: (id = 0, userSurveyResults = {}) => ({
    type: 'VIEW_SURVEY_RESULTS',
    id,
    userSurveyResults,
  }),
  getSpecificUser: (id = 0, userInfo = {}) => ({
    type: 'GET_SPECIFIC_USER',
    id,
    userInfo,
  }),
  setSurveyContext: (surveyContext = '') => ({
    type: 'SET_SURVEY_CONTEXT',
    surveyContext,
  }),
};

export default actions;
