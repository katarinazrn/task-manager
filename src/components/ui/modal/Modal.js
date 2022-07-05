import classes from './Modal.module.css';

function Modal(props) {

    return (
        <div>
            <div onClick={props.cancel} className={classes.backdrop}></div>
            <div className={classes.content}>
                {props.children}
            </div>
        </div>
    )
}

export default Modal;