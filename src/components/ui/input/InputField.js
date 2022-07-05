import classes from './InputField.module.css';

function InputField(props) {

    return (
        <div className={classes.container}>
            {props.children}
            {props.showInput && <div onClick={props.hideInput} className={classes.backdrop} />}
        </div>
    )
}

export default InputField;