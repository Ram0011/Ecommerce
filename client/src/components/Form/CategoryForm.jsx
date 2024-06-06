/* eslint-disable react/prop-types */
const CategoryForm = ({ value, handleSubmit, setValue }) => {
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input
                        type="text"
                        style={{ width: "90%" }}
                        className="form-control"
                        placeholder="Enter New  Category"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </>
    );
};

export default CategoryForm;
