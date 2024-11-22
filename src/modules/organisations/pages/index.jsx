import { Fragment, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrganisation, listOrganizations } from "../../../store/organisationSlice";
import AddEditOrganisation from "../components/AddEditOrganisartion";
import OrganisationCardLoader from "../../../components/loaders/OrganisationCardLoader";
import OrganisationCard from "../components/OrganisationCard";
import Pagination from "../../../components/common/Pagination";
import { Row } from "reactstrap";

const Organisations = () => {
    const { org, loading } = useSelector(state => state.organisation);
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState();
    const [formType, setFormType] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalData, setTotalData] = useState();
    const PageSize = 6;

    const dispatch = useDispatch();
    const handleListOrganisations = useCallback(() => {
        dispatch(listOrganizations({
            data: {
                "page": currentPage,
                "limit": PageSize,
                "search": ""
            },
            cb: setTotalData
        }));
    }, [dispatch, currentPage]);

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

    const handleDeactivateOrganisation = (val) => {
        dispatch(deleteOrganisation({
            data: {
                is_deactive: 1,
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
                <div className="d-flex justify-content-end mb-3 add-organisation">
                    <button
                        className="btn btn-outline-dark font-weight-bold"
                        onClick={handleOpenAddModal}
                    >
                        Add Organisation
                    </button>
                </div>
                <Row className="organisation-list">
                    {org?.map((list) => {
                        return (
                            <>
                                {!loading ?
                                    <OrganisationCard
                                        data={list}
                                        handleEdit={handleOpenEditModal}
                                        handleDeactivate={handleDeactivateOrganisation}
                                    />
                                    :
                                    <OrganisationCardLoader />
                                }
                            </>
                        )
                    })}
                    {totalData &&
                        <Pagination
                            className="pagination-bar"
                            currentPage={currentPage}
                            totalCount={totalData}
                            pageSize={PageSize}
                            onPageChange={page => setCurrentPage(page)}
                        />}
                    {!org?.length && !loading &&
                        <div>No data available</div>
                    }
                </Row>
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