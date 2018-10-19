export default function currentPage(page = 1, action) {
  switch (action.type) {
    case 'MOVE_TO_PAGE':
      return action.currentPage;
    default:
      return page;
  }
}
