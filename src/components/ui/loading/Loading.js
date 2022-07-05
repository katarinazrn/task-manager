import classes from './Loading.module.css';

function Loading() {
    return (
        <div className={classes.loading} >
            <div className={classes.dot} id={classes.first} />
            <div className={classes.dot} id={classes.second} />
            <div className={classes.dot} id={classes.third} />
        </div>
    )
}

export default Loading;