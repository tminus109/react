import "../styles/table.css";

function UsersTable({ users, handleEdit, handleLock }) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date Created</th>
            <th>Edit User</th>
            <th>Lock User</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className={user.status === "locked" ? "locked" : undefined}>
                {user.first_name}
              </td>
              <td className={user.status === "locked" ? "locked" : undefined}>
                {user.last_name}
              </td>
              <td className={user.status === "locked" ? "locked" : undefined}>
                {user.created_at}
              </td>
              <td>
                <button onClick={(e) => handleEdit(e, user)}>Edit</button>
              </td>
              <td>
                <button onClick={(e) => handleLock(e, user)}>
                  {user.status === "locked" ? "Unlock" : "Lock"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;
