export function redirectToUserList() {
  return setTimeout(() => {
    window.location.replace('/userList');
  }, 3000);
}
