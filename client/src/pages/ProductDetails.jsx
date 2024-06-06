import axios from "axios";
import Layout from "../components/Layout/Layout";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const ProductDetails = () => {
    const params = useParams();
    const [product, setProduct] = useState(null);
    const [cart, setCart] = useCart();

    //initial details
    useEffect(() => {
        if (params?.slug) getProduct();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params?.slug]);

    //get product
    const getProduct = async () => {
        try {
            const { data } = await axios.get(
                `${
                    import.meta.env.VITE_REACT_APP_API
                }/api/v1/product/get-product/${params.slug}`
            );
            setProduct(data?.product);
            console.log(data?.product); // Update this to log data.product instead of product
        } catch (error) {
            console.log(error);
        }
    };

    if (!product) {
        return (
            <Layout>
                <h2 className="text-center mt-4" style={{ fontWeight: "bold" }}>
                    Loading...
                </h2>
            </Layout>
        );
    }

    return (
        <Layout
            title={`Shop - ${product.name}`}
            style={{ marginBottom: "50px" }}
        >
            <h2 className="text-center mt-4" style={{ fontWeight: "bold" }}>
                Product Details
            </h2>
            <div className="row container-fluid ">
                <div className="col-md-5">
                    <img
                        src={`${
                            import.meta.env.VITE_REACT_APP_API
                        }/api/v1/product/product-photo/${product._id}`}
                        style={{
                            objectFit: "contain",
                            objectPosition: "center",
                            width: "100%",
                            height: "80%",
                            borderRadius: "10px",
                            overflow: "hidden",
                            display: "block",
                        }}
                        className="card-img-top"
                        alt={product.name}
                    />
                </div>
                <div className="col-md-7">
                    <h3
                        style={{ fontWeight: "initial", fontFamily: "cursive" }}
                    >
                        About Product
                    </h3>
                    <h5>{product.name}</h5>
                    <h6 style={{ fontWeight: "bold", fontStyle: "italic" }}>
                        {product.category.name}
                    </h6>
                    <p className="text-muted mt-5 mb-5">
                        {product.description}
                    </p>
                    <p style={{ fontWeight: "bold", fontFamily: "serif" }}>
                        ₹ {product.price}
                    </p>
                    <button
                        className="btn btn-success mt-1 mb-5"
                        onClick={() => {
                            setCart([...cart, product]);
                            localStorage.setItem(
                                "cart",
                                JSON.stringify([...cart, product])
                            );
                            toast.success("Item added to cart!");
                        }}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </Layout>
    );
};

export default ProductDetails;
