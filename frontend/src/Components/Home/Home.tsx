import "./Home.css";
import { Button } from "primereact/button";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../../Context/authContext/authContext";

export function Home(): JSX.Element {
    const userContext = useContext(authContext);
    const label = userContext?.user ? "play" : "play without login";
    return (
        <div className="mt-7 w-100 center p-2">
            <div className="w-100 border rounded notice center boxShadow">
                <div>
                    <h6 className="text-center font-bold">im very happy to see you</h6>
                </div>
                <div className="flex justify-content-evenly">
                    {!userContext?.user && <Link to={"/auth"} className="m-1 "><Button label="login"></Button></Link>}
                    <Link to={"/memoryGame"} className="m-1"><Button label={label}></Button></Link>
                </div>
            </div>
        </div>
    );
}
