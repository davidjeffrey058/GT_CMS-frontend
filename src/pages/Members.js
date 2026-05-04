import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import useDebounce from "../hooks/useDebounce";

const Members = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const page = Number(searchParams.get("page")) || 1;

  const { result, error, isPending } = useFetch(
    `http://localhost:4000/api/members?search=${useDebounce(search, 500)}&page=${page}`
  );

  const statusIndicator = (status) => {
      if (status === "active") return "success";
      if (status === "inactive") return "danger";
      return "secondary";
  };

  return (
    <div>
      <div className="d-flex justify-content-between mb-3">
        <h4>Members</h4>
        <button type="button" className="btn btn-primary btn-sm d-flex gap-2 align-items-center"data-bs-toggle="modal" data-bs-target="#staticBackdrop">
          <span class="material-symbols-outlined">
            person_add
          </span>
          Add Member
        </button>
      </div>

      {/* SEARCH INPUT */}
      <div className="d-flex mb-3 gap-2">
        <input
          className="form-control "
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
        <button title="Filter list" className="btn btn-outline-secondary btn-sm">
          <span className="material-symbols-outlined">filter_list</span>
        </button>
      </div>

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
                    <td className="text-capitalize">{member.gender}</td>
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
            {result.data.length === 0 && (
              <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "200px" }}>
                <p>No members found.</p>
              </div>
            )}
            <div className="d-flex justify-content-between align-items-center mt-3">
              <p className="fw-semibold">
                {result.data.length} results of {result.meta.total} members
              </p>

              <div className="d-flex gap-3">
                {/* PREVIOUS */}
                <button
                  className="btn btn-outline-secondary btn-sm"
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
                <form >
                  <input
                    style={{ width: "40px", textAlign: "center" }}
                    type="text"
                    className="form-control"
                    value={page}
                    onChange={(e) => setSearchParams((prev) => {
                      const value = e.target.value;
                      prev.set("page", value);
                      return prev;
                    })}
                  />
                </form>
                {/* NEXT */}
                <button
                  className="btn btn-outline-secondary btn-sm"
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

      <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">Add a New Member</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              ...
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-primary">Add Member</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Members;