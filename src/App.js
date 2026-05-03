import Sidebar from "./components/sidebar";
import { Outlet } from "react-router-dom";
import NavBar from "./components/navbar";

const App = () => {
    return ( 
        <div>
            <div className="mobile_drawer">
                <Sidebar />
            </div>
            <div className="drw_bg"></div>

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