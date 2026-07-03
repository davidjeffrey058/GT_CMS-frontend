import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import useDebounce from "../hooks/useDebounce";
import AddMemberModal from "../components/addMemberModal";
import MemberDetails from "../components/memberDetails";
import { useState, useEffect } from "react";
import ErrorComponent from "../components/errorComponent";
import { memberStatus } from "../util/constants";
import { setPageTitle } from "../util/methods";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import PageHeader from "../components/pageHeader";


const Members = () => {
  useEffect(() => {
    setPageTitle("Member Management");
  }, []);

  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const page = Number(searchParams.get("page")) || 1;
  const selectedMemberStatus = searchParams.get("status") || "";

  const [selectedPage, setSelectedPage] = useState(page || 1);

 
  useEffect(() => {
      setSelectedPage(page);
  }, [page])

  const [selectedMember, setSelectedMember] = useState(null);
  const debounceSearch = useDebounce(search, 500);

  const { result, error, isPending } = useFetch(
    `${process.env.REACT_APP_BACKEND_URL}/api/members?search=${debounceSearch}&page=${page}&status=${selectedMemberStatus}`,
  );


  const statusIndicator = (status) => {
      if (status === "active") return "success";
      if (status === "inactive") return "danger";
      return "secondary";
  };

  const resetSelectedMember = () => setSelectedMember(null);

  // Member status filter
  const filterButtons = () => (
    memberStatus.map((memSta, index) => (
      <button key={index} className={`btn ${memSta === selectedMemberStatus ? 'btn-secondary': 'btn-outline-secondary'} btn-sm text-capitalize`}
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
    ))
  )

  const checkDateofBirth = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0) {
      age--;
    }

    return age;
  };

  const exportToPDF = (members) => {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(18);
    doc.text(`Members Report`, 14, 22);
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);

    // Table headers
    const headers = [["Name", "Age", "Contact", "Status"]];
    
    autoTable(doc, {
      startY: 40,
      head: headers,
      body: members.map(member => [
        `${member.first_name} ${member.last_name}`,
        checkDateofBirth(member.dob),
        `${member.phone}\n${member.email}`,
        member.membership_status
      ])
    });

    doc.save(`GTCM_Members_Report_${new Date().toLocaleDateString()}.pdf`);
  }

  return (
    <div>
      {/* Page header */}
    
      <PageHeader 
      icon="group.png"
      title="Member Management" 
      subtitle="Manage members, view details, and perform actions related to member management." 
      actionButton={
        <button type="button" 
         className="btn btn-primary btn-sm d-flex gap-2 align-items-center"
         data-bs-toggle="modal" 
         data-bs-target="#staticBackdrop">
          <span className="material-symbols-outlined">
            person_add
          </span>
          Add Member
        </button>
      }
      />

      {/* SEARCH INPUT */}
      <div className="d-flex mb-3 gap-3">
        <div className="expt">
          <button disabled className="btn btn-success btn-sm">Excel</button>
          <button 
          disabled={isPending || !result || result.data.length === 0}
          onClick={() => exportToPDF(result.data)} 
          className="btn btn-danger btn-sm">PDF</button>
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
        <div className="filter">
            {filterButtons()}
        </div>
      </div>
        
      <div className="mobile-filter mb-3">
          <button disabled className="btn btn-success btn-sm">Excel</button>
          <button style={{marginRight: 'auto'}} disabled={isPending || !result || result.data.length === 0} className="btn btn-danger btn-sm">PDF</button>
        {filterButtons()}
      </div>
      

          {/* MEMBER */}
      <div className="card shadow min-vh-50">
        {result && (
          <div className="card-body">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Photo</th>
                  <th>Name</th>
                  <th>Age</th>
                  {/* <th>Gender</th> */}
                  <th>Contact</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {result.data.map((member) => (
                  <tr className={selectedMember && (selectedMember === member._id)? 'table-active': ''} 
                  style={{cursor: 'pointer',}} 
                  key={member._id}  
                  data-bs-toggle="offcanvas" 
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
                    <td><div className="fw-semibold">{member.first_name} {member.last_name}</div></td>
                    <td>{checkDateofBirth(member.dob)}</td>
                    {/* <td className="text-capitalize">{member.gender}</td> */}
                    <td>
                      <div className="small">{member.phone}</div>
                      <div className="small text-muted">{member.email}</div>
                    </td>
                    <td>
                      <span
                        className={`badge bg-${statusIndicator(
                          member.membership_status
                        )} text-capitalize`}
                      >
                        {member.membership_status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {result.data.length === 0 && (
              <div style={{
                height: '250px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
                }}>
                <ErrorComponent errorMessage={'No member records found'} image="search.png"/>
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
                    // setSelectedPage(page -1);
                    setSearchParams((prev) => {
                      prev.set("page", page - 1);
                      return prev;
                    });
                  }}
                >
                  Previous
                </button>

                {/* CURRENT PAGE */}
                <form onSubmit={(e) =>{
                  e.preventDefault();
                  if(selectedPage <= result.meta.pages && selectedPage >= 1){
                    setSearchParams((prev) => {
                      prev.set("page", selectedPage);
                      return prev;
                    })
                  } else {
                    setSelectedPage(page);
                  }
                }}>
                  <input
                    style={{ width: "40px", textAlign: "center" }}
                    type="text"
                    className="form-control"
                    value={selectedPage}
                    onChange={
                    (e) => {
                      const inputValue = e.target.value;
                      setSelectedPage(inputValue);
                    }
                    
                  }
                  />
                </form>
                {/* NEXT */}
                <button
                  className="btn btn-outline-secondary btn-sm"
                  disabled={page >= result.meta.pages}
                  onClick={() => {
                    // setSelectedPage(page + 1);
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
        <AddMemberModal/>

        <MemberDetails memberId={selectedMember} resetSelectedMember={resetSelectedMember}/>

    </div>
  );
};

export default Members;