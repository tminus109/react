import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UserForm from "../components/UserForm";
import handleRes from "../utils/handleRes";

const userFormProps = {
  legend: "Add user",
  btnType: "submit",
  btnText: "Add",
  user: {
    first_name: "Ton",
    last_name: "Tin",
    status: "active",
  },
  url: "",
  method: "POST",
};

jest.mock("../utils/fetchUser");
jest.mock("../utils/handleRes");

beforeEach(() => {
  jest.clearAllMocks();
});

test("Smoke test", () => {
  const div = document.createElement("div");

  render(<UserForm {...userFormProps} />, div);
});

test("Legend and btnText props displayed properly", () => {
  render(<UserForm {...userFormProps} />);

  const legend = screen.getByText(/add user/i);
  const btn = screen.getByRole("button", { name: /add/i });

  expect(legend).toBeInTheDocument();
  expect(legend).toBeVisible();
  expect(btn).toBeInTheDocument();
  expect(btn).toBeVisible();
});

test("User prop is displayed properly", () => {
  render(<UserForm {...userFormProps} />);

  const firstNameInput = screen.getByRole("textbox", { name: /first name:/i });
  const lastNameInput = screen.getByRole("textbox", { name: /last name:/i });
  const statusInput = screen.getByLabelText("Status:");

  expect(firstNameInput).toBeInTheDocument();
  expect(firstNameInput).toBeVisible();
  expect(firstNameInput).toHaveValue("Ton");
  expect(lastNameInput).toBeInTheDocument();
  expect(lastNameInput).toBeVisible();
  expect(lastNameInput).toHaveValue("Tin");
  expect(statusInput).toBeInTheDocument();
  expect(statusInput).not.toBeVisible();
  expect(statusInput).toHaveValue("active");
});

test("Input handles change properly", () => {
  render(<UserForm {...userFormProps} />);

  const firstNameInput = screen.getByRole("textbox", { name: /first name:/i });
  const lastNameInput = screen.getByRole("textbox", { name: /last name:/i });

  expect(firstNameInput).toHaveValue("Ton");
  expect(lastNameInput).toHaveValue("Tin");

  userEvent.type(firstNameInput, "Ton");
  userEvent.type(lastNameInput, "Tin");

  expect(firstNameInput).toHaveValue("TonTon");
  expect(lastNameInput).toHaveValue("TinTin");
});

test("When response is !ok, error msgs are in the document", async () => {
  handleRes.mockImplementation(() => ({
    firstNameLbl: "First name can't be blank.",
    lastNameLbl: "Last name can't be blank.",
    error: "",
  }));

  render(<UserForm {...userFormProps} />);

  const addBtn = screen.getByRole("button", { name: /add/i });

  userEvent.click(addBtn);

  const firstNameLbl = await screen.findByText(/first name can't be blank\./i);
  const lastNameLbl = await screen.findByText(/last name can't be blank\./i);

  expect(firstNameLbl).toBeInTheDocument();
  expect(firstNameLbl).toBeVisible();
  expect(lastNameLbl).toBeInTheDocument();
  expect(lastNameLbl).toBeVisible();
});

test("When response is ok, success msg is in the document", async () => {
  handleRes.mockImplementation(() => ({
    firstNameLbl: "First name:",
    lastNameLbl: "Last name:",
    error: "User has been successfully saved : )",
  }));

  render(<UserForm {...userFormProps} />);

  const addBtn = screen.getByRole("button", { name: /add/i });

  userEvent.click(addBtn);

  const successMsg = await screen.findByText(
    /user has been successfully saved : \)/i
  );

  expect(successMsg).toBeInTheDocument();
  expect(successMsg).toBeVisible();
});
