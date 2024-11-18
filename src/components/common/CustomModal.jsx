import { Fragment } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const CustomModal = ({
    isOpen,
    heading,
    primaryButtonText,
    secondaryButtonText,
    onSubmit = () => {},
    onCancel = () => {},
    children
}) => {
    return (
        <Fragment>
            <Modal 
                isOpen={isOpen} 
                size="lg"
                centered 
            >
                <ModalHeader>
                    <h3>{heading}</h3>
                </ModalHeader>
                <ModalBody>
                    {children}
                </ModalBody>
                {/* <ModalFooter>
                    <button 
                        className="btn btn-primary"
                        onClick={onSubmit}
                    >
                        {primaryButtonText}
                    </button>
                    <button 
                        className="btn btn-secondary"
                        onClick={onCancel}
                    >
                        {secondaryButtonText}
                    </button>
                </ModalFooter> */}
            </Modal>
        </Fragment>
    );
};
export default CustomModal;