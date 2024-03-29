import src404 from '../images/404.png';
import styles from './page-404.module.css';
import {FunctionComponent} from "react";

export const Page404:FunctionComponent = () => {
    return (
        <div className={styles.maindiv}>
            <p>На сайте нет такой страницы. Не переживайте, даже Шерлок не смог найти здесь ни одного бургера.</p>
            <img src={src404} alt="404" className={styles.sherlock} />
        </div>
    );
}