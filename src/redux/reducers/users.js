export default function users(userList = [], action) {
  switch (action.type) {
    case 'ADD_USER_LIST':
      return action.users;
    case 'VIEW_SURVEY_STATUS':
      return action.userId;
    case 'SORT_USERS_BY_NAME':
      return action.users;
    case 'SORT_USERS_BY_EMAIL':
      return action.users;
    case 'SORT_USERS_BY_SURVEY_STATUS':
      return action.users;
    case 'SORT_USERS_BY_SURVEY_DATE':
      return action.users;
    case 'MOVE_TO_PAGE':
      return action.users;
    default:
      return userList;
  }
}
