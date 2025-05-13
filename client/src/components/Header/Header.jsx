import React, { useState } from 'react';
import LeaderboardModal from '../LeaderboardModal/LeaderboardModal';
import styles from './Header.module.css';

const Header = () => {
    const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);

    const openLeaderboard = () => setIsLeaderboardOpen(true);
    const closeLeaderboard = () => setIsLeaderboardOpen(false);

    return (
        <header className={styles.header}>
            <ul className={styles.container}>
                <li className={styles.logoContainer}>
                    <a href="/"><img className={styles.waldo} src="/waldo.jpg" alt="Waldo" /></a>
                    <p>Where's Waldo?</p>
                </li>
                <li className={styles.leaderboard}>
                    <button onClick={openLeaderboard}>Leaderboard</button>
                    <LeaderboardModal isOpen={isLeaderboardOpen} onClose={closeLeaderboard} />
                </li>
            </ul>
        </header>
    );
};

export default Header;