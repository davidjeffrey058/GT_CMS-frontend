const ErrorComponent = ({
    errorMessage, 
    imageWidth = '70px', 
    ContainerHeight = '',
    image = 'error.png'
}) => {
    return ( <div style={{height: ContainerHeight}} 
    className="d-flex flex-column align-items-center gap-3 justify-content-center">
        <img
            style={{width: imageWidth,}} 
         src={`/images/${image}`} alt="" />
        <p className="fw-bold secondary">{errorMessage}</p>
    </div> );
}
 
export default ErrorComponent;