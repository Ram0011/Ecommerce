import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [auth] = useAuth();

    const getOrders = async () => {
        try {
            const { data } = await axios.get(
                `${import.meta.env.VITE_REACT_APP_API}/api/v1/auth/orders`
            );
            setOrders(data.order);
            console.log(data.order);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token]);

    return (
        <Layout title="Shop - Orders" description="User Orders">
            <div className="container-fluid p-3 mt-3">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        <h3 className="text-center mt-4">All Orders</h3>
                        {orders?.map((order, index) => (
                            <div
                                className="border shadow p-3 container-fluid"
                                style={{
                                    width: "100%",
                                    overflow: "scroll",
                                }}
                                key={index}
                            >
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Buyer</th>
                                            <th scope="col">Date</th>
                                            <th scope="col">Payment</th>
                                            <th scope="col">Quantity</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{order?.status}</td>
                                            <td>{order?.buyer?.name}</td>
                                            <td>
                                                {moment(
                                                    order?.createdAt
                                                ).fromNow()}
                                            </td>
                                            <td>{order?.payment}</td>
                                            <td>{order?.products?.length}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="container">
                                    {order?.products.map((p, index) => (
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
                                                        objectPosition:
                                                            "center",
                                                        width: "100%",
                                                        overflow: "hidden",
                                                    }}
                                                    alt={p.name}
                                                />
                                            </div>

                                            <div className="col-md-8">
                                                <h5>
                                                    {p.name.substring(0, 100)}
                                                </h5>
                                                <p>
                                                    {p.description.substring(
                                                        0,
                                                        130
                                                    )}
                                                </p>
                                                <h5 className="font-bold">
                                                    {p.price.toLocaleString(
                                                        "en-IN",
                                                        {
                                                            style: "currency",
                                                            currency: "INR",
                                                        }
                                                    )}
                                                </h5>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Orders;
