import { useFormik } from "formik";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import CustomModal from "../../../components/common/CustomModal";
import { addEditOrganisation } from "../../../store/organisationSlice";

const AddEditOrganisation = ({
    isOpen,
    heading,
    primaryButtonText,
    secondaryButtonText,
    setIsOpen,
    setFormType,
    type,
    data,
    handleListOrganisations
}) => {
    const dispatch = useDispatch();
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const handleSubmit = (values) => {
        dispatch(addEditOrganisation({
            data: {
                org_id: type === 1 ? null : data?.org_id,
                name: values?.name,
                logo: values?.logo,
                address: values?.address,
                email: values?.email,
                phone: values?.phone,
                website: values?.website,
                admin: type === 1 ?
                    {
                        first_name: values?.first_name,
                        middle_name: values?.middle_name,
                        last_name: values?.last_name,
                        personal_email: values?.personal_email,
                        personal_phone: values?.personal_phone
                    }
                    : null
            },
            cb: handleListOrganisations
        }));

        handleModalClose();
        // handleListOrganisations();
    }

    // let validationShape = Yup.object({
    //     name: Yup.string().trim().required("Organisation name is required"),
    //     email: Yup.string()
    //         .trim()
    //         .email("Invalid email address format")
    //         .matches(
    //             /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    //             "Invalid email address format"
    //         )
    //         .required("Organisation Email is required"),
    //     logo: Yup.string().trim(),
    //     address: Yup.string().trim().required("Organisation address is required"),
    //     phone: Yup.string().trim()
    //         .matches(phoneRegExp, 'Phone number is not valid')
    //         .required("Phone number is required"),
    //     website: Yup.string().trim().required("Organisation website is required"),
    // });

    // if (type === 1) {
    //     validationShape.first_name = Yup.string().trim().required("Admin first name is required");
    //     validationShape.middle_name = Yup.string().trim().required("Admin middle name is required");
    //     validationShape.last_name = Yup.string().trim().required("Admin last name is required");
    //     validationShape.personal_email = Yup.string().trim().email("Invalid email address format")
    //         .matches(
    //             /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    //             "Invalid email address format"
    //         )
    //         .required("Admin Email is required");
    //     validationShape.personal_phone = Yup.string().trim()
    //         .matches(phoneRegExp, 'Phone number is not valid')
    //         .required("Admin phone number is required");
    // }

    const getValidationSchema = () => {
        const baseSchema = {
            name: Yup.string().trim().required("Organisation name is required"),
            email: Yup.string()
                .trim()
                .email("Invalid email address format")
                .matches(
                    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    "Invalid email address format"
                )
                .required("Organisation Email is required"),
            logo: Yup.string().trim(),
            address: Yup.string().trim().required("Organisation address is required"),
            phone: Yup.string()
                .trim()
                .matches(phoneRegExp, "Phone number is not valid")
                .required("Phone number is required"),
            website: Yup.string().trim().required("Organisation website is required"),
        };

        if (type === 1) {
            return Yup.object({
                ...baseSchema,
                first_name: Yup.string()
                    .trim()
                    .required("Admin first name is required"),
                middle_name: Yup.string()
                    .trim()
                    .required("Admin middle name is required"),
                last_name: Yup.string()
                    .trim()
                    .required("Admin last name is required"),
                personal_email: Yup.string()
                    .trim()
                    .email("Invalid email address format")
                    .matches(
                        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        "Invalid email address format"
                    )
                    .required("Admin Email is required"),
                personal_phone: Yup.string()
                    .trim()
                    .matches(phoneRegExp, "Phone number is not valid")
                    .required("Admin phone number is required"),
            });
        }

        return Yup.object(baseSchema);
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: type === 1 ? '' : data?.name,
            email: type === 1 ? '' : data?.email,
            logo: type === 1 ? '' : data?.logo,
            address: type === 1 ? '' : data?.address,
            phone: type === 1 ? '' : data?.phone,
            website: type === 1 ? '' : data?.website,
            first_name: type === 1 ? '' : null,
            middle_name: type === 1 ? '' : null,
            last_name: type === 1 ? '' : null,
            personal_email: type === 1 ? '' : null,
            personal_phone: type === 1 ? '' : null,
        },
        validationSchema: getValidationSchema(),

        // Yup.object({
        //     name: Yup.string().trim().required("Organisation name is required"),
        //     email: Yup.string()
        //         .trim()
        //         .email("Invalid email address format")
        //         .matches(
        //             /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        //             "Invalid email address format"
        //         )
        //         .required("Organisation Email is required"),
        //     logo: Yup.string().trim(),
        //     address: Yup.string().trim().required("Organisation address is required"),
        //     phone: Yup.string().trim()
        //         .matches(phoneRegExp, 'Phone number is not valid')
        //         .required("Phone number is required"),
        //     website: Yup.string().trim().required("Organisation website is required"),
        //     first_name: type === 1 ? Yup.string().trim().required("Admin first name is required") : Yup.string().trim(),
        //     middle_name: type === 1 ? Yup.string().trim().required("Admin middle name is required") : Yup.string().trim(),
        //     last_name: type === 1 ? Yup.string().trim().required("Admin last name is required") : Yup.string().trim(),
        //     personal_email: type === 1 ? Yup.string().trim().email("Invalid email address format")
        //         .matches(
        //             /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        //             "Invalid email address format"
        //         )
        //         .required("Admin Email is required")
        //         : Yup.string().trim(),
        //     personal_phone: type === 1 ? Yup.string().trim()
        //         .matches(phoneRegExp, 'Phone number is not valid')
        //         .required("Admin phone number is required") : Yup.string().trim(),
        // }),
        onSubmit: handleSubmit
    });

    console.log("Errors", formik.errors);


    const handleModalClose = () => {
        formik.resetForm();
        setFormType(0);
        setIsOpen(false);
    }

    return (
        <Fragment>
            <CustomModal
                isOpen={isOpen}
                heading={heading}
                primaryButtonText={primaryButtonText}
                secondaryButtonText={secondaryButtonText}
                parentClass="add-edit-organisation-modal"
            >
                <div>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="row">
                            <div className="mb-3 col-6">
                                <label htmlFor="name" className="form-label">Organisation Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.name && formik.errors.name ? (
                                    <div className="text-danger">{formik.errors.name}</div>
                                ) : null}
                            </div>
                            <div className="mb-3 col-6">
                                <label htmlFor="phone" className="form-label">Organisation Phone</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="phone"
                                    name="phone"
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.phone && formik.errors.phone ? (
                                    <div className="text-danger">{formik.errors.phone}</div>
                                ) : null}
                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-3 col-6">
                                <label htmlFor="logo" className="form-label">Organisation Logo</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="logo"
                                    name="logo"
                                    // value={formik.values.logo}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            <div className="mb-3 col-6">
                                <label htmlFor="website" className="form-label">Organisation Website</label>
                                <input
                                    type="url"
                                    className="form-control"
                                    id="website"
                                    name="website"
                                    value={formik.values.website}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.website && formik.errors.website ? (
                                    <div className="text-danger">{formik.errors.website}</div>
                                ) : null}
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Organisation Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div className="text-danger">{formik.errors.email}</div>
                            ) : null}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">Organisation Address</label>
                            <textarea
                                className="form-control"
                                id="address"
                                name="address"
                                value={formik.values.address}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.address && formik.errors.address ? (
                                <div className="text-danger">{formik.errors.address}</div>
                            ) : null}
                        </div>
                        {type === 1 ?
                            <>
                                <div className="row">
                                    <div className="mb-3 col-4">
                                        <label htmlFor="first_name" className="form-label">Admin First Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="first_name"
                                            name="first_name"
                                            value={formik.values.first_name}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.first_name && formik.errors.first_name ? (
                                            <div className="text-danger">{formik.errors.first_name}</div>
                                        ) : null}
                                    </div>
                                    <div className="mb-3 col-4">
                                        <label htmlFor="middle_name" className="form-label">Admin Middle Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="middle_name"
                                            name="middle_name"
                                            value={formik.values.middle_name}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.middle_name && formik.errors.middle_name ? (
                                            <div className="text-danger">{formik.errors.middle_name}</div>
                                        ) : null}
                                    </div>
                                    <div className="mb-3 col-4">
                                        <label htmlFor="last_name" className="form-label">Admin Last Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="last_name"
                                            name="last_name"
                                            value={formik.values.last_name}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.last_name && formik.errors.last_name ? (
                                            <div className="text-danger">{formik.errors.last_name}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="mb-3 col-6">
                                        <label htmlFor="admin_email" className="form-label">Admin Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="personal_email"
                                            name="personal_email"
                                            value={formik.values.personal_email}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.personal_email && formik.errors.personal_email ? (
                                            <div className="text-danger">{formik.errors.personal_email}</div>
                                        ) : null}
                                    </div>
                                    <div className="mb-3 col-6">
                                        <label htmlFor="personal_phone" className="form-label">Admin Phone Number</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="personal_phone"
                                            name="personal_phone"
                                            value={formik.values.personal_phone}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.personal_phone && formik.errors.personal_phone ? (
                                            <div className="text-danger">{formik.errors.personal_phone}</div>
                                        ) : null}
                                    </div>
                                </div>
                            </>
                            : null
                        }
                        <div className="form-buttons d-flex justify-content-end">
                            <button
                                type="submit"
                                className="btn btn-primary submit-btn"
                            >
                                {primaryButtonText || "Submit"}
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary cancel-btn ms-2"
                                onClick={handleModalClose}
                            >
                                {secondaryButtonText || "Cancel"}
                            </button>
                        </div>
                    </form>
                </div>
            </CustomModal>
        </Fragment>
    );
};

export default AddEditOrganisation;