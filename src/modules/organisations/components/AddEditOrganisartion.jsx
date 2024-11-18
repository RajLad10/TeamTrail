import { useFormik } from "formik";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import CustomModal from "../../../components/common/CustomModal";
import { addOrganisation } from "../../../store/organisationSlice";

const AddOrganisation = ({
    isOpen,
    heading,
    primaryButtonText,
    secondaryButtonText,
    setIsOpen
}) => {
    const dispatch = useDispatch();
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const handleSubmit = (values) => {
        console.log("ADD ORG", values);
        dispatch(addOrganisation({
            name: values?.name,
            logo: values?.logo,
            address: values?.address,
            phone: values?.phone,
            website: values?.website,
            admin_first_name: values?.admin_first_name,
            admin_last_name: values?.admin_last_name,
            admin_email: values?.admin_email
        }));
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            logo: '',
            address: '',
            phone: '',
            website: '',
            admin_first_name: '',
            admin_last_name: '',
            admin_email: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().trim().required("Organisation name is required"),
            logo: Yup.string().trim(),
            address: Yup.string().trim().required("Organisation address is required"),
            phone: Yup.string().trim()
                .matches(phoneRegExp, 'Phone number is not valid')
                .required("Phone number is required"),
            website: Yup.string().trim().required("Organisation website is required"),
            admin_first_name: Yup.string().trim().required("Organisation admin first name is required"),
            admin_last_name: Yup.string().trim().required("Organisation admin last name is required"),
            admin_email: Yup.string().trim().required("Organisation admin email is required"),
        }),
        onSubmit: handleSubmit
    });

    const handleEditOrganizations = () => {
        setIsOpen(true);
    }

    const handleAddOrganisation = (values) => {
        console.log("ADD", values);
    }

    return (
        <Fragment>
            <CustomModal
                isOpen={isOpen}
                heading={heading}
                primaryButtonText={primaryButtonText}
                secondaryButtonText={secondaryButtonText}
            >
                <div>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Organisation Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name" value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.name && formik.errors.name ? (
                                <div className="text-danger">{formik.errors.name}</div>
                            ) : null}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="logo" className="form-label">Organisation Logo</label>
                            <input
                                type="file"
                                className="form-control"
                                id="logo"
                                value={formik.values.logo}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">Organisation Address</label>
                            <input
                                type="text"
                                className="form-control"
                                id="address"
                                value={formik.values.address}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.address && formik.errors.address ? (
                                <div className="text-danger">{formik.errors.address}</div>
                            ) : null}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">Organisation Phone</label>
                            <input
                                type="text"
                                className="form-control"
                                id="phone"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.phone && formik.errors.phone ? (
                                <div className="text-danger">{formik.errors.phone}</div>
                            ) : null}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="website" className="form-label">Organisation Website</label>
                            <input
                                type="url"
                                className="form-control"
                                id="website"
                                value={formik.values.website}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.website && formik.errors.website ? (
                                <div className="text-danger">{formik.errors.website}</div>
                            ) : null}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="admin_first_name" className="form-label">Organisation Admin First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="admin_first_name"
                                value={formik.values.admin_first_name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.admin_first_name && formik.errors.admin_first_name ? (
                                <div className="text-danger">{formik.errors.admin_first_name}</div>
                            ) : null}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="admin_last_name" className="form-label">Organisation Admin Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="admin_last_name"
                                value={formik.values.admin_last_name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.admin_last_name && formik.errors.admin_last_name ? (
                                <div className="text-danger">{formik.errors.admin_last_name}</div>
                            ) : null}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="admin_email" className="form-label">Organisation Admin Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="admin_email"
                                value={formik.values.admin_email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.admin_email && formik.errors.admin_email ? (
                                <div className="text-danger">{formik.errors.admin_email}</div>
                            ) : null}
                        </div>
                        <button
                            className="btn btn-primary"
                            onClick={handleAddOrganisation}
                        >
                            {primaryButtonText || "Submit"}
                        </button>
                        <button
                            className="btn btn-secondary"
                            onClick={() => setIsOpen(false)}
                        >
                            {secondaryButtonText || "Cancel"}
                        </button>
                    </form>
                </div>
            </CustomModal>
        </Fragment>
    );
};

export default AddOrganisation;