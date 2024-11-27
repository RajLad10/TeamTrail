import { Fragment, useState } from "react"
import AboutTabs from "../AboutTabs";
import Summary from "../Summary";
import Timeline from "../Timeline";

const About = () => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <Fragment>
            <AboutTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab === 0 ?
                <Summary /> : ""}

            {activeTab === 1 ?
                <Timeline /> : ""}
        </Fragment>
    )
}

export default About;