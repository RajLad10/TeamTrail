import { Fragment, useState } from "react"
import ProfileCard from "../components/ProfileCard";
import { useSelector } from "react-redux";
import { profileTabs } from "../../../constant";

const Profile = () => {
    const { userDetails } = useSelector((state) => state.profile);
    console.log("userDetails", userDetails);
    const [activeTab, setActiveTab] = useState(1);
    return (
        <Fragment>
            <div className="container-fluid m-0 profile-wrapper text-capitalize">
                <div className="">
                    <div className="row">
                        <ProfileCard />


                        <div className="card mb-4 border-0 col-xl-9">
                            <div className="card-body fill-height">
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
                                        <div className="col-md-6" id="inputOrgName" >{"Differenz"}</div>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small custom-form-label" htmlFor="inputLocation">Location</label>
                                        <div className="col-md-6" id="inputLocation" >{userDetails?.work_location}</div>
                                    </div>
                                </div>
                                <div className="mb-3 gx-3 row">
                                    <div className="col-md-6">
                                        <label className="small custom-form-label" htmlFor="inputEmailAddress">Email address</label>
                                        <div className="col-md-6" id="inputEmailAddress">name@example.com</div>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small custom-form-label" htmlFor="inputPhone">Phone number</label>
                                        <div className="col-md-6" id="inputPhone">{userDetails?.personal_phone || "555-123-4567"}</div>
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="small custom-form-label" htmlFor="inputBirthday">Business Unit</label>
                                        <div className="col-md-6" id="inputBirthday" name="birthday" >{userDetails?.business_unit_name}</div>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small custom-form-label" htmlFor="inputBirthday">Department</label>
                                        <div className="col-md-6" id="inputBirthday" name="birthday" >{userDetails?.department_name}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="profile-tabs">
                        <nav className="nav nav-borders">
                            {profileTabs?.map((tab, i) => {
                                return (
                                    <div key={i} className={`nav-link ${activeTab === i && "active "}`} onClick={() => setActiveTab(i)}>{tab}</div>
                                )
                            })}
                        </nav>
                        <hr className="mt-0 mb-4" />

                        {/* <!-- Account details card--> */}
                        {activeTab === 0 &&
                        <div className="card mb-4">
                            <div className="card-header">Account Details</div>
                            <div className="card-body">
                                <form>
                                    {/* <!-- Form Group (username)--> */}
                                    <div className="mb-3">
                                        <label className="small mb-1" htmlFor="inputUsername">Username (how your name will appear to other users on the site)</label>
                                        <input className="" id="inputUsername" type="text" placeholder="Enter your username" value="username" />
                                    </div>
                                    {/* <!-- Form Row--> */}
                                    <div className="row gx-3 mb-3">
                                        {/* <!-- Form Group (first name)--> */}
                                        <div className="col-md-6">
                                            <label className="small mb-1" htmlFor="inputFirstName">First name</label>
                                            <input className="" id="inputFirstName" type="text" placeholder="Enter your first name" value="Valerie" />
                                        </div>
                                        {/* <!-- Form Group (last name)--> */}
                                        <div className="col-md-6">
                                            <label className="small mb-1" htmlFor="inputLastName">Last name</label>
                                            <input className="" id="inputLastName" type="text" placeholder="Enter your last name" value="Luna" />
                                        </div>
                                    </div>
                                    {/* <!-- Form Row        --> */}
                                    <div className="row gx-3 mb-3">
                                        {/* <!-- Form Group (organization name)--> */}
                                        <div className="col-md-6">
                                            <label className="small mb-1" htmlFor="inputOrgName">Organization name</label>
                                            <input className="" id="inputOrgName" type="text" placeholder="Enter your organization name" value="Start Bootstrap" />
                                        </div>
                                        {/* <!-- Form Group (location)--> */}
                                        <div className="col-md-6">
                                            <label className="small mb-1" htmlFor="inputLocation">Location</label>
                                            <input className="" id="inputLocation" type="text" placeholder="Enter your location" value="San Francisco, CA" />
                                        </div>
                                    </div>
                                    {/* <!-- Form Group (email address)--> */}
                                    <div className="mb-3">
                                        <label className="small mb-1" htmlFor="inputEmailAddress">Email address</label>
                                        <input className="" id="inputEmailAddress" type="email" placeholder="Enter your email address" value="name@example.com" />
                                    </div>
                                    {/* <!-- Form Row--> */}
                                    <div className="row gx-3 mb-3">
                                        {/* <!-- Form Group (phone number)--> */}
                                        <div className="col-md-6">
                                            <label className="small mb-1" htmlFor="inputPhone">Phone number</label>
                                            <input className="" id="inputPhone" type="tel" placeholder="Enter your phone number" value="555-123-4567" />
                                        </div>
                                        {/* <!-- Form Group (birthday)--> */}
                                        <div className="col-md-6">
                                            <label className="small mb-1" htmlFor="inputBirthday">Business Unit</label>
                                            <input className="" id="inputBirthday" type="text" name="birthday" placeholder="Enter your birthday" value="06/10/1988" />
                                        </div>
                                    </div>
                                    {/* <!-- Save changes button--> */}
                                    <button className="btn btn-primary" type="button">Save changes</button>
                                </form>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Profile;