import { Fragment } from "react";
import { useSelector } from "react-redux";

const Job = () => {
    const { userDetails } = useSelector((state) => state.profile);
    return (
        <Fragment>
            <div className="card mb-4 border-0">
                <div className="card-header d-flex justify-content-between">
                    Job Details
                    <div className="text-end">
                        <span className="mdi mdi-pencil me-1"></span>
                        Edit
                    </div>
                </div>
                <div className="card-body">
                    <div className="mb-3 gx-3 row">
                        <div className="col-md-6">
                            <label className="small custom-form-label" htmlFor="inputEmailAddress">Employee Number</label>
                            <div className="col-md-6 custom-form-value" id="inputEmailAddress">{userDetails?.first_name || "-"}</div>
                        </div>
                        <div className="col-md-6">
                            <label className="small custom-form-label" htmlFor="inputPhone">DATE OF JOINING</label>
                            <div className="col-md-6 custom-form-value" id="inputPhone">{userDetails?.middle_name || "-"}</div>
                        </div>
                    </div>
                    <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                            <label className="small custom-form-label" htmlFor="inputBirthday">JOB TITLE - PRIMARY</label>
                            <div className="col-md-6 custom-form-value" id="inputBirthday" name="birthday" >{userDetails?.last_name || "-"}</div>
                        </div>
                        <div className="col-md-6">
                            <label className="small custom-form-label" htmlFor="inputBirthday">JOB TITLE - SECONDARY</label>
                            <div className="col-md-6 custom-form-value" id="inputBirthday" name="birthday" >{userDetails?.gender || "-"}</div>
                        </div>
                    </div>
                    <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                            <label className="small custom-form-label" htmlFor="inputBirthday">PROBATION</label>
                            <div className="col-md-6 custom-form-value" id="inputBirthday" name="birthday" >{userDetails?.date_of_birth || "-"}</div>
                        </div>
                        <div className="col-md-6">
                            <label className="small custom-form-label" htmlFor="inputBirthday">NOTICE PERIOD</label>
                            <div className="col-md-6 custom-form-value" id="inputBirthday" name="birthday" >{userDetails?.marital_status || "-"}</div>
                        </div>
                    </div>
                    <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                            <label className="small custom-form-label" htmlFor="inputBirthday">WORKER TYPE</label>
                            <div className="col-md-6 custom-form-value" id="inputBirthday" name="birthday" >{userDetails?.blood_group || "-"}</div>
                        </div>
                        <div className="col-md-6">
                            <label className="small custom-form-label" htmlFor="inputBirthday">TIME TYPE</label>
                            <div className="col-md-6 custom-form-value" id="inputBirthday" name="birthday" >{userDetails?.physically_handicapped || "-"}</div>
                        </div>
                    </div>
                    <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                            <label className="small custom-form-label" htmlFor="inputBirthday">CONTRACT STATUS</label>
                            <div className="col-md-6 custom-form-value" id="inputBirthday" name="birthday" >{userDetails?.blood_group || "-"}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card mb-4 border-0">
                <div className="card-header d-flex justify-content-between">
                    Employee Time
                    <div className="text-end">
                        <span className="mdi mdi-pencil me-1"></span>
                        Edit
                    </div>
                </div>
                <div className="card-body">
                    <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                            <label className="small custom-form-label" htmlFor="inputBirthday">SHIFT</label>
                            <div className="col-md-6 custom-form-value" id="inputBirthday" name="birthday" >{userDetails?.personal_email || "-"}</div>
                        </div>
                        <div className="col-md-6">
                            <label className="small custom-form-label" htmlFor="inputBirthday">WEEKLY OFF POLICY</label>
                            <div className="col-md-6 custom-form-value" id="inputBirthday" name="birthday" >{userDetails?.work_email || "-"}</div>
                        </div>
                    </div>

                    <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                            <label className="small custom-form-label" htmlFor="inputBirthday">LEAVE PLAN</label>
                            <div className="col-md-6 custom-form-value" id="inputBirthday" name="birthday" >{userDetails?.personal_phone || "-"}</div>
                        </div>
                        <div className="col-md-6">
                            <label className="small custom-form-label" htmlFor="inputBirthday">HOLIDAY CALENDAR</label>
                            <div className="col-md-6 custom-form-value" id="inputBirthday" name="birthday" >{userDetails?.work_phone || "-"}</div>
                        </div>
                    </div>

                    <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                            <label className="small custom-form-label" htmlFor="inputBirthday">ATTENDANCE NUMBER</label>
                            <div className="col-md-6 custom-form-value" id="inputBirthday" name="birthday" >{userDetails?.residence_phone || "-"}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card mb-4 border-0">
                <div className="card-header d-flex justify-content-between">
                    Organization
                    <div className="text-end">
                        <span className="mdi mdi-pencil me-1"></span>
                        Edit
                    </div>
                </div>
                <div className="card-body">
                    <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                            <label className="small custom-form-label" htmlFor="inputBirthday">BUSINESS UNIT</label>
                            <div className="col-md-6 custom-form-value" id="inputBirthday" name="birthday" >{userDetails?.current_address || "-"}</div>
                        </div>
                        <div className="col-md-6">
                            <label className="small custom-form-label" htmlFor="inputBirthday">DEPARTMENT</label>
                            <div className="col-md-6 custom-form-value" id="inputBirthday" name="birthday" >{userDetails?.permanent_address || "-"}</div>
                        </div>
                    </div>
                    <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                            <label className="small custom-form-label" htmlFor="inputBirthday">LOCATION</label>
                            <div className="col-md-6 custom-form-value" id="inputBirthday" name="birthday" >{userDetails?.current_address || "-"}</div>
                        </div>
                        <div className="col-md-6">
                            <label className="small custom-form-label" htmlFor="inputBirthday">LEGAL ENTITY</label>
                            <div className="col-md-6 custom-form-value" id="inputBirthday" name="birthday" >{userDetails?.permanent_address || "-"}</div>
                        </div>
                    </div>
                    <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                            <label className="small custom-form-label" htmlFor="inputBirthday">REPORTS TO</label>
                            <div className="col-md-6 custom-form-value" id="inputBirthday" name="birthday" >{userDetails?.current_address || "-"}</div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Job;