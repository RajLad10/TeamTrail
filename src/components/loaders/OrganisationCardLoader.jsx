import { Fragment } from "react"
import CardLoader from "../../assets/images/card-loader.svg";


const OrganisationCardLoader = () => {
    return (
        <Fragment>
            <div className="card-image organisation-cards col-4" id="card-loader">
                <div className="organisation-logo border-0">
                    <img src={CardLoader} alt="loader" />
                </div>
                <div className="company-details">
                    <div className="block3 pulsate"></div>
                </div>
                <div className="org-edit">
                    <div className="icon-square-container square pulsate" ></div>
                    <div className="icon-square-container square pulsate" ></div>
                </div>
            </div>
        </Fragment>
    )
}

export default OrganisationCardLoader;