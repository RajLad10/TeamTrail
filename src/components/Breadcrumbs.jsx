import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";

const BreadCrumb = () => {

    const location = useLocation();
    const { pathname } = location;
    const segments = pathname === '/' ? [''] : pathname.split('/');
    let url = import.meta.env.VITE_APP_URL;

    const breadcrumbLinks = segments.map((segment, i) => {
        url += `${segment}`;
        return (
            <li key={i}>
                <Link className="" to={url} >
                    {segment === '' ? 'Home' : segment}
                </Link>
            </li>
        );
    });

    return (
        <Fragment>
            <div className="breadcrumbs">
                <nav>
                    <ol className="cd-breadcrumb">
                        {breadcrumbLinks}
                    </ol>
                </nav>
            </div>
        </Fragment>
    );
};

export default BreadCrumb;