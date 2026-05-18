import {toggleDrawer} from '../util/methods';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const NavBar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    return (
        <>
            <nav className="navbar">
                <span title="Show Drawer" className="material-symbols-outlined sidebar_toggle"
                onClick={toggleDrawer}>menu</span>
                <span className='fw-semibold'>{user?.email || 'User'}</span>

                {/* Profile Dropdown */}
                <div style={{marginLeft: "auto"}} className="dropdown">
                    <div className='d-flex align-items-center dropdown-toggle' role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="/images/user.png" alt="profile" />
                    </div>
                    <ul className="dropdown-menu dropdown-menu-end">
                        <li><div className="dropdown-item d-flex align-items-center gap-2">
                            <span className="material-symbols-outlined">
                                person
                            </span>
                            My Profile
                        </div></li>
                        <li><div className="dropdown-item d-flex align-items-center gap-2">
                            <span className="material-symbols-outlined">
                                settings
                            </span>
                            Settings
                        </div></li>
                        <li data-bs-toggle="modal" data-bs-target="#exampleModal"
                            
                        ><div className="dropdown-item d-flex align-items-center gap-2">
                            <span className="material-symbols-outlined">
                                logout
                            </span>
                            Logout
                        </div></li>
                    </ul>
                </div>
            
                
                
            </nav>

         {/* Logout Modal */}
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Confirm Logout</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        Are you sure you want to logout?
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button"
                        onClick={() => logout()} 
                        data-bs-dismiss="modal"
                        className="btn btn-danger">Logout</button>
                    </div>
                    </div>
                </div>
            </div>
        </>
        
     );
}
 
export default NavBar;