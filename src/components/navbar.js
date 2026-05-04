import {toggleDrawer} from '../util/methods';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return ( 
        <nav className="navbar">
            <span title="Show Drawer" className="material-symbols-outlined sidebar_toggle"
            onClick={toggleDrawer}>menu</span>
            <span className='fw-semibold'>Welcome, David</span>

            {/* Profile Dropdown */}
            <div style={{marginLeft: "auto"}} className="dropdown">
                 <div className='d-flex align-items-center dropdown-toggle' role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="" alt="profile" />
                </div>
                <ul class="dropdown-menu dropdown-menu-end">
                    <li><a class="dropdown-item d-flex align-items-center gap-2" href="#">
                        <span class="material-symbols-outlined">
                            person
                        </span>
                        My Profile
                    </a></li>
                    <li><a class="dropdown-item d-flex align-items-center gap-2" href="#">
                        <span class="material-symbols-outlined">
                            settings
                        </span>
                        Settings
                    </a></li>
                    <li><a class="dropdown-item d-flex align-items-center gap-2" href="#">
                        <span class="material-symbols-outlined">
                            logout
                        </span>
                        Logout
                    </a></li>
                    {/* <Link to="/login" className="dropdown-item d-flex align-items-center gap-2">
                        <span class="material-symbols-outlined">
                            logout
                        </span>
                        Logout
                    </Link> */}
                </ul>
            </div>
           
            
            {/* <button className="button danger">
                <span class="material-symbols-outlined">logout</span>
                <p>Logout</p>
            </button> */}
        </nav>
     );
}
 
export default NavBar;