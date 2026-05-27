import Sidebar from "./components/sidebar";
import { Outlet } from "react-router-dom";
import NavBar from "./components/navbar";
import { toggleDrawer } from "./util/methods";


const App = () => {
    console.log(process.env.NODE_ENV);
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