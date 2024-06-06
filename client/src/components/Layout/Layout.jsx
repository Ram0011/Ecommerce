/* eslint-disable react/prop-types */
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";

// eslint-disable-next-line react/prop-types
const Layout = ({
    children,
    title = "Shop - Home",
    description = "Ecommerce Application",
}) => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{title}</title>
                <meta name="description" content={description} />
            </Helmet>
            <Header />
            <main style={{ minHeight: "85vh" }}>
                <Toaster />
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
