const ErrorComponent = ({errorMessage, imageWidth = '70px', ContainerHeight = ''}) => {
    return ( <div style={{height: ContainerHeight}} className="d-flex flex-column align-items-center gap-2 justify-content-center">
        <img
            style={{width: imageWidth,}} 
         src="/images/error.png" alt="" />
        <p className="fw-bold secondary">{errorMessage}</p>
    </div> );
}
 
export default ErrorComponent;