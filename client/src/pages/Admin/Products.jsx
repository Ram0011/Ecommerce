import axios from "axios";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Products = () => {
    const [products, setProducts] = useState([]);

    // get all products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(
                `${
                    import.meta.env.VITE_REACT_APP_API
                }/api/v1/product/get-product`
            );
            setProducts(data.products);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };
    // console.log(products);

    // lifecycle method
    useEffect(() => {
        getAllProducts();
    }, []);

    return (
        <Layout title="Shop - Products">
            <div className="row mt-3 p-3 container-fluid">
                <div className=" col-sm-12 col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-sm-12 col-md-9" style={{ paddingRight: 0 }}>
                    <div
                        className="d-flex flex-wrap"
                        style={{ justifyContent: "space-evenly" }}
                    >
                        <h2 className="text-center">All Products List</h2>
                        <div
                            className="d-flex flex-wrap"
                            style={{ justifyContent: "space-evenly" }}
                        >
                            {products?.map((p) => (
                                <Link
                                    to={`/dashboard/admin/product/${p.slug}`}
                                    className="product-link responsive-element"
                                    key={p._id}
                                >
                                    <div
                                        className="card m-2"
                                        // style={{ width: "20rem" }}
                                    >
                                        <img
                                            src={`${
                                                import.meta.env
                                                    .VITE_REACT_APP_API
                                            }/api/v1/product/product-photo/${
                                                p._id
                                            }`}
                                            style={{
                                                height: "15rem",
                                                objectFit: "contain",
                                                objectPosition: "center",
                                                width: "100%",
                                                overflow: "hidden",
                                                display: "block",
                                            }}
                                            className="card-img-top"
                                            alt={p.name}
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title truncate-two-lines">
                                                {p.name}
                                            </h5>
                                            <p className="card-text truncate-three-lines">
                                                {p.description}
                                            </p>
                                            <h6>
                                                {" "}
                                                {p.price.toLocaleString(
                                                    "en-IN",
                                                    {
                                                        style: "currency",
                                                        currency: "INR",
                                                    }
                                                )}
                                            </h6>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Products;
