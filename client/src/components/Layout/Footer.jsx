import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="footer">
            <h4 className="text-center" style={{ marginBottom: "2rem" }}>
                {" "}
                &copy; Shop -{" "}
                <span style={{ fontSize: "1rem" }}>Created By</span>
                <a
                    style={{
                        fontSize: "1rem",
                        color: "cyan",
                    }}
                    href="https://ramprakash-portfolio.vercel.app/"
                    target="_blank"
                >
                    @Ram
                </a>
            </h4>
            <p className="text-center">
                <Link to={"/about"}>About</Link>
                <Link to={"/contact"}>Contact</Link>
                <Link to={"/policy"}>Privacy Policy</Link>
            </p>
        </div>
    );
};

export default Footer;
