import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

// eslint-disable-next-line react/prop-types
const Spinner = ({ path = "login" }) => {
    const [count, setCount] = useState(3);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currentCount) => --currentCount);
        }, 1000);
        // redirect once count is equal to 0
        count === 0 && navigate(`/${path}`, { state: location.pathname });
        // cleanup
        return () => clearInterval(interval);
    }, [count, navigate, location, path]);

    return (
        <>
            <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "100vh" }}
            >
                <h1 className="text-center">redirecting to you in {count} </h1>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </>
    );
};

export default Spinner;
