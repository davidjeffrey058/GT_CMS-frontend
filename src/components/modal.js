const Modal = ({
    children,
    modalId = "exampleModal",
    title = "Modal Title",
    saveText = "Save Changes",
    size,
    onSave = () => {},
    onCancel = () => {},
}) => {
    return (
        <div
            className="modal fade"
            id={modalId}
            tabIndex="-1"
            aria-labelledby={`${modalId}Label`}
            aria-hidden="true"
        >
            <div className={`modal-dialog modal-${size || 'sm'}`}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h1
                            className="modal-title fs-5"
                            id={`${modalId}Label`}
                        >
                            {title}
                        </h1>

                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            onClick={onCancel}
                        />
                    </div>

                    <div className="modal-body">
                        {children}
                    </div>

                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                            onClick={onCancel}
                        >
                            Close
                        </button>

                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={onSave}
                        >
                            {saveText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;