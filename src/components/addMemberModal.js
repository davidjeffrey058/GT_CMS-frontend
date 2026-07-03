import { useState } from "react";
import { educationalLevels, maritalStatusOptions, departments } from '../util/constants'
import { useAuthContext } from "../hooks/useAuthContext";
import ImageUploadPreview from "./imageUploadPreview";
import { capitalizeWords } from "../util/methods";
import { baptismOptions } from "../util/constants";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

const AddMemberModal = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState(null);
    const [message, setMessage] = useState("");

    const [selectedDepartments, setSelectedDepartments] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
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

    const { user } = useAuthContext();
    // const modalId = "addMemberModal";

    const resetForm = () => {
        setFirstName("");
        setLastName("");
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
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/members`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.token}`
          },
          body: JSON.stringify({
            first_name: firstName.trim(),
            last_name: lastName.trim(),
            dob: dateOfBirth,
            gender,
            phone,
            email,
            address: residentialAddress.trim(),
            occupation: occupation.trim(),
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

        // console.log(data);

        setMessage(data.message || "Member added successfully");
        // window.alert(data.message || "Member added successfully");

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
                    setErr(null);
                    setMessage("");
                  }} 
                  data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">

                  <ImageUploadPreview />
                  <div className="gry">

                    {/* First name and last name */}
                    <div className="row">
                      <div className="col">
                        <label>First Name</label>
                        <input type="text" className="form-control" required
                          placeholder="First Name, Middle Name"
                          value={firstName}
                          onChange={(e) => {
                            setFirstName(capitalizeWords(e.target.value));
                          }}
                        />
                      </div>
                      <div className="col-lg">
                        <label>Last Name</label>
                        <input type="text" className="form-control" required
                          placeholder="Last Name"
                          value={lastName}
                          onChange={(e) => {
                            setLastName(capitalizeWords(e.target.value));
                          }}
                        />
                      </div>
                    </div>

                    {/* gender and dob */}
                    <div className="row">
                      <div className="col">
                          <label>Gender</label>
                          <select className="form-control" required value={gender} onChange={(e) => setGender(e.target.value)}>
                              <option value="">--</option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                          </select>
                      </div>

                      <div className="col">
                          <label>Date of Birth</label>
                          <input type="date" className="form-control" required value={dateOfBirth}
                            onChange={(e) => setDateOfBirth(e.target.value)}/>
                      </div>
                    </div>

                    {/* email and phone */}
                    <div className="row">
                      <div className="col">
                          <label>Email</label>
                          <input type="email" className="form-control" required
                          placeholder="john@example.com"
                          value={email} 
                          onChange={(e) => setEmail(e.target.value.toLowerCase().trim())}
                          />
                      </div>

                      <div className="col-lg">
                          <label>Phone</label>
                          <input type="tel" 
                          className="form-control" 
                          required
                          placeholder="Eg. 0200000000"
                          value={phone} onChange={(e) => setPhone(e.target.value.trim())}
                          />
                      </div>
                    </div>
                    
                    {/* educational level and occupation */}
                    <div className="row">
                      <div className="col">
                          <label>Educational Level</label>
                          <select className="form-control text-capitalize"
                           required value={educationalLevel}
                            onChange={(e) => {
                            const value = e.target.value;
                            if(value === 'undergraduate'){
                              setOccupation('Student')
                            }
                            setEducationalLevel(e.target.value)
                            }}>
                              {educationalLevels.map(level => (
                                  <option className="text-capitalize" key={level} value={level}>{level}</option>
                              ))}
                          </select>
                      </div>

                      <div className="col-lg">
                        <label>Occupation</label>
                        <input type="text" className="form-control" value={occupation} 
                        onChange={(e) => setOccupation(capitalizeWords(e.target.value.trim()))}/>
                      </div>
                    </div>

                    {/* Residential Address, baptism status & baptised date */}
                    <div className="row">
                      <div className="col-lg">
                        <label>Residential Address</label>
                        <input type="text" className="form-control" required placeholder="House No., Street, City"
                          value={residentialAddress} onChange={(e) => setResidentialAddress(e.target.value.trim())}/>
                      </div>
                      
                      <div className="col">
                        <label>Baptism status</label>
                        <select className="form-control text-capitalize" 
                        required 
                        value={baptismStatus}
                        onChange={(e) => setBaptismStatus(e.target.value)}
                        >
                          {baptismOptions.map((option, index) => (
                            <option className="text-capitalize" key={index} value={option}>{option}</option>
                          ))}
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

                      {/* family and family relationship */}
                    <div className="row">
                      <div className="col-lg">
                        <label>Family ID</label>
                        <input type="text" className="form-control"
                        placeholder="fam_000"
                        />
                      </div>
                      <div className="col-lg">
                        <label>Family Relationship</label>
                        <select className="form-control">
                          <option value="">Select Relationship</option>
                          <option value="parent">Parent</option>
                          <option value="child">Son</option>
                          <option value="daughter">Daughter</option>
                          <option value="grandparent">Grandparent</option>
                          <option value="spouse">Spouse</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  

                </div>

                <div className="modal-footer">
                  {err && <div className="alert alert-danger me-auto" role="alert">
                    {err}
                  </div>}

                  {message !== '' && <div className="alert alert-success me-auto" role="alert">
                    {message}
                  </div>}

                  <button type="button" className="btn btn-secondary"
                    onClick={() => {
                      resetForm();
                      setErr(null);
                      setMessage("");
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

          {/* <Modal
          title={'Add New Member'}
          modalId
          onCancel={() => {
            resetForm();
            setErr(null);
            setMessage("");
          }}
          /> */}
        </form>
     );
}
 
export default AddMemberModal;