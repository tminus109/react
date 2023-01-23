import { Link, useLocation, useParams } from "react-router-dom";
import Header from "../components/Header";
import UserForm from "../components/UserForm";

const headerProps = {
  title: "Edit User",
};

function EditUser() {
  const { state } = useLocation();
  const { id } = useParams();

  const userFormProps = {
    legend: "Edit user",
    btnType: "submit",
    btnText: "Update",
    user: {
      first_name: state.first_name,
      last_name: state.last_name,
      status: state.status,
    },
    url: `${process.env.REACT_APP_BACKEND_URL}/${id}`,
    method: "PUT",
  };

  return (
    <>
      <Header {...headerProps} />
      <UserForm {...userFormProps} />
      <Link to="/users">Back to users</Link>
    </>
  );
}

export default EditUser;
