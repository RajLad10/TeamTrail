import { Fragment } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const ConfirmationModal = ({
    isOpen,
    parentClass = "",
    primaryButtonText = "Yes",
    secondaryButtonText = "No",
    onSubmit = () => { },
    onCancel = () => { },
    title
}) => {
    return (
        <Fragment>
            <Modal
                isOpen={isOpen}
                size="md"
                centered
                className={`confirmation-modal ${parentClass}`}
            >
                <ModalHeader toggle={onCancel}>
                </ModalHeader>
                <ModalBody >
                    <div className="mb-3 warning-text">
                        <span className="mdi mdi-alert mb-1 d-block warning-icon"></span>
                        <span className="warning-title">Are you sure?{/*  you want to deactivate <b>&ldquo;{title}&rdquo;</b> ? */}</span>
                        <p className="warning-subtitle">You want to deactivate <b>&ldquo;{title}&rdquo;</b> ?</p>
                    </div>
                    <div className="footer text-center">
                        <button
                            className="btn btn-outline-danger warning-submit-btn me-3"
                            onClick={onSubmit}
                        >
                            {primaryButtonText}
                        </button>
                        <button
                            className="btn btn-outline-dark warning-cancel-btn"
                            onClick={onCancel}
                        >
                            {secondaryButtonText}
                        </button>
                    </div>
                </ModalBody>
            </Modal>
        </Fragment>
    );
};
export default ConfirmationModal;