import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/search";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";

const Search = () => {
    // eslint-disable-next-line no-unused-vars
    const [values, setValues] = useSearch();
    const [cart, setCart] = useCart();
    const navigate = useNavigate();

    return (
        <Layout title="Shop - Search results">
            <div className="conainer-fluid mt-4">
                <div className="text-center">
                    <h2>Search Results</h2>
                    <h6>
                        {values?.results.length < 1
                            ? "No products found"
                            : `Found ${values?.results.length}`}
                    </h6>
                    <div
                        className="d-flex flex-wrap mt-4"
                        style={{
                            justifyContent: "space-around",
                            alignContent: "center",
                        }}
                    >
                        {values?.results.map((p) => (
                            <div
                                className="card m-2 responsive-element card-hover-shadow"
                                key={p._id}
                                style={{ cursor: "pointer" }}
                            >
                                <img
                                    src={`${
                                        import.meta.env.VITE_REACT_APP_API
                                    }/api/v1/product/product-photo/${p._id}`}
                                    className="card-img-top"
                                    style={{
                                        height: "15rem",
                                        objectFit: "contain",
                                        objectPosition: "center",
                                        width: "100%",
                                        overflow: "hidden",
                                    }}
                                    alt={p.name}
                                    onClick={() =>
                                        navigate(`/product/${p.slug}`)
                                    }
                                />
                                <div className="card-body">
                                    <h5
                                        className="card-title truncate-two-lines"
                                        onClick={() =>
                                            navigate(`/product/${p.slug}`)
                                        }
                                    >
                                        {p.name}
                                    </h5>
                                    <p
                                        className="card-text truncate-three-lines"
                                        onClick={() =>
                                            navigate(`/product/${p.slug}`)
                                        }
                                    >
                                        {p.description}
                                    </p>
                                    <h6
                                        onClick={() =>
                                            navigate(`/product/${p.slug}`)
                                        }
                                    >
                                        {p.price.toLocaleString("en-IN", {
                                            style: "currency",
                                            currency: "INR",
                                        })}
                                    </h6>
                                    {/* <button
                                        className="btn btn-secondary ms-1"
                                        // style={{ backgroundColor: "#847184" }}
                                    >
                                        More Details
                                    </button> */}
                                    <button
                                        className="btn btn-success ms-1"
                                        onClick={() => {
                                            setCart([...cart, p]);
                                            localStorage.setItem(
                                                "cart",
                                                JSON.stringify([...cart, p])
                                            );
                                            toast.success(
                                                "Item added to cart!"
                                            );
                                        }}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Search;
