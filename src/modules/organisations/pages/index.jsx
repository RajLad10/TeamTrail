import { Fragment, useEffect, useState } from "react";
import logo from '../../../assets/images/profile-img.png';
import { useDispatch, useSelector } from "react-redux";
import { listOrganizations } from "../../../store/organisationSlice";
import AddOrganisation from "../components/AddEditOrganisartion";

const Organisations = () => {
    const { org, loading } = useSelector(state => state.organisation);
    const [isOpen, setIsOpen] = useState(false);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listOrganizations({
            "page": 1,
            "limit": 10,
            "search": ""
        }));
    }, [dispatch])

    

    return (
        <Fragment>
            <div className="organisation-wrapper">
                <div className="organisation-header">
                    <h2>Organisations</h2>
                </div>
                <div className="organisation-list">

                    {!loading ?
                        org?.map((list) => {
                            return (
                                <div key={list?.org_id} className="organisation-cards">
                                    <span className="org-edit" onClick={() => setIsOpen(true)}><i className="fas fa-edit"></i></span>
                                    <div className="organisation-logo">
                                        <img src={logo} alt="company-logo" />
                                    </div>
                                    <div className="company-details">
                                        <h6>{list?.name}</h6>
                                        <p>{list?.website}</p>
                                    </div>
                                </div>
                            )
                        })
                        : "Loading"}
                </div>
            </div>
            <AddOrganisation
                isOpen={isOpen}
                heading={"Add Organisation"}
                primaryButtonText={"Save"}
                secondaryButtonText={"Cancel"}
                setIsOpen={setIsOpen}
            />
        </Fragment>
    );
}

export default Organisations;