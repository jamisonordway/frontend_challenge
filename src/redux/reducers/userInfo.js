export default function userInfo(userInfoObj = {}, action) {
  switch (action.type) {
    case 'GET_SPECIFIC_USER':
      return action.userInfo;
    default:
      return userInfoObj;
  }
}
