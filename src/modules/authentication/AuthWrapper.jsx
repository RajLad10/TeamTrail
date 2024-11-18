import { Fragment } from "react"
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import profile from "../../assets/images/profile-img.png";

// eslint-disable-next-line react/prop-types
const AuthWrapper = ({ children, heading, subHeading }) => {

    return (
        <Fragment>
            <div className="account-pages my-5 pt-sm-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8} lg={6} xl={5}>
                            <Card className="overflow-hidden">
                                <div className="bg-primary-subtle">
                                    <Row>
                                        <Col className="col-7">
                                            <div className="text-primary p-4">
                                                <h5 className="text-primary">{heading}</h5>
                                                <p>{subHeading}</p>
                                            </div>
                                        </Col>
                                        <Col className="col-5 align-self-end">
                                            <img src={profile} alt="" className="img-fluid" />
                                        </Col>
                                    </Row>
                                </div>
                                <CardBody className="pt-0">
                                    {children}
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Fragment >
    )
}

export default AuthWrapper;