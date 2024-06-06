import { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_REACT_APP_API}/api/v1/auth/register`,
                { name, email, password, phone, address, answer }
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
    // console.log(import.meta.env.VITE_REACT_APP_API);

    return (
        <Layout title={"Shop - Register"} description={"Register - Shop"}>
            <div className="register" style={{ marginTop: "80px" }}>
                <h2>Register User</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="inputName" className="form-label">
                            Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="form-control"
                            id="inputName"
                            placeholder="Enter your name"
                            required
                        />
                    </div>
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
                        <label htmlFor="inputPassword" className="form-label">
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
                        <label htmlFor="inputPhone" className="form-label">
                            Phone
                        </label>
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="form-control"
                            id="inputPhone"
                            placeholder="Enter your phone"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputAddress" className="form-label">
                            Address
                        </label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="form-control"
                            id="inputAddress"
                            placeholder="Enter your address"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputAnswer" className="form-label">
                            Forgot Password question!
                        </label>
                        <input
                            type="text"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            className="form-control"
                            id="inputAnswer"
                            placeholder="Your School Name"
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default Register;
