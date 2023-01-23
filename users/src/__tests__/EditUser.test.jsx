import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import EditUser from "../pages/EditUser";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    state: global.usersMock,
  }),
}));

function renderContainer() {
  render(
    <MemoryRouter>
      <EditUser />
    </MemoryRouter>
  );
}

beforeEach(() => {
  jest.clearAllMocks();
});

test("Snapshot test", () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <EditUser />
      </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test("Smoke test", () => {
  const div = document.createElement("div");

  render(
    <MemoryRouter>
      <EditUser />
    </MemoryRouter>,
    div
  );
});

test("Edit User heading displayed properly", () => {
  renderContainer();

  const heading = screen.getByRole("heading", { name: /edit user/i });

  expect(heading).toBeInTheDocument();
  expect(heading).toBeVisible();
  expect(heading.textContent).toBe("Edit User");
});

test("Update btn displayed properly", () => {
  renderContainer();

  const btn = screen.getByRole("button", {
    name: /update/i,
  });

  expect(btn).toBeInTheDocument();
  expect(btn).toBeVisible();
  expect(btn.textContent).toBe("Update");
});

test("Form input labels displayed properly", () => {
  renderContainer();

  const firstNameLbl = screen.getByText(/first name:/i);
  const lastNameLbl = screen.getByText(/last name:/i);
  const statusLbl = screen.getByText(/status:/i);

  expect(firstNameLbl).toBeVisible();
  expect(lastNameLbl).toBeVisible();
  expect(statusLbl).not.toBeVisible();
});

test("Form inputs displayed properly", () => {
  renderContainer();

  const firstNameInput = screen.getByRole("textbox", {
    name: /first name:/i,
  });

  const lastNameInput = screen.getByRole("textbox", {
    name: /last name:/i,
  });

  const statusInput = screen.getByLabelText("Status:");

  expect(firstNameInput).toBeVisible();
  expect(lastNameInput).toBeVisible();
  expect(statusInput).not.toBeVisible();
});

test(`"Back to users" link is in the document`, () => {
  renderContainer();

  const link = screen.getByRole("link", { name: /back to users/i });

  expect(link).toBeInTheDocument();
  expect(link).toBeVisible();
  expect(link.textContent).toBe("Back to users");
});
