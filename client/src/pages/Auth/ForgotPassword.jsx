import { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                `${
                    import.meta.env.VITE_REACT_APP_API
                }/api/v1/auth/forgot-password`,
                { email, answer, newPassword }
            );
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/login");
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
    console.log(import.meta.env.VITE_REACT_APP_API);

    return (
        <Layout title="Shop - Forgot Password" description="Forgot Password">
            <div className="register">
                <h2>Reset Password</h2>
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
                        <label htmlFor="inputAnswer" className="form-label">
                            Enter your School Name!
                        </label>
                        <input
                            type="text"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            className="form-control"
                            id="inputAnswer"
                            placeholder="Enter your answer"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="inputNewPassword"
                            className="form-label"
                        >
                            New Password
                        </label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="form-control"
                            id="inputNewPassword"
                            placeholder="Enter New password"
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Reset
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default ForgotPassword;
