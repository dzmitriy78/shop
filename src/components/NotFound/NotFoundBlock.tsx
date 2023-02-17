import React from 'react';
import classes from "./NotFoundBlock.module.scss"
import {useNavigate} from "react-router-dom";
import not_found from "./../../assets/img/🤔.png"

const NotFoundBlock = () => {
    const navigate = useNavigate()
    return (
        <div className={classes.root}>
            <img src={not_found} alt={"not_found"}/>
            <div>Page not found :(</div>
            <p className={classes.description}>К сожалению, такая страница отсутствует</p>
            <button className="button" onClick={() => navigate("/")}>На главную</button>
        </div>
    );
};

export default NotFoundBlock;