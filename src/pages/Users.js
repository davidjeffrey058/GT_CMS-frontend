import useFetch from "../hooks/useFetch";
import { useEffect } from "react";
import { setPageTitle } from "../util/methods";
import Modal from "../components/modal";

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

  const modalTitle = "addUserModal";

    return ( 
      <div>
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body d-flex align-items-center justify-content-between">
            <div>
              <h2 className="fw-bold mb-1">
                Users
              </h2>
              <p className="text-muted mb-0">
                Manage sytem users, roles and access
              </p>
            </div>
            <button type="button" 
            className="btn btn-primary btn-sm d-flex gap-2 align-items-center"
            data-bs-toggle="modal" 
            data-bs-target={`#${modalTitle}`}
            >
              <span className="material-symbols-outlined">
                person_add
              </span>
              Add User
            </button>
          </div>
        </div>
        

        <div className="card shadow min-vh-50">
          {result && <div className="card-body">
            <table className="table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
              {result.data.map((user) => (
                  <tr key={user.id}>
                    <td>{user.email}</td>
                    <td><span className={`badge bg-${roleIndicator(user.role)}`}>{user.role}</span></td>
                    <td><span className="material-symbols-outlined">more_vert</span></td>
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

        {/* Add User Modal */}
        <Modal modalId={modalTitle}
        title="Add User"
        saveText="Add User"
        size={'lg'}
        backgroundDismisible = {false}
        closeText="Cancel"
        />
      </div>
     );
}
 
export default Users;