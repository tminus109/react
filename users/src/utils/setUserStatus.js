function setUserStatus(user) {
  if (user.status === "active") {
    user.status = "locked";
  } else {
    user.status = "active";
  }
}

export default setUserStatus;
