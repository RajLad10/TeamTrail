import { Fragment } from "react"

const ProfileCard = () => {
    return (
        <Fragment>
            <div className="profile-picture col-xl-3">
                <div className="card mb-4 mb-xl-0 border-0" style={{ minHeight: "300px" }}>
                    {/* <div className="card-header">Profile Picture</div> */}
                    <div className="card-body text-center">
                        <img className="img-account-profile rounded-circle mb-2" src="http://bootdey.com/img/Content/avatar/avatar1.png" alt="" />
                        <p>
                            <span className="mdi mdi-pencil me-1"></span>
                            Edit Profile image
                        </p>
                        {/* <h3 className="">
                            Raj Lad
                        </h3>
                        <p>
                        <span className="mdi mdi-briefcase-variant me-1"></span>
                            Software Engineer
                        </p> */}
                        {/* <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
                        <button className="btn btn-primary" type="button">Upload new image</button> */}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default ProfileCard;