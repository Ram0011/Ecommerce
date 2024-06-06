import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import SearchInput from "../components/Form/SearchInput";

const HomePage = () => {
    // eslint-disable-next-line no-unused-vars
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    //get total count
    const getTotal = async () => {
        try {
            const { data } = await axios.get(
                `${
                    import.meta.env.VITE_REACT_APP_API
                }/api/v1/product/product-count`
            );
            setTotal(data?.total);
            // console.log(total);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (page === 1) return;
        loadMore();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    const loadMore = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(
                `${
                    import.meta.env.VITE_REACT_APP_API
                }/api/v1/product/product-list/${page}`
            );
            setLoading(false);
            // eslint-disable-next-line no-unsafe-optional-chaining
            setProducts([...products, ...data?.products]);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    //get All Products
    const getAllProducts = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(
                `${
                    import.meta.env.VITE_REACT_APP_API
                }/api/v1/product/product-list/${page}`
            );
            setLoading(false);
            setProducts(data.products);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    //get all categories
    const getAllCategories = async () => {
        try {
            const { data } = await axios.get(
                `${
                    import.meta.env.VITE_REACT_APP_API
                }/api/v1/category/get-category`
            );
            if (data?.success) {
                setCategories(data.category);
            }
        } catch (error) {
            console.log(error);
            // toast.error("Something went wrong in getting categories!");
        }
    };

    //filter by category
    const handleFilter = (value, id) => {
        let all = [...checked];
        if (value) {
            all.push(id);
        } else {
            all = all.filter((c) => c !== id);
        }
        setChecked(all);
    };

    useEffect(() => {
        getAllCategories();
        getTotal();
    }, []);

    useEffect(() => {
        if (!checked.length || !radio.length) {
            getAllProducts();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checked.length, radio.length]);

    useEffect(() => {
        if (checked.length || radio.length) filterProduct();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checked, radio]);

    //get filtered products
    const filterProduct = async () => {
        try {
            const { data } = await axios.post(
                `${
                    import.meta.env.VITE_REACT_APP_API
                }/api/v1/product/product-filters`,
                { checked, radio }
            );
            setProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout
            title={"Shop - Home"}
            description={"Home - Shop"}
            style={{ minHeight: "85vh" }}
        >
            <div className="row  container-fluid" style={{ paddingRight: "0" }}>
                <div
                    className="col-md-3 pt-3"
                    style={{
                        backgroundColor: "#ECE9EC",
                        borderTopRightRadius: "1rem",
                        borderBottomRightRadius: "1rem",
                    }}
                >
                    {" "}
                    <div className="d-md-none mb-2">
                        <SearchInput />
                    </div>
                    {/* Small screens */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "1rem",
                            marginBottom: "1rem",
                            justifyContent: "left",
                        }}
                    >
                        <div className="d-flex-col d-md-none">
                            <button
                                type="button"
                                className="btn btn-info"
                                data-bs-toggle="modal"
                                data-bs-target="#categoryModal"
                                // style={{ padding: "0.5rem" }}
                            >
                                Category Filter
                            </button>
                            {/* Modal */}
                            <div
                                className="modal fade"
                                id="categoryModal"
                                tabIndex={-1}
                                aria-labelledby="categoryModalLabel"
                                aria-hidden="true"
                            >
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1
                                                className="modal-title fs-5"
                                                id="categoryModalLabel"
                                            >
                                                Filter by Category
                                            </h1>
                                            <button
                                                type="button"
                                                className="btn-close"
                                                data-bs-dismiss="modal"
                                                aria-label="Close"
                                            />
                                        </div>
                                        <div className="modal-body">
                                            <div className="d-flex flex-column">
                                                {categories?.map((c) => (
                                                    <Checkbox
                                                        key={c._id}
                                                        onChange={(e) => {
                                                            handleFilter(
                                                                e.target
                                                                    .checked,
                                                                c._id
                                                            );
                                                        }}
                                                        style={{
                                                            fontSize: "1rem",
                                                        }}
                                                    >
                                                        {c.name}
                                                    </Checkbox>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button
                                                type="button"
                                                className="btn btn-secondary"
                                                data-bs-dismiss="modal"
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=" d-md-none">
                            <button
                                type="button"
                                className="btn btn-info"
                                data-bs-toggle="modal"
                                data-bs-target="#priceModal"
                            >
                                Price Filter
                            </button>
                            {/* Modal */}
                            <div
                                className="modal fade"
                                id="priceModal"
                                tabIndex={-1}
                                aria-labelledby="priceModalLabel"
                                aria-hidden="true"
                            >
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1
                                                className="modal-title fs-5"
                                                id="priceModalLabel"
                                            >
                                                Filter by Price
                                            </h1>
                                            <button
                                                type="button"
                                                className="btn-close"
                                                data-bs-dismiss="modal"
                                                aria-label="Close"
                                            />
                                        </div>
                                        <div className="modal-body">
                                            <Radio.Group
                                                onChange={(e) =>
                                                    setRadio(e.target.value)
                                                }
                                            >
                                                {Prices?.map((p) => (
                                                    <div key={p._id}>
                                                        <Radio value={p.array}>
                                                            {p.name}
                                                        </Radio>
                                                    </div>
                                                ))}
                                            </Radio.Group>
                                        </div>
                                        <div className="modal-footer">
                                            <button
                                                type="button"
                                                className="btn btn-secondary"
                                                data-bs-dismiss="modal"
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Category Filter for large screens */}
                    <h5 className="d-none d-md-block">Filter by Category</h5>
                    <div className="d-none d-md-flex flex-column">
                        {categories?.map((c) => (
                            <Checkbox
                                key={c._id}
                                onChange={(e) => {
                                    handleFilter(e.target.checked, c._id);
                                }}
                                style={{ fontSize: "1.1rem" }}
                            >
                                {c.name}
                            </Checkbox>
                        ))}
                    </div>
                    {/* Price filter for large screens */}
                    <div className="d-none d-md-flex flex-column">
                        <h5 className="mt-3">Filter by Price</h5>
                        <div className="d-flex flex-column">
                            <Radio.Group
                                onChange={(e) => setRadio(e.target.value)}
                                style={{ fontSize: "1.2rem" }}
                            >
                                {Prices?.map((p) => (
                                    <div key={p._id}>
                                        <Radio value={p.array}>{p.name}</Radio>
                                    </div>
                                ))}
                            </Radio.Group>
                        </div>
                    </div>
                    <button
                        className="btn btn-warning mt-3 mb-2 d-sm-none d-md-block "
                        onClick={() => {
                            setChecked([]);
                            setRadio([]);
                            window.location.reload();
                        }}
                    >
                        Remove filters
                    </button>
                </div>
                <div className="col-md-9 pt-3">
                    <h2 className="text-center">All Products</h2>
                    <div
                        className="d-flex flex-wrap"
                        style={{
                            justifyContent: "space-around",
                            alignContent: "center",
                        }}
                    >
                        {products?.map((p) => (
                            <div
                                className="card m-2 responsive-element card-hover-shadow"
                                key={p._id}
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
                                />
                                <div
                                    className="card-body"
                                    style={{ cursor: "pointer" }}
                                >
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
                                        {" "}
                                        {p.price.toLocaleString("en-IN", {
                                            style: "currency",
                                            currency: "INR",
                                        })}
                                    </h6>
                                    <button
                                        className="btn btn-success mt-1"
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
                    <div className="m-2 p-3">
                        {products && products.length < total && (
                            <button
                                className="btn btn-warning"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setPage(page + 1);
                                }}
                            >
                                {loading ? "Loading..." : "Loadmore"}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default HomePage;
