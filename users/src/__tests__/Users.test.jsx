import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import * as router from "react-router";
import renderer from "react-test-renderer";
import userEvent from "@testing-library/user-event";
import Users from "../pages/Users";
import useFetch from "../hooks/useFetch";

jest.mock("../hooks/useFetch");

function renderContainer() {
  render(
    <MemoryRouter>
      <Users />
    </MemoryRouter>
  );
}

beforeEach(() => {
  jest.clearAllMocks();
});

test("Snapshot test", () => {
  useFetch.mockReturnValueOnce({ data: null, isPending: false, error: "" });

  const tree = renderer
    .create(
      <MemoryRouter>
        <Users />
      </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test("Smoke test", () => {
  useFetch.mockReturnValueOnce({ data: null, isPending: false, error: "" });

  const div = document.createElement("div");

  render(
    <MemoryRouter>
      <Users />
    </MemoryRouter>,
    div
  );
});

test("Users heading displayed properly", () => {
  useFetch.mockReturnValueOnce({ data: null, isPending: false, error: "" });
  renderContainer();

  const heading = screen.getByRole("heading", { name: /users/i });

  expect(heading).toBeInTheDocument();
  expect(heading).toBeVisible();
  expect(heading.textContent).toBe("Users");
});

test("Add new user btn displayed properly", () => {
  useFetch.mockReturnValueOnce({ data: null, isPending: false, error: "" });
  renderContainer();

  const btn = screen.getByRole("button", {
    name: /add new user/i,
  });

  expect(btn).toBeInTheDocument();
  expect(btn).toBeVisible();
  expect(btn.textContent).toBe("Add new user");
});

test(`Button navigates to "/new" when clicked`, () => {
  useFetch.mockReturnValueOnce({ data: null, isPending: false, error: "" });
  const mockNavigate = jest.fn();
  jest.spyOn(router, "useNavigate").mockImplementation(() => mockNavigate);
  
  renderContainer();

  const btn = screen.getByRole("button", {
    name: /add new user/i,
  });

  userEvent.click(btn);

  expect(mockNavigate).toHaveBeenCalledWith("new");
});

test("Button's background color changes on hover", () => {
  useFetch.mockReturnValueOnce({ data: null, isPending: false, error: "" });
  renderContainer();

  const btn = screen.getByRole("button", {
    name: /add new user/i,
  });

  userEvent.hover(btn);

  expect(btn).toHaveStyle("backgroundColor: rgb(74, 30, 170, 0.1)");
});

test("Loader div is displayed when isPending is true", () => {
  useFetch.mockReturnValueOnce({ data: null, isPending: true, error: "" });
  renderContainer();

  const loader = screen.getByTestId("loader-div");

  expect(loader).toBeInTheDocument();
  expect(loader).toBeVisible();
});

test("useFetch is called once", () => {
  useFetch.mockReturnValueOnce({ data: null, isPending: false, error: "" });
  renderContainer();
  expect(useFetch).toHaveBeenCalledTimes(1);
});

test("Error is displayed", () => {
  useFetch.mockReturnValueOnce({
    data: null,
    isPending: false,
    error: "Something went wrong",
  });

  renderContainer();

  const error = screen.getByText("Something went wrong");

  expect(error).toBeInTheDocument();
  expect(error).toBeVisible();
});

test("users table, mockUsers[1]' first_name, last_name and created_at are in the document", () => {
  useFetch.mockImplementation(() => ({
    data: global.usersMock,
    isPending: false,
    error: "",
  }));

  renderContainer();

  const table = screen.getByRole("table");
  const firstName = screen.getByText("A1");
  const lastName = screen.getByText("A1");
  const createdAt = screen.getByText("2022-10-12T10:55:10.308Z");

  expect(table).toBeInTheDocument();
  expect(table).toBeVisible();
  expect(firstName).toBeInTheDocument();
  expect(firstName).toBeVisible();
  expect(lastName).toBeInTheDocument();
  expect(lastName).toBeVisible();
  expect(createdAt).toBeInTheDocument();
  expect(createdAt).toBeVisible();
});

test("users' status has the correct className", () => {
  useFetch.mockImplementation(() => ({
    data: global.usersMock,
    isPending: false,
    error: "",
  }));

  renderContainer();

  const activeUser = screen.getByText("A1");
  const lockedUser = screen.getByText("B1");

  expect(activeUser).not.toHaveClass("locked");
  expect(lockedUser).toHaveClass("locked");
});
