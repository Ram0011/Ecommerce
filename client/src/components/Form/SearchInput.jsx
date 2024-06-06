import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
    const [values, setValues] = useSearch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.get(
                `${import.meta.env.VITE_REACT_APP_API}/api/v1/product/search/${
                    values.keyword
                }`
            );
            setValues({ ...values, results: data });
            navigate(`/search`);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <form
                className="d-flex"
                role="search"
                onSubmit={handleSubmit}
                style={{
                    display: "flex",
                    width: "100%",
                    marginTop: "3px",
                    alignItems: "center",
                }}
            >
                <input
                    className="form-control me-2"
                    type="search"
                    style={{ width: "90%" }}
                    placeholder="Product Name"
                    aria-label="Search"
                    value={values.keyword}
                    onChange={(e) =>
                        setValues({ ...values, keyword: e.target.value })
                    }
                />
                <button
                    className="btn btn-outline-success"
                    type="submit"
                    style={{ marginRight: "1rem" }}
                >
                    Search
                </button>
            </form>
        </div>
    );
};

export default SearchInput;
