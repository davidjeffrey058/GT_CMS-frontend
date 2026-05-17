import { useState } from "react";
import { educationalLevels, maritalStatusOptions, departments } from '../util/constants'

const AddMemberModal = () => {

    // const [response, setResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState(null);

    const [selectedDepartments, setSelectedDepartments] = useState([]);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [phone, setPhone] = useState("");
    const [educationalLevel, setEducationalLevel] = useState("");
    const [occupation, setOccupation] = useState("");
    const [residentialAddress, setResidentialAddress] = useState("");
    const [baptismStatus, setBaptismStatus] = useState("none");
    const [dateBaptized, setDateBaptized] = useState("");
    const [maritalStatus, setMaritalStatus] = useState('single');

    const resetForm = () => {
        setFullName("");
        setEmail("");
        setGender("");
        setDateOfBirth("");
        setPhone("");
        setEducationalLevel("");
        setOccupation("");
        setResidentialAddress("");
        setBaptismStatus("none");
        setDateBaptized("");
        setMaritalStatus("single");
        setSelectedDepartments([]);
    }

    const handleCheckboxChange = (department) => {

        // remove if already selected
        if (selectedDepartments.includes(department)) {
            setSelectedDepartments(
                selectedDepartments.filter(item => item !== department)
            );
        } 
        // add only if less than 3 selected
        else if (selectedDepartments.length < 3) {
            setSelectedDepartments([
                ...selectedDepartments,
                department
            ]);
        } 
        else {
            alert("You can only select 3 departments");
        }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      setIsLoading(true);
      setErr(null);

      try {
        const res = await fetch('http://localhost:4000/api/members', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            full_name: fullName,
            dob: dateOfBirth,
            gender,
            phone,
            email,
            address: residentialAddress,
            occupation,
            baptism: {
              status: baptismStatus,
              date: baptismStatus === "none" ? null : dateBaptized
            },
            educational_level: educationalLevel,
            marital_status: maritalStatus,
            departments: selectedDepartments
          })
        });

        if (!res.ok) {
          throw new Error("Unable to add member");
        }

        const data = await res.json();

        console.log(data);

        window.alert(data.message || "Member added successfully");

        // Optional reset
        resetForm();

      } catch (err) {
        console.log(err);
        setErr(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    return ( 
        <form onSubmit={handleSubmit}>
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" 
        data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">Add New Member</h1>
                <button type="button" className="btn-close"
                onClick={() => {
                  resetForm();
                  err && setErr(null)
                }} 
                data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">

                <div className="gry">
                  <div className="row">
                    {/* full name */}
                    <div className="col-lg">
                      <label>Full Name</label>
                      <input type="text" className="form-control" required  
                      placeholder="First Name, Middle Name, Surname"
                      value={fullName}
                      onChange={(e) =>{
                        setFullName(e.target.value.toUpperCase());
                      }}
                      />
                    </div>

                      {/* Email */}
                    <div className="col">
                      <label>Email</label>
                      <input type="email" className="form-control" required
                      placeholder="user@example.com"
                      value={email}
                      onChange={(e) =>{
                        setEmail(e.target.value.toLowerCase());
                      }}
                      />
                    </div>
                  </div>

                  <div className="row">
                    {/* Gender */}
                    <div className="col">
                        <label>Gender</label>
                        <select className="form-control" required value={gender} onChange={(e) => setGender(e.target.value)}>
                            <option value="">--</option>
                            <option value="male">MALE</option>
                            <option value="female">FEMALE</option>
                        </select>
                    </div>

                      {/* Date of Birth */}
                    <div className="col">
                        <label>Date of Birth</label>
                        <input type="date" className="form-control" required value={dateOfBirth}
                         onChange={(e) => setDateOfBirth(e.target.value)}/>
                    </div>

                      {/* Phone number */}
                    <div className="col-lg">
                        <label>Phone</label>
                        <input type="tel" className="form-control" placeholder="Eg. 0200000000"
                         value={phone} onChange={(e) => setPhone(e.target.value)}/>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col">
                        <label>Educational Level</label>
                        <select className="form-control" required value={educationalLevel}
                         onChange={(e) => {
                          const value = e.target.value;
                          if(value === 'undergraduate'){
                            setOccupation('STUDENT')
                          }
                          setEducationalLevel(e.target.value)
                          }}>
                            {educationalLevels.map(level => (
                                <option key={level} value={level}>{level.toUpperCase()}</option>
                            ))}
                        </select>
                    </div>

                    {/* Occupation */}
                    <div className="col-lg">
                      <label>Occupation</label>
                      <input type="text" className="form-control" value={occupation} 
                      onChange={(e) => setOccupation(e.target.value.toUpperCase())}/>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg">
                      <label>Residential Address</label>
                      <input type="text" className="form-control" required placeholder="House No., Street, City"
                       value={residentialAddress} onChange={(e) => setResidentialAddress(e.target.value)}/>
                    </div>
                    
                    <div className="col">
                      <label>Baptism status</label>
                      <select className="form-control" required value={baptismStatus}
                       onChange={(e) => setBaptismStatus(e.target.value)}>
                        <option value="none">Not Baptized</option>
                        <option value="water">Water Baptized</option>
                        <option value="holy_ghost">Holy Spirit Baptized</option>
                      </select>
                    </div>

                    <div className="col">
                      <label>Date Baptized</label>
                      <input type="date" className="form-control"
                       value={dateBaptized} 
                       onChange={(e) => setDateBaptized(e.target.value)}
                       disabled = {baptismStatus.includes("none")}
                       />
                    </div>
                  </div>

                  <label className="mb-2">Departments</label>                  
                  <div className="d-flex gap-3 flex-wrap mb-3">
                    {departments.map((department, index) => (
                      <div key={department} className="form-check">
                        <input
                          className="btn-check"
                          type="checkbox"
                          id={`btn-check-outlined-${index + 1}`}
                          autoComplete="off"
                          value={department}
                          checked={selectedDepartments.includes(department)}
                          onChange={() => handleCheckboxChange(department)}
                        />
                        <label className="btn btn-outline-dark"
                        style={{fontWeight: 'normal'}}
                         htmlFor={`btn-check-outlined-${index + 1}`}>
                          {department}
                        </label>
                      </div>
                    ))}
                  </div>

                  <label >Marital Status</label>
                  <div className="d-flex gap-4 mb-3">
                    {maritalStatusOptions.map((option, index) => (
                       <div key={index} className="form-check">
                        <input className="form-check-input" name="radioDefault" 
                        type="radio" id={`radioDefault${index}`}
                        value={option}
                        checked={maritalStatus === option}
                        onChange={(e) => {setMaritalStatus(e.target.value)}}
                        />
                        <label className="form-check-label text-capitalize"
                        style={{fontWeight: 'normal'}} 
                        htmlFor={`radioDefault${index}`}>{option}</label>
                      </div>
                    ))}
                  </div>

                    {/* Spouse details */}
                  {maritalStatus !== 'single' && <div className="row">
                    <div className="col-lg">
                      <label>{`${maritalStatus === 'married'? 'Spouse': 'Ex-spouse'} Full Name`}</label>
                      <input type="text" className="form-control"
                      placeholder="First Name, Middle Name, Surname"
                      />
                    </div>
                    <div className="col-lg">
                      <label>{`${maritalStatus === 'married'? 'Spouse': 'Ex-spouse'} Phone Number`}</label>
                      <input type="tel" className="form-control"
                      placeholder="0200000000"
                      />
                    </div>
                  </div>}
                </div>

                

              </div>

              <div className="modal-footer">
                {err && <div className="alert alert-danger me-auto" role="alert">
                  {err}
                </div>}

                <button type="button" className="btn btn-secondary"
                  onClick={() => {
                    resetForm();
                    err && setErr(null);
                  }}
                 data-bs-dismiss="modal">Cancel</button>
                <button
                  disabled={isLoading}
                  type="submit"
                  className="btn btn-primary"
                >
                  {isLoading ? "Adding..." : "Add Member"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
     );
}
 
export default AddMemberModal;