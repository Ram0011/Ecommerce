/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const CategoryProduct = () => {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const params = useParams();
    const navigate = useNavigate();

    const getProductByCategory = async () => {
        try {
            const { data } = await axios.get(
                `${
                    import.meta.env.VITE_REACT_APP_API
                }/api/v1/product/product-category/${params.slug}`
            );
            setProducts(data.products);
            setCategory(data.category);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (params.slug) {
            getProductByCategory();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.slug]);

    return (
        <Layout title="Shop - Category">
            <div className="container mt-3 mb-5">
                <h2 className="text-center">{category.name}</h2>
                <h4 className="text-center" style={{ fontWeight: "lighter" }}>
                    {products?.length} results found
                </h4>
                <div className="row">
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
                                    onClick={() =>
                                        navigate(`/product/${p.slug}`)
                                    }
                                    style={{ cursor: "pointer" }}
                                >
                                    <h5 className="card-title truncate-two-lines">
                                        {p.name}
                                    </h5>
                                    <p className="card-text truncate-three-lines">
                                        {p.description}
                                    </p>
                                    <h6>₹ {p.price}</h6>
                                    {/* <button
                                        className="btn btn-secondary ms-1"
                                       
                                    >
                                        More Details
                                    </button> */}
                                    <button className="btn btn-success mt-1">
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

export default CategoryProduct;
