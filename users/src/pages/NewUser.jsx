import { Link } from "react-router-dom";
import Header from "../components/Header";
import UserForm from "../components/UserForm";

const headerProps = {
  title: "New User",
};

const userFormProps = {
  legend: "Add new user",
  btnType: "submit",
  btnText: "Add user",
  user: {
    first_name: "",
    last_name: "",
    status: "active",
  },
  url: process.env.REACT_APP_BACKEND_URL,
  method: "POST",
};

function NewUser() {
  return (
    <>
      <Header {...headerProps} />
      <UserForm {...userFormProps} />
      <Link to="/users">Back to users</Link>
    </>
  );
}

export default NewUser;
