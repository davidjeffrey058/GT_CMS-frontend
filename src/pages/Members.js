import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import useDebounce from "../hooks/useDebounce";
import AddMemberModal from "../components/addMemberModal";
import MemberDetails from "../components/memberDetails";
import { useState } from "react";
import ErrorComponent from "../components/errorComponent";
import { memberStatus } from "../util/constants"


const Members = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const page = Number(searchParams.get("page")) || 1;
  const selectedMemberStatus = searchParams.get("status") || "";

  const [selectedMember, setSelectedMember] = useState(null)
  const debounceSearch = useDebounce(search, 500)

  const { result, error, isPending } = useFetch(
    `http://localhost:4000/api/members?search=${debounceSearch}&page=${page}&status=${selectedMemberStatus}`
  );

  const statusIndicator = (status) => {
      if (status === "active") return "success";
      if (status === "inactive") return "danger";
      return "secondary";
  };

  const resetSelectedMember = () => setSelectedMember(null);

  return (
    <div>
      <div className="d-flex justify-content-between mb-3">
        <h4>Members</h4>
        <button type="button" className="btn btn-primary btn-sm d-flex gap-2 align-items-center"data-bs-toggle="modal" data-bs-target="#staticBackdrop">
          <span className="material-symbols-outlined">
            person_add
          </span>
          Add Member
        </button>
      </div>

      {/* SEARCH INPUT */}
      <div className="d-flex mb-3 gap-3">
        <div className="d-flex gap-2 export">
          <button disabled className="btn btn-success btn-sm">Excel</button>
          <button disabled className="btn btn-danger btn-sm">PDF</button>
        </div>

        <input
          className="form-control "
          placeholder="Search members..."
          value={search}
          onChange={(e) => {
            const value = e.target.value;

            setSearchParams((prev) => {
              const params = new URLSearchParams(prev);
              params.set("search", value);
              params.set("page", 1);
              return params;
            });
          }}
        />
        {/* <button title="Filter list" className="btn btn-outline-secondary btn-sm">
          <span className="material-symbols-outlined">filter_list</span>
        </button> */}
        <div className="d-flex gap-2 ">
            {memberStatus.map((memSta, index) => (
              <button key={index} className={`btn ${memSta === selectedMemberStatus ? 'btn-secondary': 'btn-outline-secondary'} btn-sm`}
                onClick={() => {
                  setSearchParams((prev) => {
                    const params = new URLSearchParams(prev);
                    if(memSta === selectedMemberStatus){
                      params.set("status", '');
                      return params;
                    }
                    params.set("search", '');
                    params.set("page", 1);
                    params.set("status", memSta);
                    return params;
                  })
                }}
              >{memSta}</button>
            ))}
        </div>
      </div>

      

          {/* MEMBER */}
      <div className="card shadow min-vh-50">
        {result && (
          <div className="card-body">
            <table className="table table-hover align-middle">
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
                  <tr className={selectedMember && (selectedMember === member._id)? 'table-active': ''} style={{cursor: 'pointer',}} key={member._id}  data-bs-toggle="offcanvas" 
                  data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"
                  onClick={() => setSelectedMember(member._id)}
                  >
                    <td>
                      <img
                        src={member.photo || `/images/${(member.gender === 'male')? 'man.png':'woman.png'}`}
                        onError={(e) => {
                          e.target.src = '/images/broken-image.png';
                        }}
                        alt="..."
                        className="img-fluid rounded-circle"
                        style={{ width: "40px", height: "40px" }}
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
          <div className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "300px" }}>
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {error && ( <ErrorComponent errorMessage={error} ContainerHeight="300px"/> )}
      </div>

        {/* ADD MEMBER MODAL */}
        <AddMemberModal />

        <MemberDetails memberId={selectedMember} resetSelectedMember={resetSelectedMember}/>

    </div>
  );
};

export default Members;