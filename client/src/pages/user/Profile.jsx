import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    // context
    const [auth, setAuth] = useAuth();
    const { user } = auth;
    // states
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const navigate = useNavigate();

    // get user data
    useEffect(() => {
        if (user) {
            const { name, email, phone, address } = user;
            setName(name);
            setEmail(email);
            setPhone(phone);
            setAddress(address);
        }
    }, [user]);

    // form handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(
                `${import.meta.env.VITE_REACT_APP_API}/api/v1/auth/profile`,
                { name, email, password, phone, address }
            );
            if (data?.error) {
                toast.error(data?.error);
            } else {
                setAuth({ ...auth, user: data?.updatedUser });
                let ls = localStorage.getItem("auth");
                ls = JSON.parse(ls);
                ls.user = data?.updatedUser;
                localStorage.setItem("auth", JSON.stringify(ls));
                toast.success("Profile updated successfully!");
                navigate("/profile");
            }
            // toast.success("Profile updated successfully!");
        } catch (error) {
            console.log(`Error in updating profile: ${error}`);
            toast.error("Something went wrong!");
        }
    };

    return (
        <Layout title="Shop - Profile" description="User Profile">
            <div className="container-fluid mt-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        <div className="register">
                            <h2>User Profile</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label
                                        htmlFor="inputName"
                                        className="form-label"
                                    >
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        className="form-control"
                                        id="inputName"
                                        placeholder="Enter your name"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="inputEmail"
                                        className="form-label"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        disabled
                                        className="form-control"
                                        id="inputEmail"
                                        placeholder="Enter your email"
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
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        className="form-control"
                                        id="inputPassword"
                                        placeholder="Enter your password"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="inputPhone"
                                        className="form-label"
                                    >
                                        Phone
                                    </label>
                                    <input
                                        type="text"
                                        value={phone}
                                        onChange={(e) =>
                                            setPhone(e.target.value)
                                        }
                                        className="form-control"
                                        id="inputPhone"
                                        placeholder="Enter your phone"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="inputAddress"
                                        className="form-label"
                                    >
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        value={address}
                                        onChange={(e) =>
                                            setAddress(e.target.value)
                                        }
                                        className="form-control"
                                        id="inputAddress"
                                        placeholder="Enter your address"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Update
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Profile;
