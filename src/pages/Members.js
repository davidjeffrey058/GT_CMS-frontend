import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const Members = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const page = Number(searchParams.get("page")) || 1;

  const statusIndicator = (status) => {
    if (status === "active") return "success";
    if (status === "inactive") return "danger";
    return "secondary";
  };

  const { result, error, isPending } = useFetch(
    `http://localhost:4000/api/members?search=${search}&page=${page}&limit=5`
  );

  return (
    <div>
      <div className="d-flex justify-content-between mb-3">
        <h4>Members</h4>
        <button className="btn btn-primary">Add Member</button>
      </div>

      {/* SEARCH INPUT */}
      <input
        className="form-control mb-3"
        placeholder="Search members..."
        value={search}
        onChange={(e) => {
          const value = e.target.value;

          setSearchParams((prev) => {
            prev.set("search", value);
            prev.set("page", 1); // reset page on new search
            return prev;
          });
        }}
      />

      <div className="card shadow min-vh-50">
        {result && (
          <div className="card-body">
            <table className="table table-hover">
              <thead className="table-light">
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Gender</th>
                  <th>Phone</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {result.data.map((member) => (
                  <tr key={member.id}>
                    <td>
                      <img
                        src=""
                        alt="Photo"
                        className="img-fluid rounded-circle"
                        style={{ width: "50px", height: "50px" }}
                      />
                    </td>
                    <td>{member.full_name}</td>
                    <td>{member.gender}</td>
                    <td>{member.phone}</td>
                    <td>
                      <span
                        className={`badge bg-${statusIndicator(
                          member.membership_status
                        )}`}
                      >
                        {member.membership_status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="d-flex justify-content-between align-items-center mt-3">
              <p>
                {result.data.length} results of {result.meta.total} members
              </p>

              <div className="d-flex gap-3">
                {/* PREVIOUS */}
                <button
                  className="btn btn-outline-primary"
                  disabled={page <= 1}
                  onClick={() => {
                    setSearchParams((prev) => {
                      prev.set("page", page - 1);
                      return prev;
                    });
                  }}
                >
                  Previous
                </button>

                {/* CURRENT PAGE */}
                <input
                  style={{ width: "40px", textAlign: "center" }}
                  type="text"
                  className="form-control"
                  value={page}
                  readOnly
                />

                {/* NEXT */}
                <button
                  className="btn btn-outline-primary"
                  disabled={page >= result.meta.pages}
                  onClick={() => {
                    setSearchParams((prev) => {
                      prev.set("page", page + 1);
                      return prev;
                    });
                  }}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        {isPending && (
          <div
            style={{ minHeight: "300px" }}
            className="card-body d-flex justify-content-center align-items-center"
          >
            <p>Loading...</p>
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
};

export default Members;