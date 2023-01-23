function getCurrentUsers(users, currentPage, usersPerPage) {
  const currentUsers = [];
  const startIndex = currentPage * usersPerPage;

  if (users.length - startIndex < usersPerPage) {
    usersPerPage = users.length - startIndex;
  }

  for (let i = startIndex; i < startIndex + usersPerPage; i++) {
    currentUsers.push(users[i]);
  }

  return currentUsers;
}

export default getCurrentUsers;
