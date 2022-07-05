import classes from './Options.module.css';

function Options(props) {

    return (
        <div className={classes.options}>
            <button onClick={props.edit} className={classes.edit}>Edit</button>
            <button onClick={props.delete} className={classes.delete}>Delete</button>
        </div>
    )
}

export default Options;