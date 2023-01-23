import { useState } from "react";
import fetchUser from "../utils/fetchUser";
import handleRes from "../utils/handleRes";
import Button from "./Button";
import setErrMsg from "../utils/errMsgs";
import "../styles/form.css";

function UserForm({ legend, type: btnType, btnText, user, url, method }) {
  const [firstNameLbl, setFirstNameLbl] = useState("First name:");
  const [lastNameLbl, setLastNameLbl] = useState("Last name:");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState(user);
  const { first_name, last_name, status } = formData;

  function handleChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetchUser(url, method, formData);
    const { firstNameLbl, lastNameLbl, error } = await handleRes(res);
    setFirstNameLbl(firstNameLbl);
    setLastNameLbl(lastNameLbl);
    setError(error);
  }

  return (
    <div>
      <fieldset>
        <legend>{legend}</legend>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <ul>
            <li>
              <label
                htmlFor="first_name"
                id="first-name-lbl"
                className={firstNameLbl !== "First name:" ? "error" : undefined}
              >
                {firstNameLbl}
              </label>
            </li>
            <li>
              <input
                type="text"
                id="first_name"
                placeholder="First name..."
                autoFocus
                value={first_name}
                onChange={handleChange}
              />
            </li>
            <li>
              <label
                htmlFor="last_name"
                id="last-name-lbl"
                className={lastNameLbl !== "Last name:" ? "error" : undefined}
              >
                {lastNameLbl}
              </label>
            </li>
            <li>
              <input
                type="text"
                id="last_name"
                placeholder="Last name..."
                value={last_name}
                onChange={handleChange}
              />
            </li>
            <li hidden>
              <label htmlFor="status">Status:</label>
            </li>
            <li hidden>
              <input
                type="text"
                id="status"
                value={status}
                onChange={handleChange}
              />
            </li>
            <li>
              <Button type={btnType} btnText={btnText} />
            </li>
          </ul>
        </form>
      </fieldset>

      {error && (
        <div className={error !== setErrMsg("success") ? "error" : "success"}>
          {error}
        </div>
      )}
    </div>
  );
}

export default UserForm;
