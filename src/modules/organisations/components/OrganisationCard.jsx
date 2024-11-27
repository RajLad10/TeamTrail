import { Fragment, useState } from "react"
import logo from '../../../assets/images/profile-img.png';
import ConfirmationModal from "../../../components/common/ConfirmationModal";
import { Col } from "reactstrap";

const OrganisationCard = ({ data = {}, handleEdit, handleDeactivate }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleConfirmDeactivate = () => {
        setIsOpen(true);
    }
    return (
        <Fragment>
            <Col sm={6} md={6} lg={4} xl={4} xxl={3} key={data?.org_id} >
                <div className="organisation-cards">
                <div className="organisation-logo">
                    <img src={logo} alt="company-logo" />
                </div>
                <div className="company-details">
                    <h6>{data?.name}</h6>
                </div>
                <div className="org-edit">
                    <div
                        className="icon-square-container edit-square"
                        onClick={() => handleEdit(data)}
                    >
                        <i className="fas fa-edit" ></i>
                    </div>
                    <div
                        className="icon-square-container delete-square"
                        onClick={() => handleConfirmDeactivate(data)}
                    >
                        {/* <i className="fas fa-trash" ></i> */}
                        {/* <span className="mdi mdi-eye"></span> */}
                        <span className="mdi mdi-eye-off-outline"></span>
                    </div>
                </div>
                </div>
            </Col>
            <ConfirmationModal
                isOpen={isOpen}
                data={data}
                onSubmit={handleDeactivate}
                onCancel={() => setIsOpen(false)}
                title={data?.name}
                parentClass="organisation-delete-confirmation"
                primaryButtonText="Deactivate"
                secondaryButtonText="Cancel"
            />
        </Fragment>
    )
}

export default OrganisationCard;