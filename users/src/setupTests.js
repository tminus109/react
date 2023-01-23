import "@testing-library/jest-dom";

const users = [
  {
    id: 1,
    last_name: "A2",
    first_name: "A1",
    status: "active",
    created_at: "2022-10-12T10:55:10.308Z",
  },
  {
    id: 2,
    last_name: "B2",
    first_name: "B1",
    status: "locked",
    created_at: "2022-10-12T10:55:20.308Z",
  },
];

global.usersMock = users;
