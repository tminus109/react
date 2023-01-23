import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UsersTable from "../components/UsersTable";

const usersTableProps = {
  users: global.usersMock,
  handleEdit: jest.fn(),
  handleLock: jest.fn(),
};

test("Smoke test", () => {
  const div = document.createElement("div");

  render(<UsersTable {...usersTableProps} />, div);
});

test("All column header cells displayed properly", () => {
  render(<UsersTable {...usersTableProps} />);

  const firstName = screen.getByRole("columnheader", { name: /first name/i });
  const lastName = screen.getByRole("columnheader", { name: /last name/i });
  const createdAt = screen.getByRole("columnheader", { name: /date created/i });
  const editUser = screen.getByRole("columnheader", { name: /edit user/i });
  const lockUser = screen.getByRole("columnheader", { name: /lock user/i });

  expect(firstName).toBeInTheDocument();
  expect(firstName).toBeVisible();
  expect(lastName).toBeInTheDocument();
  expect(lastName).toBeVisible();
  expect(createdAt).toBeInTheDocument();
  expect(createdAt).toBeVisible();
  expect(editUser).toBeInTheDocument();
  expect(editUser).toBeVisible();
  expect(lockUser).toBeInTheDocument();
  expect(lockUser).toBeVisible();
});

test("Users displayed properly", () => {
  render(<UsersTable {...usersTableProps} />);

  const cells = screen.getAllByRole("cell");

  expect(cells[0]).toHaveTextContent("A1");
  expect(cells[1]).toHaveTextContent("A2");
  expect(cells[2]).toHaveTextContent("2022-10-12T10:55:10.308Z");
  expect(cells[3]).toHaveTextContent("Edit");
  expect(cells[4]).toHaveTextContent("Lock");

  expect(cells[5]).toHaveTextContent("B1");
  expect(cells[6]).toHaveTextContent("B2");
  expect(cells[7]).toHaveTextContent("2022-10-12T10:55:20.308Z");
  expect(cells[8]).toHaveTextContent("Edit");
  expect(cells[9]).toHaveTextContent("Unlock");
});

test("The edit and lock btns are in the document", () => {
  render(<UsersTable {...usersTableProps} />);

  const editBtns = screen.getAllByRole("button", { name: /edit/i });

  const lockBtns = screen.getAllByRole("button", {
    name: /lock/i || /unlock/i,
  });

  expect(editBtns.length).toBe(2);
  expect(editBtns[0]).toBeVisible();
  expect(editBtns[1]).toBeVisible();

  expect(lockBtns.length).toBe(2);
  expect(lockBtns[0]).toBeVisible();
  expect(lockBtns[1]).toBeVisible();
});

test("handleEdit is called once when edit btn clicked", () => {
  render(<UsersTable {...usersTableProps} />);

  const editBtn = screen.getAllByRole("button", { name: /edit/i })[0];

  userEvent.click(editBtn);

  expect(usersTableProps.handleEdit).toHaveBeenCalledTimes(1);
});

test("handleLock is called once when lock btn clicked", () => {
  render(<UsersTable {...usersTableProps} />);

  const lockBtns = screen.getAllByRole("button", { name: /lock/i });

  userEvent.click(lockBtns[0]);

  expect(usersTableProps.handleLock).toHaveBeenCalledTimes(1);
});
