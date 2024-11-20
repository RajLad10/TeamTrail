import { Fragment, useCallback, useEffect, useState } from "react";
import logo from '../../../assets/images/profile-img.png';
import { useDispatch, useSelector } from "react-redux";
import { deleteOrganisation, listOrganizations } from "../../../store/organisationSlice";
import AddEditOrganisation from "../components/AddEditOrganisartion";
// import CustomDropdown from "../../../components/common/CustomDropdown";

const Organisations = () => {
    const { org, loading } = useSelector(state => state.organisation);
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState();
    const [formType, setFormType] = useState();

    const dispatch = useDispatch();
    const handleListOrganisations = useCallback(() => {
        console.log("ListOrganisations CALLED");
        dispatch(listOrganizations({
            "page": 1,
            "limit": 10,
            "search": ""
        }));
    }, [dispatch]);

    useEffect(() => {
        handleListOrganisations();
    }, [dispatch, handleListOrganisations])

    const handleOpenAddModal = () => {
        setFormType(1);
        setIsOpen(true)
    }
    const handleOpenEditModal = (val) => {
        setFormData(val);
        setFormType(2);
        setIsOpen(true)
    }

    const handleDeleteOrganisation = (val) => {
        dispatch(deleteOrganisation({
            data: {
                is_deleted: 1,
                org_id: val.org_id
            },
            cb: handleListOrganisations
        }))
    }

    return (
        <Fragment>
            <div className="organisation-wrapper">
                <div className="organisation-header">
                    <h2>Organisations</h2>
                </div>
                <div className="d-flex justify-content-end mb-3">
                    <button
                        className="btn btn-primary border-none"
                        onClick={handleOpenAddModal}
                    >
                        Add Organisation
                    </button>
                </div>
                <div className="organisation-list row">
                    {!loading ?
                        org?.map((list) => {
                            return (
                                <div key={list?.org_id} className="organisation-cards col-4">
                                    <div className="organisation-logo">
                                        <img src={logo} alt="company-logo" />
                                    </div>
                                    <div className="company-details">
                                        <h6>{list?.name}</h6>
                                    </div>
                                    <div className="org-edit">
                                        <div
                                            className="icon-square-container edit-square"
                                            onClick={() => handleOpenEditModal(list)}
                                        >
                                            <i className="fas fa-edit" ></i>
                                        </div>
                                        <div
                                            className="icon-square-container delete-square"
                                            onClick={() => handleDeleteOrganisation(list)}
                                        >
                                            <i className="fas fa-trash" ></i>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        :
                        <div className="d-flex align-items-center justify-content-center">
                            Loading
                        </div>
                        // <div className="organisation-cards">
                        //             <span className="org-edit" /* onClick={() => handleOpenEditModal(list)} */>
                        //                 {/* <i className="fas fa-edit"></i> */}
                        //                 <CustomDropdown />
                        //                 </span>
                        //             <div className="organisation-logo">
                        //                 <img src={logo} alt="company-logo" />
                        //             </div>
                        //             <div className="company-details">
                        //                 <h6>COMPANY</h6>
                        //             </div>
                        //         </div>
                    }
                </div>
            </div>
            {formType === 1 &&
                <AddEditOrganisation
                    isOpen={isOpen}
                    heading={"Add Organisation"}
                    primaryButtonText={"Save"}
                    secondaryButtonText={"Cancel"}
                    setIsOpen={setIsOpen}
                    setFormType={setFormType}
                    type={1}
                />}
            {formType === 2 &&
                <AddEditOrganisation
                    isOpen={isOpen}
                    heading={"Edit Organisation"}
                    primaryButtonText={"Save"}
                    secondaryButtonText={"Cancel"}
                    setIsOpen={setIsOpen}
                    setFormType={setFormType}
                    type={2}
                    data={formData}
                    handleListOrganisations={handleListOrganisations}
                />}

        </Fragment>
    );
}

export default Organisations;