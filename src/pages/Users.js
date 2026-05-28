import useFetch from "../hooks/useFetch";
import { useEffect } from "react";
import { setPageTitle } from "../util/methods";

const Users = () => {
  useEffect(() => {
    setPageTitle("Users");
  }, []);

  const { result, error, isPending } = useFetch(
    `${process.env.REACT_APP_BACKEND_URL}/api/users`
  );

  const roleIndicator = (role) => {
    if (role === "admin") return "danger";
    if (role === "pastor") return "primary";
    if (role === "finance") return "success";
    return "secondary";
  }

    return ( 
      <div>
        <div className="d-flex justify-content-between mb-3">
          <h4>Users</h4>
          <button type="button" className="btn btn-primary btn-sm d-flex gap-2 align-items-center">
            <span className="material-symbols-outlined">
              person_add
            </span>
            Add User
          </button>
        </div>
        

        <div className="card shadow min-vh-50">
          {result && <div className="card-body">
            <table className="table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Role</th>
                </tr>
              </thead>

              <tbody>
              {result.data.map((user) => (
                  <tr key={user.id}>
                    <td>{user.email}</td>
                    <td><span className={`badge bg-${roleIndicator(user.role)}`}>{user.role}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>}

          {isPending && (
            <div class="d-flex justify-content-center align-items-center"
            style={{ minHeight: "300px" }}>
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          )}

          {error && (
            <div
              style={{ minHeight: "300px" }}
              className="card-body d-flex justify-content-center align-items-center"
            >
              <p>{error}</p>
            </div>
          )}
        </div>
      </div>
     );
}
 
export default Users;