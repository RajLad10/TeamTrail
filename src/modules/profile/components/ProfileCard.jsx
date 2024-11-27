import { Fragment } from "react"
import { useSelector } from "react-redux";

const ProfileCard = () => {
    const { userDetails } = useSelector((state) => state.profile);
    console.log("userDetails",userDetails)
    return (
        <Fragment>
            <div className="profile-picture col-xl-3">
                <div className="card mb-4 mb-xl-0 border-0" style={{ height: "300px" }}>
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
            <div className="card mb-4 border-0 col-xl-9" style={{ height: "300px" }}>
                <div className="card-body">
                    <div className="mb-3">
                        <h3 className="mb-1">{userDetails?.first_name + " " + userDetails?.last_name}</h3>
                        <p>
                            <span className="mdi mdi-briefcase-variant me-1"></span>
                            {userDetails?.job_title_primary || "Software Engineer"}
                        </p>
                    </div>
                    <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                            <label className="small custom-form-label" htmlFor="inputOrgName">Organization name</label>
                            <div className="col-md-6 custom-form-value" id="inputOrgName" >{"Differenz"}</div>
                        </div>
                        <div className="col-md-6">
                            <label className="small custom-form-label" htmlFor="inputLocation">Location</label>
                            <div className="col-md-6 custom-form-value" id="inputLocation" >{userDetails?.work_location}</div>
                        </div>
                    </div>
                    <div className="mb-3 gx-3 row">
                        <div className="col-md-6">
                            <label className="small custom-form-label" htmlFor="inputEmailAddress">Email address</label>
                            <div className="col-md-6 custom-form-value" id="inputEmailAddress">name@example.com</div>
                        </div>
                        <div className="col-md-6">
                            <label className="small custom-form-label" htmlFor="inputPhone">Phone number</label>
                            <div className="col-md-6 custom-form-value" id="inputPhone">{userDetails?.personal_phone || "555-123-4567"}</div>
                        </div>
                    </div>
                    <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                            <label className="small custom-form-label" htmlFor="inputBirthday">Business Unit</label>
                            <div className="col-md-6 custom-form-value" id="inputBirthday" name="birthday" >{userDetails?.business_unit_name}</div>
                        </div>
                        <div className="col-md-6">
                            <label className="small custom-form-label" htmlFor="inputBirthday">Department</label>
                            <div className="col-md-6 custom-form-value" id="inputBirthday" name="birthday" >{userDetails?.department_name}</div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default ProfileCard;