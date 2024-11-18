import MetisMenu from "metismenujs";
import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import SimpleBar from "simplebar-react";

const SidebarContent = () => {
  const ref = useRef();
  const location = useLocation();

  useEffect(() => {
    const pathName = location.pathname;

    const initMenu = () => {
      new MetisMenu("#side-menu");
      let matchingMenuItem = null;
      const ul = document.getElementById("side-menu");
      const items = ul.getElementsByTagName("a");
      for (let i = 0; i < items.length; ++i) {
        if (pathName === items[i].pathname) {
          matchingMenuItem = items[i];
          break;
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem);
      }
    };
    initMenu();
  }, [location.pathname]);

  useEffect(() => {
    ref.current.recalculate();
  });

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop;
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300;
      }
    }
  }

  function activateParentDropdown(item) {
    item.classList.add("active");
    const parent = item.parentElement;
    const parent2El = parent.childNodes[1];
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show");
    }

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show"); // ul tag

        const parent3 = parent2.parentElement; // li tag

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add("mm-show"); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add("mm-show"); // li
              parent5.childNodes[0].classList.add("mm-active"); // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false;
    }
    scrollElement(item);
    return false;
  }

  return (
    <React.Fragment>
      <SimpleBar
        className={`h-100 ${location.pathname.startsWith("/board") ? "board-scroll-bar" : ""
          }`}
        ref={ref}
      >
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled mb-5" id="side-menu">
            <li className="menu-title">Navigation</li>
            <li>
              <Link to="/dashboard" className="sidebar-title">
                <i className="mdi mdi-view-dashboard-outline"></i>
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/user" className="sidebar-title">
                <i className="mdi mdi-account-multiple-outline"></i>
                <span>User</span>
              </Link>
            </li>
            <li>
              <Link
                to="/#"
                className="has-arrow sidebar-title"
                id="support-ticket-link"
              >
                <i className="fas fa-ticket-alt"></i>
                <span>Support Tickets</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/support-center/tickets">Tickets</Link>
                </li>
                <li>
                  <Link to="/support-center/reporting">Reporting</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow sidebar-title">
                <i className="bx bxs-report"></i>
                <span>Analytics</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/analytics/revenues">Revenues</Link>
                </li>
                <li>
                  <Link to="/analytics/subscribers">Subscribers</Link>
                </li>
                <li>
                  <Link to="/analytics/subscriptions">Subscriptions</Link>
                </li>

                <li>
                  <Link to="/analytics/renewal">Renewals</Link>
                </li>

                <li>
                  <Link to="/analytics/orders">Orders</Link>
                </li>
                <li>
                  <Link to="/analytics/products">Products</Link>
                </li>
                <li>
                  <Link to="/analytics/coupons">Coupons</Link>
                </li>
                <li>
                  <Link to="/analytics/users">Users</Link>
                </li>

                <li>
                  <Link to="/analytics/emails">Emails</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow sidebar-title">
                <i className="bx bxs-report"></i>
                <span>Reports</span>
              </Link>

              <ul className="sub-menu">
                <li>
                  <Link to={"/reports/active-subscriptions"}>
                    <span>Active Subscriptions</span>
                  </Link>
                </li>
                <li>
                  <Link to={"/reports/free-trial-onboarding"}>
                    <span>Free Trial OnBoarding</span>
                  </Link>
                </li>
                <li>
                  <Link to={"/reports/free-trial-buy-now-report"}>
                    <span>Free Trial Buy Now Report</span>
                  </Link>
                </li>
                <li>
                  <Link to={"/reports/resources-feedback-report"}>
                    <span>Resources Feedback Report</span>
                  </Link>
                </li>
                <li>
                  <Link to={"/reports/new-subscriptions"}>
                    <span>New Subscriptions</span>
                  </Link>
                </li>
                <li>
                  <Link to={"/reports/subscription-feedback-report"}>
                    <span>Subscription Feedback Report</span>
                  </Link>
                </li>
                <li>
                  <Link to={"/reports/calender-card-shipment-report"}>
                    <span>Calender Card Shipment Report</span>
                  </Link>
                </li>
                <li>
                  <Link to={"/reports/cancel-subscriptions"}>
                    <span>Cancelled Subscriptions</span>
                  </Link>
                </li>
                <li>
                  <Link to={"/reports/renewal-subscriptions"}>
                    <span>Renewal Subscriptions</span>
                  </Link>
                </li>
                <li>
                  <Link to={"/reports/campaign-report"}>
                    <span>Campaign Report</span>
                  </Link>
                </li>
                <li>
                  <Link to={"/reports/grow-con-report"}>
                    <span>GrowCon Report</span>
                  </Link>
                </li>
                <li>
                  <Link to={"/reports/checkout-campaign-report"}>
                    <span>Checkout Campaign Report</span>
                  </Link>
                </li>
                <li>
                  <Link to={"/reports/former-tag-reports"}>
                    <span>Former Tag Reports</span>
                  </Link>
                </li>
                <li>
                  <Link to={"/reports/failed-subscriptions"}>
                    <span>Failed Subscriptions</span>
                  </Link>
                </li>
                <li>
                  <Link to={"/reports/expired-subscriptions"}>
                    <span>Expired Subscriptions</span>
                  </Link>
                </li>
                <li>
                  <Link to="/reports/active-users">
                    <span>Active Users</span>
                  </Link>
                </li>
                <li>
                  <Link to="/reports/sent-email">
                    <span>Sent Email</span>
                  </Link>
                </li>
                <li>
                  <Link to="/reports/admin-logs">
                    <span>Admin Logs</span>
                  </Link>
                </li>
                <li>
                  <Link to={"/reports/disputed-transactions"}>
                    <span>Disputed Transactions</span>
                  </Link>
                </li>
                <li>
                  <Link to={"/reports/metric"}>
                    <span>Signup Metric Report</span>
                  </Link>
                </li>
                <li>
                  <Link to="/reports/blog-sitemap">
                    <span>Blog Sitemap</span>
                  </Link>
                </li>
                <li>
                  <Link to="/geo-location">
                    <span>Users Map</span>
                  </Link>
                </li>
                <li>
                  <Link to="/realtime">
                    <span>Realtime Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link to="/live-chat">
                    <span>Live Chat Archives</span>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  );
};

export default SidebarContent;
