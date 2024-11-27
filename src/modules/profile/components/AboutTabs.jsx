import { useState, useEffect, Fragment } from "react";

const AboutTabs = ({ activeTab, setActiveTab }) => {

  const [clipPath, setClipPath] = useState("");

  const tabs = ["Summary", "Timeline"];

  const handleNavigate = (index, tabElement) => {
    const { offsetLeft, offsetWidth } = tabElement;
    const containerWidth = tabElement.parentNode.offsetWidth;
    const clipRight = offsetLeft + offsetWidth;

    setClipPath(
      `inset(0 ${Number(100 - (clipRight / containerWidth) * 100).toFixed()}% 0 ${Number(
        (offsetLeft / containerWidth) * 100
      ).toFixed()}% round 17px)`
    );

    setActiveTab(index);
  };

  useEffect(() => {
    // Set initial clip-path for the default active tab
    const tabElement = document.querySelector(".tab");
    if (tabElement) {
      handleNavigate(0, tabElement);
    }
  }, []);

  return (
    <Fragment>
      <div className="card card-header about-tabs mb-3 border-0">
        <div className="tabs-wrapper" style={{ "--clip-path": clipPath }}>
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={`tab ${index === activeTab ? "active" : ""}`}
              onClick={(e) => handleNavigate(index, e.currentTarget)}
            >
              {tab}
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default AboutTabs;
