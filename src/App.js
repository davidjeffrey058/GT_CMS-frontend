import Sidebar from "./components/sidebar";
import { useNavigate, Outlet } from "react-router-dom";
import NavBar from "./components/navbar";
import { toggleDrawer } from "./util/methods";
import { useEffect } from "react";


const App = ({ user }) => {
    const navigate = useNavigate();

    // To login page if user is not logged in
    useEffect(() => {
         if(user === null){
            navigate('/login');
        }
    }, [user, navigate])

    return (
        <div>
            <div className="mobile_drawer">
                <Sidebar />
            </div>
            <div className="drw_bg" onClick={toggleDrawer}></div>

            <div className="app flex">
                <div className="dsk_sidebar">
                    <Sidebar />
                </div>
                <div className="flex_column main_content">
                    <NavBar />
                    <Outlet/>
                </div>
            </div>
        </div>
     );
}
 
export default App;