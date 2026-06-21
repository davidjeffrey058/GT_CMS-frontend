const Validator = ({
    isValid,
    text
}) => {
    return ( 
        <div className="d-flex gap-2 mb-2">
            <input
            type="checkbox"
            checked={isValid}
            readOnly
            />
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