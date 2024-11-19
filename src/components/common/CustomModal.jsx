import { Fragment } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

const CustomModal = ({
    isOpen,
    heading,
    primaryButtonText,
    secondaryButtonText,
    onSubmit = () => {},
    onCancel = () => {},
    children,
    parentClass = "",
}) => {
    return (
        <Fragment>
            <Modal 
                isOpen={isOpen} 
                size="lg"
                centered 
                className={parentClass}
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