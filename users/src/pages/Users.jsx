import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";
import UsersPagination from "../components/UsersPagination";

const headerProps = {
  title: "Users",
};

function Users() {
  const navigate = useNavigate();

  const btnProps = {
    type: "button",
    btnText: "Add new user",
    handleClick: () => navigate("new"),
  };

  return (
    <>
      <Header {...headerProps} />
      <Button {...btnProps} />
      <UsersPagination />
    </>
  );
}

export default Users;
