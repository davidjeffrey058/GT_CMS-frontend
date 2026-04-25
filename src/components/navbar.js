import {toggleDrawer} from '../util/methods';

const NavBar = () => {
    return ( 
        <nav className="navbar">
            <span title="Show Drawer" className="material-symbols-outlined sidebar_toggle"
            onClick={toggleDrawer}>menu</span>
            <span>Welcome, David</span>
            <img src="" alt="profile" />
            <button className="button danger">
                <span class="material-symbols-outlined">logout</span>
                <p>Logout</p>
            </button>
        </nav>
     );
}
 
export default NavBar;