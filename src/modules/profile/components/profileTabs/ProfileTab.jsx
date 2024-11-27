import { Fragment } from "react";
import { useSelector } from "react-redux";

const ProfileTab = () => {
    const { userDetails } = useSelector((state) => state.profile);
    return (
        <Fragment>
            <div className="card mb-4 border-0">
                <div className="card-header d-flex justify-content-between">
                    Primary Details
                    <div className="text-end">
                        <span className="mdi mdi-pencil me-1"></span>
                        Edit
                    </div>
                </div>
                <div className="card-body">
                    <div className="mb-3 gx-3 row">
                        <div className="col-md-6">
                            <label className="small custom-form-label" htmlFor="inputEmailAddress">First Name</label>
                            <div className="col-md-6 custom-form-value" id="inputEmailAddress">{userDetails?.first_name || "-"}</div>
                        </div>
                        <div className="col-md-6">
                            <label className="small custom-form-label" htmlFor="inputPhone">Middle Name</label>
                            <div className="col-md-6 custom-form-value" id="inputPhone">{userDetails?.middle_name || "-"}</div>
                        </div>
                    </div>
                    <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                            <label className="small custom-form-label" htmlFor="inputBirthday">Last Name</label>
                            <div className="col-md-6 custom-form-value" id="inputBirthday" name="birthday" >{userDetails?.last_name || "-"}</div>
                        </div>
                        <div className="col-md-6">
                            <label className="small custom-form-label" htmlFor="inputBirthday">Gender</label>
                            <div className="col-md-6 custom-form-value" id="inputBirthday" name="birthday" >{userDetails?.gender || "-"}</div>
                        </div>
                    </div>
                    <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                            <label className="small custom-form-label" htmlFor="inputBirthday">Date of birth</label>
                            <div className="col-md-6 custom-form-value" id="inputBirthday" name="birthday" >{userDetails?.date_of_birth || "-"}</div>
                        </div>
                        <div className="col-md-6">
                            <label className="small custom-form-label" htmlFor="inputBirthday">Marital status</label>
                            <div className="col-md-6 custom-form-value" id="inputBirthday" name="birthday" >{userDetails?.marital_status || "-"}</div>
                        </div>
                    </div>
                    <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                            <label className="small custom-form-label" htmlFor="inputBirthday">Blood Group</label>
                            <div className="col-md-6 custom-form-value" id="inputBirthday" name="birthday" >{userDetails?.blood_group || "-"}</div>
                        </div>
                        <div className="col-md-6">
                            <label className="small custom-form-label" htmlFor="inputBirthday">Physically Handicapped</label>
                            <div className="col-md-6 custom-form-value" id="inputBirthday" name="birthday" >{userDetails?.physically_handicapped || "-"}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card mb-4 border-0">
                <div className="card-header d-flex justify-content-between">
                    Contact Details
                    <div className="text-end">
                        <span className="mdi mdi-pencil me-1"></span>
                        Edit
                    </div>
                </div>
                <div className="card-body">
                    <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                            <label className="small custom-form-label" htmlFor="inputBirthday">Personal Email</label>
                            <div className="col-md-6 custom-form-value" id="inputBirthday" name="birthday" >{userDetails?.personal_email || "-"}</div>
                        </div>
                        <div className="col-md-6">
                            <label className="small custom-form-label" htmlFor="inputBirthday">Work Email</label>
                            <div className="col-md-6 custom-form-value" id="inputBirthday" name="birthday" >{userDetails?.work_email || "-"}</div>
                        </div>
                    </div>

                    <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                            <label className="small custom-form-label" htmlFor="inputBirthday">Mobile Number</label>
                            <div className="col-md-6 custom-form-value" id="inputBirthday" name="birthday" >{userDetails?.personal_phone || "-"}</div>
                        </div>
                        <div className="col-md-6">
                            <label className="small custom-form-label" htmlFor="inputBirthday">Work Number</label>
                            <div className="col-md-6 custom-form-value" id="inputBirthday" name="birthday" >{userDetails?.work_phone || "-"}</div>
                        </div>
                    </div>

                    <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                            <label className="small custom-form-label" htmlFor="inputBirthday">Residence Number</label>
                            <div className="col-md-6 custom-form-value" id="inputBirthday" name="birthday" >{userDetails?.residence_phone || "-"}</div>
                        </div>
                        <div className="col-md-6">
                            <label className="small custom-form-label" htmlFor="inputBirthday">Skype</label>
                            <div className="col-md-6 custom-form-value" id="inputBirthday" name="birthday" >{userDetails?.skype || "-"}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card mb-4 border-0">
                <div className="card-header d-flex justify-content-between">
                    Addresses
                    <div className="text-end">
                        <span className="mdi mdi-pencil me-1"></span>
                        Edit
                    </div>
                </div>
                <div className="card-body">
                    <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                            <label className="small custom-form-label" htmlFor="inputBirthday">Current Address</label>
                            <div className="col-md-6 custom-form-value" id="inputBirthday" name="birthday" >{userDetails?.current_address || "-"}</div>
                        </div>
                        <div className="col-md-6">
                            <label className="small custom-form-label" htmlFor="inputBirthday">Permanent Address</label>
                            <div className="col-md-6 custom-form-value" id="inputBirthday" name="birthday" >{userDetails?.permanent_address || "-"}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card mb-4 border-0">
                <div className="card-header d-flex justify-content-between">
                    Relations
                    <div className="text-end">
                        <span className="mdi mdi-pencil me-1"></span>
                        Edit
                    </div>
                </div>
                <div className="card-body">
                    <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                            <label className="small custom-form-label" htmlFor="inputBirthday">Father</label>
                            <div className="col-md-6 custom-form-value" id="inputBirthday" name="birthday" >{userDetails?.relations?.father_name || "-"}</div>
                            <div className="col-md-6 custom-form-value" id="inputBirthday" name="birthday" >{userDetails?.relations?.father_phone || "-"}</div>
                            <div className="col-md-6 custom-form-value" id="inputBirthday" name="birthday" >{userDetails?.relations?.father_profession || "-"}</div>
                            <div className="col-md-6 custom-form-value" id="inputBirthday" name="birthday" >{userDetails?.relations?.father_date_of_birth || "-"}</div>      
                        </div>
                        <div className="col-md-6">
                            <label className="small custom-form-label" htmlFor="inputBirthday">Mother</label>
                            <div className="col-md-6 custom-form-value" id="inputBirthday" name="birthday" >{userDetails?.relations?.mother_name || "-"}</div>
                            <div className="col-md-6 custom-form-value" id="inputBirthday" name="birthday" >{userDetails?.relations?.mother_phone || "-"}</div>
                            <div className="col-md-6 custom-form-value" id="inputBirthday" name="birthday" >{userDetails?.relations?.mother_profession || "-"}</div>
                            <div className="col-md-6 custom-form-value" id="inputBirthday" name="birthday" >{userDetails?.relations?.mother_date_of_birth || "-"}</div>  
                        </div>
                    </div>
                </div>
            </div>

            <div className="card mb-4 border-0">
                <div className="card-header d-flex justify-content-between">
                    Experience
                    <div className="text-end">
                        <span className="mdi mdi-pencil me-1"></span>
                        Edit
                    </div>
                </div>
                <div className="card-body">
                    <div className="border-bottom mb-2">
                        <div className="mb-3 gx-3 row">
                            <div className="col-md-6">
                                <label className="small custom-form-label" htmlFor="inputEmailAddress">Company</label>
                                <div className="col-md-6 custom-form-value" id="inputEmailAddress">{userDetails?.experience?.company || "-"}</div>
                            </div>
                            <div className="col-md-6">
                                <label className="small custom-form-label" htmlFor="inputPhone">Location</label>
                                <div className="col-md-6 custom-form-value" id="inputPhone">{userDetails?.experience?.location || "-"}</div>
                            </div>
                        </div>
                        <div className="row gx-3 mb-3">
                            <div className="col-md-6">
                                <label className="small custom-form-label" htmlFor="inputBirthday">Position</label>
                                <div className="col-md-6 custom-form-value" id="inputBirthday" name="birthday" >{userDetails?.experience?.position || "-"}</div>
                            </div>
                            <div className="col-md-6">
                                <label className="small custom-form-label" htmlFor="inputBirthday">Duration</label>
                                <div className="col-md-6 custom-form-value" id="inputBirthday" name="birthday" >{userDetails?.experience?.duration || "-"}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card mb-4 border-0">
                <div className="card-header d-flex justify-content-between">
                    Education
                    <div className="text-end">
                        <span className="mdi mdi-pencil me-1"></span>
                        Edit
                    </div>
                </div>
                <div className="card-body">
                    <div className="border-bottom mb-2">
                        <div className="mb-3 gx-3 row">
                            <div className="col-md-6">
                                <label className="small custom-form-label" htmlFor="inputEmailAddress">Branch</label>
                                <div className="col-md-6 custom-form-value" id="inputEmailAddress">{userDetails?.education?.branch || "-"}</div>
                            </div>
                            <div className="col-md-6">
                                <label className="small custom-form-label" htmlFor="inputPhone">CGPA / Percentage</label>
                                <div className="col-md-6 custom-form-value" id="inputPhone">{userDetails?.education?.percentage || "-"}</div>
                            </div>
                        </div>
                        <div className="row gx-3 mb-3">
                            <div className="col-md-6">
                                <label className="small custom-form-label" htmlFor="inputBirthday">Degree</label>
                                <div className="col-md-6 custom-form-value" id="inputBirthday" name="birthday" >{userDetails?.education?.degree || "-"}</div>
                            </div>
                            <div className="col-md-6">
                                <label className="small custom-form-label" htmlFor="inputBirthday">University / College</label>
                                <div className="col-md-6 custom-form-value" id="inputBirthday" name="birthday" >{userDetails?.education?.university || "-"}</div>
                            </div>
                        </div>
                        <div className="row gx-3 mb-3">
                            <div className="col-md-6">
                                <label className="small custom-form-label" htmlFor="inputBirthday">Year of Completion</label>
                                <div className="col-md-6 custom-form-value" id="inputBirthday" name="birthday" >{userDetails?.education?.completion_year || "-"}</div>
                            </div>
                            <div className="col-md-6">
                                <label className="small custom-form-label" htmlFor="inputBirthday">Year of Joining</label>
                                <div className="col-md-6 custom-form-value" id="inputBirthday" name="birthday" >{userDetails?.education?.joining_year || "-"}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card mb-4 border-0">
                <div className="card-header d-flex justify-content-between">
                    Professional Summary
                    <div className="text-end">
                        <span className="mdi mdi-pencil me-1"></span>
                        Edit
                    </div>
                </div>
                <div className="card-body">
                    <div className="col-md-6 custom-form-value" id="inputBirthday" name="birthday" >{userDetails?.professional_description?.interests || "-"}</div>
                </div>
            </div>
        </Fragment>
    )
}

export default ProfileTab;