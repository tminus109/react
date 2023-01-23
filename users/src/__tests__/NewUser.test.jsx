import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import NewUser from "../pages/NewUser";

function renderContainer() {
  render(
    <MemoryRouter>
      <NewUser />
    </MemoryRouter>
  );
}

test("Snapshot test", () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <NewUser />
      </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test("Smoke test", () => {
  const div = document.createElement("div");

  render(
    <MemoryRouter>
      <NewUser />
    </MemoryRouter>,
    div
  );
});

test("New User heading displayed properly", () => {
  renderContainer();

  const heading = screen.getByRole("heading", { name: /new user/i });

  expect(heading).toBeInTheDocument();
  expect(heading).toBeVisible();
  expect(heading.textContent).toBe("New User");
});

test("Add user btn displayed properly", () => {
  renderContainer();

  const btn = screen.getByRole("button", {
    name: /add user/i,
  });

  expect(btn).toBeInTheDocument();
  expect(btn).toBeVisible();
  expect(btn.textContent).toBe("Add user");
});

test("Form input labels displayed properly", () => {
  renderContainer();

  const firstNameLbl = screen.getByText(/first name:/i);
  const lastNameLbl = screen.getByText(/last name:/i);
  const statusLbl = screen.getByText(/status:/i);

  expect(firstNameLbl.textContent).toBe("First name:");
  expect(lastNameLbl.textContent).toBe("Last name:");
  expect(statusLbl.textContent).toBe("Status:");
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

  expect(firstNameInput.value).toBe("");
  expect(lastNameInput.value).toBe("");
  expect(statusInput.value).toBe("active");
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
