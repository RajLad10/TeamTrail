import { Fragment } from "react"
import logo from '../../../assets/images/profile-img.png';

const OrganisationCard = ({ data = {}, handleEdit, handleDeactivate }) => {
    return (
        <Fragment>
            <div key={data?.org_id} className="organisation-cards col-4">
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
                        onClick={() => handleDeactivate(data)}
                    >
                        <i className="fas fa-trash" ></i>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default OrganisationCard;