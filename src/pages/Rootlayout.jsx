import { Outlet } from "react-router-dom";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import { useContext } from "react";
import ModeContext from "../context/ModeContext";

export default function RootLayout(){
    const ctx = useContext(ModeContext);
    return(
    <>
    <div className={`app-wrapper ${ctx.mode}`}>
        <Navbar />
  
        <main className="content">
            <Outlet />   {/* Home / New Post / Explore */}
        </main>

        <Footer />
    </div>
    </>
    );
}