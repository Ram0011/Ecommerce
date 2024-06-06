import { useEffect, useState } from "react";
import { Modal } from "antd";
import { message, Popconfirm } from "antd";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";

const CreateCategory = () => {
    // eslint-disable-next-line no-unused-vars
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState("");
    const cancel = () => {
        message.error("Not deleted");
    };

    //create category form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                `${
                    import.meta.env.VITE_REACT_APP_API
                }/api/v1/category/create-category`,
                { name }
            );
            if (data?.success) {
                toast.success(`${data.category.name} is created!`);
                getAllCategories();
                setName("");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong!");
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
            toast.error("Something went wrong in getting categories!");
        }
    };

    //update category
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(
                `${
                    import.meta.env.VITE_REACT_APP_API
                }/api/v1/category/update-category/${selected._id}`,
                { name: updatedName }
            );
            if (data?.success) {
                toast.success(`${updatedName} is updated!`);
                setSelected(null);
                setUpdatedName("");
                setVisible(false);
                getAllCategories();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in updating category!");
        }
    };

    //delete category
    const handleDelete = async (pId) => {
        try {
            const { data } = await axios.delete(
                `${
                    import.meta.env.VITE_REACT_APP_API
                }/api/v1/category/delete-category/${pId}`
            );
            if (data?.success) {
                // console.log(data);
                toast.success(`Category is deleted!`);
                getAllCategories();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in updating category!");
        }
    };

    useEffect(() => {
        getAllCategories();
    }, []);

    return (
        <div>
            <Layout
                title="Shop - Create Category"
                description="Create Category"
            >
                <div className="container-fluid mt-3 pt-3">
                    <div className="row">
                        <div className="col-md-3">
                            <AdminMenu />
                        </div>
                        <div className="col-md-9">
                            <h2>Manage Category</h2>
                            <div className="p-3 w-75">
                                <CategoryForm
                                    style={{ width: "100%" }}
                                    value={name}
                                    setValue={setName}
                                    handleSubmit={handleSubmit}
                                />
                            </div>
                            <div>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Name</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categories?.map((c) => (
                                            <tr key={c._id}>
                                                <td>{c.name}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-primary ms-2"
                                                        onClick={() => {
                                                            setVisible(true);
                                                            setUpdatedName(
                                                                c.name
                                                            );
                                                            setSelected(c);
                                                        }}
                                                    >
                                                        Edit
                                                    </button>
                                                    <Popconfirm
                                                        title="Delete the task"
                                                        description="Are you sure to delete this task?"
                                                        onConfirm={() =>
                                                            handleDelete(c._id)
                                                        }
                                                        onCancel={cancel}
                                                        okText="Yes"
                                                        cancelText="No"
                                                    >
                                                        <button className="btn btn-danger ms-2">
                                                            Delete
                                                        </button>
                                                    </Popconfirm>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <Modal
                            onCancel={() => setVisible(false)}
                            footer={null}
                            open={visible}
                        >
                            <CategoryForm
                                value={updatedName}
                                setValue={setUpdatedName}
                                handleSubmit={handleUpdate}
                            />
                        </Modal>
                    </div>
                </div>
            </Layout>
        </div>
    );
};

export default CreateCategory;
