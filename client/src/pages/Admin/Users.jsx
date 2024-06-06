import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";

const Users = () => {
    return (
        <Layout title="Shop - Users" description="Users">
            <div className="container-fluid mt-3 pt-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h2>All Users</h2>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Users;
