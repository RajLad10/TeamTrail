import { Fragment } from "react"
import ProfileCard from "../components/ProfileCard";
import ProfileTabs from "../components/ProfileTabs";

const Profile = () => {
    return (
        <Fragment>
            <div className="container-fluid m-0 profile-wrapper text-capitalize">
                <div className="">
                    <div className="row me-0">
                        <ProfileCard /> 
                    </div>
                    <ProfileTabs />
                </div>
            </div>
        </Fragment>
    )
}

export default Profile;