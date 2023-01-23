import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchUser from "../utils/fetchUser";
import getCurrentUsers from "../utils/getCurrentUsers";
import UsersTable from "./UsersTable";
import setUserStatus from "../utils/setUserStatus";
import setErrMsg from "../utils/errMsgs";
import useFetch from "../hooks/useFetch";
import "../styles/table.css";

const url = process.env.REACT_APP_BACKEND_URL;
const usersPerPage = 10;

function UsersPagination() {
  const { data: users, isPending, error } = useFetch(url, "GET");
  const [lockError, setLockError] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [lastPage, setLastPage] = useState(0);
  const [currentUsers, setCurrentUsers] = useState([]);
  const [isLocked, setIsLocked] = useState(false);
  const navigate = useNavigate();

  const usersTableProps = {
    users: currentUsers,
    handleEdit: handleEdit,
    handleLock: handleLock,
  };

  function handleEdit(e, user) {
    navigate(`${user.id}/edit`, { state: user });
  }

  async function handleLock(e, user) {
    setLockError("");
    setUserStatus(user);
    const res = await fetchUser(`${url}/${user.id}`, "PUT", user);
    if (res === undefined) {
      setUserStatus(user);
      setLockError(setErrMsg("resUndefined"));
    } else if (!res.ok) {
      setUserStatus(user);
      setLockError(setErrMsg());
    } else {
      setIsLocked(!isLocked);
    }
  }

  const goToFirstPage = useCallback(() => {
    setCurrentPage(0);
  }, []);

  const goToPrevPage = useCallback(() => {
    if (currentPage > 0) {
      setCurrentPage((prevCurrentPage) => prevCurrentPage - 1);
    }
  }, [currentPage]);

  const goToNextPage = useCallback(() => {
    if (currentPage < lastPage - 1) {
      setCurrentPage((prevCurrentPage) => prevCurrentPage + 1);
    }
  }, [currentPage, lastPage]);

  const goToLastPage = useCallback(() => {
    setCurrentPage(lastPage - 1);
  }, [lastPage]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "ArrowLeft") {
        goToPrevPage();
      } else if (e.key === "ArrowRight") {
        goToNextPage();
      } else if (e.key === "ArrowDown") {
        goToFirstPage();
      } else if (e.key === "ArrowUp") {
        goToLastPage();
      }
    },
    [goToFirstPage, goToLastPage, goToNextPage, goToPrevPage]
  );

  useEffect(() => {
    if (users) {
      setLastPage(Math.ceil(users.length / usersPerPage));
    }
  }, [users]);

  useEffect(() => {
    if (users) {
      setCurrentUsers(getCurrentUsers(users, currentPage, usersPerPage));
    }
  }, [currentPage, users]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div>
      {isPending && <div data-testid="loader-div" className="loader"></div>}
      {error && <div>{error}</div>}
      {lockError && <div>{lockError}</div>}
      {users && <UsersTable {...usersTableProps} />}
      {users && (
        <div>
          <button
            className={currentPage === 0 ? "page-unavailable" : undefined}
            onClick={goToFirstPage}
          >
            First
          </button>
          <button
            className={currentPage === 0 ? "page-unavailable" : undefined}
            onClick={goToPrevPage}
            id="prev-btn"
          >
            Prev
          </button>
          <span>
            {currentPage + 1} / {lastPage}
          </span>
          <button
            className={
              currentPage === lastPage - 1 ? "page-unavailable" : undefined
            }
            onClick={goToNextPage}
            id="next-btn"
          >
            Next
          </button>
          <button
            className={
              currentPage === lastPage - 1 ? "page-unavailable" : undefined
            }
            onClick={goToLastPage}
          >
            Last
          </button>
        </div>
      )}
    </div>
  );
}

export default UsersPagination;
