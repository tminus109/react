import setErrMsg from "./errMsgs";

async function handleRes(res) {
  let error = "";
  let firstNameLbl = "First name:";
  let lastNameLbl = "Last name:";

  if (res === undefined) {
    error = setErrMsg("resUndefined");
  } else if (res.ok) {
    error = setErrMsg("success");
  } else {
    try {
      const data = await res.json();
      if (!res.ok) {
        if (data.hasOwnProperty("first_name")) {
          firstNameLbl = `${setErrMsg("firstNameErr")} ${data.first_name[0]}.`;
        }
        if (data.hasOwnProperty("last_name")) {
          lastNameLbl = `${setErrMsg("lastNameErr")} ${data.last_name[0]}.`;
        }
        if (data.hasOwnProperty("status")) {
          error = `${setErrMsg("statusErr")} ${data.status[0]}.`;
        }
      }
    } catch (err) {
      error = setErrMsg("resNotJson");
    }
  }

  return { firstNameLbl, lastNameLbl, error };
}

export default handleRes;
