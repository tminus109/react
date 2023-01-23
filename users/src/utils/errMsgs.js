function setErrMsg(errName) {
  let errMsg = "";

  switch (errName) {
    case "success":
      errMsg = "User has been successfully saved : )";
      break;
    case "resUndefined":
      errMsg =
        "Request has failed. If your connection is ok then it's probably a server error. Please, try again later.";
      break;
    case "firstNameErr":
      errMsg = "First name ";
      break;
    case "lastNameErr":
      errMsg = "Last name ";
      break;
    case "statusErr":
      errMsg = "Status ";
      break;
    case "resNotJson":
      errMsg =
        "Request has failed. Server response is not in the right format.";
      break;
    default:
      errMsg = "Something went wrong : (";
  }

  return errMsg;
}

export default setErrMsg;
