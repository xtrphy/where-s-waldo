import React from 'react';
import styles from './Header.module.css';

const Header = () => {
    function handleClick() {
        console.log('leaderboard');
    }

    return (
        <header className={styles.header}>
            <ul className={styles.container}>
                <li className={styles.logoContainer}>
                    <a href="/"><img className={styles.waldo} src="/waldo.jpg" alt="Waldo" /></a>
                    <p>Where's Waldo?</p>
                </li>
                <li className={styles.leaderboard}>
                    <button onClick={() => handleClick}>Show leaderboard</button>
                </li>
            </ul>
        </header>
    );
};

export default Header;