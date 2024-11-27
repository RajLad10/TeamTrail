import { Fragment, useState } from "react"
import { profileTabs } from "../../../constant";
import About from "./profileTabs/About";
import ProfileTab from "./profileTabs/ProfileTab";
import Job from "./profileTabs/Job";

const ProfileTabs = () => {
    const [activeTab, setActiveTab] = useState(0);
    return (
        <Fragment>
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
                {activeTab === 0 ?
                    <About />
                    :
                    activeTab === 1 ?
                        <ProfileTab />
                        :
                        activeTab === 2 ?
                            <Job />
                            :
                            activeTab === 3 ?
                                <About />
                                :
                                activeTab === 4 ?
                                    <About />
                                    :
                                    <About />
                }
            </div>
        </Fragment>
    )
}

export default ProfileTabs;