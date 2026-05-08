import { useState } from "react";

const AddMemberModal = () => {

    const departments = [
    'Choir',
      'Ushering',
      'Media',
      'Children Ministry',
      'Youth Ministry',
      'Prayer Team',
      'Protocol',
      'Evangelism',
      'Sanctuary',
      'Technical'
    ];
    const educationalLevels = ['none', 'primary','jhs', 'shs', 'diploma', 'degree', 'postgraduate','master\'s degree', 'phd'];
    
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const newMember = {
            fullName,
            email,
            gender,
            dateOfBirth,
            phone,
            educationalLevel,
            occupation,
            residentialAddress,
            baptismStatus,
            dateBaptized,
            selectedDepartments
        };
        console.log(newMember);
    };

    return ( 
        <form onSubmit={handleSubmit}>
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">Add a New Member</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">

                <div className="gry">
                  <div className="row">
                    <div className="col-lg">
                      <label>Full Name</label>
                      <input type="text" class="form-control" required  
                      placeholder="First Name, Middle Name, Last Name"
                      value={fullName}
                      onChange={(e) =>{
                        setFullName(e.target.value.toUpperCase());
                      }}
                      />
                    </div>

                    <div className="col">
                      <label>Email</label>
                      <input type="email" class="form-control" required
                      placeholder="user@example.com"
                      value={email}
                      onChange={(e) =>{
                        setEmail(e.target.value.toLowerCase());
                      }}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col">
                        <label>Gender</label>
                        <select class="form-control" required value={gender} onChange={(e) => setGender(e.target.value)}>
                            <option value="">--</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>

                    <div className="col">
                        <label>Date of Birth</label>
                        <input type="date" class="form-control" required value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)}/>
                    </div>

                    <div className="col-lg">
                        <label>Phone</label>
                        <input type="tel" class="form-control" placeholder="Eg. 0200000000" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col">
                        <label>Educational Level</label>
                        <select class="form-control" required value={educationalLevel} onChange={(e) => setEducationalLevel(e.target.value)}>
                            {educationalLevels.map(level => (
                                <option key={level} value={level}>{level.charAt(0).toUpperCase() + level.slice(1)}</option>
                            ))}
                        </select>
                    </div>

                    <div className="col-lg">
                      <label>Occupation</label>
                      <input type="text" class="form-control" value={occupation} onChange={(e) => setOccupation(e.target.value)}/>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg">
                      <label>Residential Address</label>
                      <input type="text" class="form-control" required placeholder="House No., Street, City" value={residentialAddress} onChange={(e) => setResidentialAddress(e.target.value)}/>
                    </div>
                    
                    <div className="col">
                    <label>Baptism status</label>
                    <select class="form-control" required value={baptismStatus} onChange={(e) => setBaptismStatus(e.target.value)}>
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
                  <div className="d-flex gap-3 flex-wrap">
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
                        <label className="btn btn-outline-dark" htmlFor={`btn-check-outlined-${index + 1}`}>
                          {department}
                        </label>
                      </div>
                    ))}
                  </div>

                </div>

                

              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="submit" class="btn btn-primary">Add Member</button>
              </div>
            </div>
          </div>
        </div>
      </form>
     );
}
 
export default AddMemberModal;