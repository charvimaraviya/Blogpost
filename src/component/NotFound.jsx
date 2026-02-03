import Navbar from "./Navbar";
import Lottie from 'react-lottie-player';
import lottieJson from "../assets/images/Data-no-found.json";


export default function NotFound() {
    return(
        <>
            <Navbar />
            <div style={{ textAlign: "center", padding: "40px" }}>
                <h1>404 - page Not Found</h1>
                <center>
                <Lottie
                    loop
                    animationData={lottieJson}
                    play
                    style={{ 
                        width: 300, 
                        height: 300,
                    }}
                />
                </center>
            </div>
        </>
    )
}