import { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const [auth, setAuth] = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_REACT_APP_API}/api/v1/auth/login`,
                { email, password }
            );
            if (res.data.success) {
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });
                localStorage.setItem("auth", JSON.stringify(res.data));
                toast.success(res.data.message);
                navigate(location.state || "/");
                return;
            } else {
                toast.error(res.data.message);
                return;
            }
        } catch (error) {
            console.log(`Error in register ${error}`);
            toast.error("Something went wrong!");
            return;
        }
    };

    return (
        <div>
            <Layout title={"Shop - Login"} description={"Register - Shop"}>
                <div className="register">
                    <h2>Login User</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="inputEmail" className="form-label">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-control"
                                id="inputEmail"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="inputPassword"
                                className="form-label"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control"
                                id="inputPassword"
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => navigate("/forgot-password")}
                            >
                                Forgot Password
                            </button>
                        </div>

                        <button type="submit" className="btn btn-primary">
                            Login
                        </button>
                    </form>
                </div>
            </Layout>
        </div>
    );
};

export default Login;
