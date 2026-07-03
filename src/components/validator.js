const Validator = ({
    isValid,
    text
}) => {
    return ( 
        <div className="d-flex align-items-center gap-2 mb-2">
            <img src={`/images/${isValid ? 'check.png': 'multiply.png'}`}
            alt="Check Icon" 
            width="16" 
            height="16"/>
            <p
            style={{
                color: `${isValid? 'green': 'red'}`,
                fontSize: '12px'
            }}
            >{text}</p>
        </div>
     );
}
 
export default Validator;