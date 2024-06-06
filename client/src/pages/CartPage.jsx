/* eslint-disable no-unused-vars */
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Cart = () => {
    const [auth, setAuth] = useAuth();
    const { user } = auth;
    const [cart, setCart] = useCart();
    const navigate = useNavigate();

    //total price
    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map((item) => {
                total = total + item.price;
            });
            return total.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
            });
        } catch (error) {
            console.log(error);
        }
    };
    // console.log(cart);

    //delete item
    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex((item) => item._id === pid);
            myCart.splice(index, 1);
            setCart(myCart);
            localStorage.setItem("cart", JSON.stringify(myCart));
        } catch (error) {
            console.log(error);
        }
    };

    //handle payment
    const handlePayment = async () => {
        try {
            const { data } = await axios.post(
                `${import.meta.env.VITE_REACT_APP_API}/api/v1/product/payment`,
                { cart }
            );
            // console.log(data);
            if (data.success) {
                // console.log("order placed");
                alert("Your order has been placed");
                toast.success("Your order has been placed!");
                setCart([]);
                localStorage.setItem("cart", JSON.stringify([]));
                navigate("/dashboard/user/orders");
            } else {
                console.log("Error in placing order", data.error);
                toast.error(data.error);
            }
            // console.log(data);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h2 className="text-center bg-light p-2">
                            {`${auth?.token && auth?.user.name} Cart`}
                        </h2>
                        <h4 className="text-center">
                            {cart?.length > 0
                                ? `You have ${cart.length} items in cart`
                                : "Your cart is empty."}
                            <br />
                            {!auth?.token && "Please login to Checkout"}
                        </h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-9">
                        <h5>Items</h5>
                        <div className="row">
                            {cart?.map((p, index) => (
                                <div
                                    className="row mb-2 p-3 card flex-row"
                                    key={index}
                                >
                                    <div className="col-md-4">
                                        <img
                                            src={`${
                                                import.meta.env
                                                    .VITE_REACT_APP_API
                                            }/api/v1/product/product-photo/${
                                                p._id
                                            }`}
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
                                    </div>

                                    <div className="col-md-8">
                                        <h5>{p.name.substring(0, 100)}</h5>
                                        <p>{p.description.substring(0, 130)}</p>
                                        <h5 className="font-bold">
                                            {p.price.toLocaleString("en-IN", {
                                                style: "currency",
                                                currency: "INR",
                                            })}
                                        </h5>
                                        <button
                                            className="btn btn-danger mt-4"
                                            onClick={() => {
                                                removeCartItem(p._id);
                                            }}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-md-3 text-center">
                        <h5>Cart Summary</h5>
                        <p>Total | Checkout | Payment</p>
                        <hr />
                        <h6>Total: {totalPrice()}</h6>
                        {user?.address ? (
                            <>
                                <div className="mb-3">
                                    <h5>Current Address: </h5>
                                    <h6>{user?.address}</h6>
                                    <button
                                        className="btn btn-outline-warning mt-2"
                                        onClick={() =>
                                            navigate("/dashboard/user/profile")
                                        }
                                    >
                                        Update Address
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="mb-3 mt-2">
                                {auth?.token ? (
                                    <button
                                        className="btn btn-outline-warning"
                                        onClick={() =>
                                            navigate("/dashboard/user/profile")
                                        }
                                    >
                                        Update Address
                                    </button>
                                ) : (
                                    <button
                                        className="btn btn-warning"
                                        onClick={() =>
                                            navigate("/login", {
                                                state: "/cart",
                                            })
                                        }
                                    >
                                        Login to Checkout
                                    </button>
                                )}
                            </div>
                        )}
                        <div className="mb-3 mt-2">
                            {auth?.token && cart?.length > 0 && (
                                <button
                                    className="btn btn-primary"
                                    onClick={handlePayment}
                                >
                                    Proceed to Payment
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Cart;
