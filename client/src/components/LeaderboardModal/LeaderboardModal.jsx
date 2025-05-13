import React from 'react';
import { useEffect, useState } from 'react';
import styles from './LeaderboardModal.module.css';

const LeaderboardModal = ({ isOpen, onClose }) => {
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (isOpen) {
            fetch('/api/leaderboard')
                .then(res => res.json())
                .then(data => setResults(data))
                .catch(console.error);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <h2>Leaderboard</h2>
                <ul>
                    {results.map((entry, index) => (
                        <li key={entry.id}>
                            {index + 1}. {entry.playerName} - {entry.time}s
                        </li>
                    ))}
                </ul>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default LeaderboardModal;