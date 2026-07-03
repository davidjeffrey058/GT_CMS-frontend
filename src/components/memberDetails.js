import useFetch from '../hooks/useFetch';
import { educationalLevels, maritalStatusOptions } from '../util/constants';
import ErrorComponent from './errorComponent';

const MemberDetails = ({memberId, resetSelectedMember}) => {
    console.log(memberId)
    
    const {
        result: memData, 
        error: memError, 
        isPending: memIsPending } = useFetch(`${process.env.REACT_APP_BACKEND_URL}/api/members/${memberId}`);

        // console.log(memData)

    return ( 
        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasRightLabel">Member Details</h5>
            <button type="button" className="btn-close" 
            data-bs-dismiss="offcanvas" aria-label="Close"
            onClick={() => resetSelectedMember()}
            ></button>
          </div>

          {memData && <div className="offcanvas-body gry">
            <img className='mb-3'
            style={{
                // backgroundColor: 'grey',
                width: '100px',
                display: 'block',
                // aspectRatio: '0.78',
                marginInline: 'auto'
            }}
             src={memData.photo || `/images/${(memData.gender === 'male')? 'man.png': 'woman.png'}`} 
             alt="profile"  onError={(e) => {
                          e.target.src = '/images/broken-image.png';
                        }}/>

            <div className="mb-3">
                <label>Full Name</label>
                <input type="text" className="form-control" required  
                placeholder="First Name, Middle Name, Surname"
                value={memData.first_name + ' ' + memData.last_name}
                readOnly
                />
            </div>

            <div className="mb-3">
                <label>Email</label>
                <input type="email" className="form-control" required
                value={memData.email}
                readOnly
                />
            </div>

            <div className="mb-3">
                <label>Gender</label>
                <select className="form-control" required value={memData.gender} readOnly>
                    <option value="">--</option>
                    <option value="male">MALE</option>
                    <option value="female">FEMALE</option>
                </select>
            </div>

             <div className="mb-3">
                <label>Date of Birth</label>
                <input type="date" className="form-control" required
                value={memData.dob.split("T")[0]}
                />
            </div>

             <div className="mb-3">
                <label>Phone Number</label>
                <input type="tel" className="form-control" required
                value={memData.phone}
                readOnly
                />
            </div>

            <div className="mb-3">
                <label>Educational Level</label>
                <select className="form-control" required value={memData.educational_level} readOnly>
                    {educationalLevels.map(level => (
                        <option key={level} value={level}>{level.toUpperCase()}</option>
                    ))}
                </select>
            </div>

             <div className="mb-3">
                <label>Occupation</label>
                <input type="text" className="form-control" 
                value={memData.occupation} readOnly/>
            </div>

             <div className="mb-3">
                <label>Residential Address</label>
                <input type="text" className="form-control" required placeholder="House No., Street, City"
                value={memData.address} readOnly />
            </div>

            <div className="mb-3">
                <label>Baptism status</label>
                <select className="form-control" required value={memData.baptism.status}>
                    <option value="none">Not Baptized</option>
                    <option value="water">Water Baptized</option>
                    <option value="holy_ghost">Holy Spirit Baptized</option>
                </select>
            </div>

             <div className="mb-3">
                <label>Date Baptized</label>
                <input type="date" className="form-control"
                value={memData.baptism.date ? memData.baptism.date.split("T")[0] : ''}
                disabled = {false}
                readOnly
                />
            </div>

            <label >Marital Status</label>
            <div className="d-flex gap-4">
            {maritalStatusOptions.map((option, index) => (
                <div key={index} className="form-check">
                <input className="form-check-input" name="radioDefault" 
                type="radio" id={`radioDefault${index}`}
                checked = {option === 'single'}
                value={option}
                />
                <label className="form-check-label text-capitalize"
                style={{fontWeight: 'normal'}} 
                htmlFor={`radioDefault${index}`}>{option}</label>
                </div>
            ))}
            </div>
            <div className='mt-3 d-flex justify-content-end gap-3'>
                <button className="btn btn-danger">Delete</button>
                <button disabled className="btn btn-primary disabled">Update</button>
            </div>
          </div>}

          { memIsPending &&
            <div className="d-flex justify-content-center align-items-center"
            style={{ height: "100vh" }}>
                <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
                </div>
            </div>
          }

          {memError && 
            <ErrorComponent errorMessage={memError} ContainerHeight='100vh'/>}
        </div>
     );
}
 
export default MemberDetails;