import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { Badge } from "antd";
import { useCart } from "../../context/cart";

const Header = () => {
    const [auth, setAuth] = useAuth();
    const [cart] = useCart();
    const categories = useCategory();
    // console.log(categories);

    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: "",
        });

        localStorage.removeItem("auth");
        toast.success("Logout Successfully");
    };

    return (
        <div
            style={{
                position: "sticky",
                top: 0,
                zIndex: 1000,
                backgroundColor: "#fff", // Add your desired background color
                // Add padding as needed
                borderBottom: "1px solid #ccc", // Add border if needed
            }}
        >
            <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-fixed-top navbar-inverse">
                <div
                    className="container-fluid"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                    }}
                >
                    <div className="shop">
                        <Link
                            to={"/"}
                            onClick={() => {
                                window.scrollTo(0, 0);
                                window.reload();
                            }}
                            className="navbar-brand"
                            style={{
                                borderBottom: "none",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <svg
                                id="logo-70"
                                width="78"
                                height="30"
                                viewBox="0 0 78 30"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                style={{
                                    cursor: "pointer",
                                    paddingRight: "0.5rem",
                                }}
                            >
                                {" "}
                                <path
                                    d="M18.5147 0C15.4686 0 12.5473 1.21005 10.3934 3.36396L3.36396 10.3934C1.21005 12.5473 0 15.4686 0 18.5147C0 24.8579 5.14214 30 11.4853 30C14.5314 30 17.4527 28.7899 19.6066 26.636L24.4689 21.7737C24.469 21.7738 24.4689 21.7736 24.4689 21.7737L38.636 7.6066C39.6647 6.57791 41.0599 6 42.5147 6C44.9503 6 47.0152 7.58741 47.7311 9.78407L52.2022 5.31296C50.1625 2.11834 46.586 0 42.5147 0C39.4686 0 36.5473 1.21005 34.3934 3.36396L15.364 22.3934C14.3353 23.4221 12.9401 24 11.4853 24C8.45584 24 6 21.5442 6 18.5147C6 17.0599 6.57791 15.6647 7.6066 14.636L14.636 7.6066C15.6647 6.57791 17.0599 6 18.5147 6C20.9504 6 23.0152 7.58748 23.7311 9.78421L28.2023 5.31307C26.1626 2.1184 22.5861 0 18.5147 0Z"
                                    className="ccustom"
                                    fill="#394149"
                                ></path>{" "}
                                <path
                                    d="M39.364 22.3934C38.3353 23.4221 36.9401 24 35.4853 24C33.05 24 30.9853 22.413 30.2692 20.2167L25.7982 24.6877C27.838 27.8819 31.4143 30 35.4853 30C38.5314 30 41.4527 28.7899 43.6066 26.636L62.636 7.6066C63.6647 6.57791 65.0599 6 66.5147 6C69.5442 6 72 8.45584 72 11.4853C72 12.9401 71.4221 14.3353 70.3934 15.364L63.364 22.3934C62.3353 23.4221 60.9401 24 59.4853 24C57.0498 24 54.985 22.4127 54.269 20.2162L49.798 24.6873C51.8377 27.8818 55.4141 30 59.4853 30C62.5314 30 65.4527 28.7899 67.6066 26.636L74.636 19.6066C76.7899 17.4527 78 14.5314 78 11.4853C78 5.14214 72.8579 0 66.5147 0C63.4686 0 60.5473 1.21005 58.3934 3.36396L39.364 22.3934Z"
                                    className="ccustom"
                                    fill="#394149"
                                ></path>{" "}
                            </svg>
                            <span
                                style={{
                                    marginLeft: "3px",
                                    fontSize: "1.7rem",
                                }}
                            >
                                Shop
                            </span>
                        </Link>
                    </div>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarTogglerDemo02"
                        aria-controls="navbarTogglerDemo02"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarTogglerDemo02"
                    >
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <div className="search-input-container">
                                <SearchInput />
                            </div>
                            <li className="nav-item">
                                <Link
                                    to={"/"}
                                    className="nav-link active"
                                    aria-current="page"
                                >
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link
                                    className="nav-link dropdown-toggle"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Categories
                                </Link>
                                <ul className="dropdown-menu">
                                    {categories?.map((c) => (
                                        <li key={c._id}>
                                            <Link
                                                className="dropdown-item"
                                                to={`/category/${c.slug}`}
                                            >
                                                {c.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>

                            {!auth.user ? (
                                <>
                                    <li className="nav-item">
                                        <Link
                                            to={"/register"}
                                            className="nav-link"
                                        >
                                            Register
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link
                                            to={"/login"}
                                            className="nav-link"
                                        >
                                            Login
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item dropdown">
                                        <Link
                                            className="nav-link dropdown-toggle"
                                            href="#"
                                            role="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            {auth.user?.name}
                                        </Link>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <Link
                                                    to={`/dashboard/${
                                                        auth?.user.role === 1
                                                            ? "admin"
                                                            : "user"
                                                    }`}
                                                    className="dropdown-item"
                                                >
                                                    Dashboard
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link
                                                    onClick={handleLogout}
                                                    className="dropdown-item"
                                                    to="/"
                                                >
                                                    Logout
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>
                                </>
                            )}
                            <li className="nav-item mt-1">
                                <Badge count={cart?.length} showZero>
                                    <Link to={"/cart"} className="nav-link">
                                        Cart
                                    </Link>
                                </Badge>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;
