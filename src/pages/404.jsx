import { Link } from "react-router-dom";
import classes from "../styles/NotFound.module.css";

const NotFound = () => {

    return (
        <div className={classes.container}>
            <h1 className={classes.head}>
                Page Not Found
            </h1>
            <button type="button" className={classes.button}>
                <Link to="/">home</Link>
            </button>
        </div>
    )

};

export default NotFound;