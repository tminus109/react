import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import EditUser from "./pages/EditUser";
import NewUser from "./pages/NewUser";
import Users from "./pages/Users";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate replace to="/users" />}></Route>
        <Route path="/users">
          <Route index element={<Users />}></Route>
          <Route path="new" element={<NewUser />}></Route>
          <Route path=":id/edit" element={<EditUser />}></Route>
        </Route>
        <Route path="*" element={<Navigate replace to="/users" />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
