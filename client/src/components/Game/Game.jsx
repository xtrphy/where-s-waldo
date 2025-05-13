import React from 'react';
import { useEffect, useState } from 'react';
import styles from './Game.module.css';

const Game = () => {
    const [imageData, setImageData] = useState(null);
    const [clickCoords, setClickCoords] = useState(null);
    const [foundCharacters, setFoundCharacters] = useState([]);
    const [startTime, setStartTime] = useState(null);

    useEffect(() => {
        fetch('/api/game-data')
            .then(res => res.json())
            .then(data => {
                setImageData(data);
                setStartTime(Date.now());
            })
            .catch(console.error);
    }, []);

    const handleClick = (e) => {
        const rect = e.target.getBoundingClientRect();
        const x = Math.round(e.clientX - rect.left);
        const y = Math.round(e.clientY - rect.top);
        setClickCoords({ x, y });
    };

    const handleCharacterSelect = async (characterId, name) => {
        const res = await fetch('/api/check-character', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                characterId,
                x: clickCoords.x,
                y: clickCoords.y
            }),
        });
        const data = await res.json();

        if (data.isCorrect) {
            setFoundCharacters((prev) => [...prev, characterId]);
            alert(`You found ${name}!`);
        } else {
            alert('Nope! Try again');
        }

        setClickCoords(null);
    };

    const handleFinish = async () => {
        const time = Math.floor((Date.now() - startTime) / 1000);
        const name = prompt('Enter your name:');
        if (!name) return;

        await fetch('/api/leaderboard', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ playerName: name, time }),
        });

        alert('Result saved!');
    };

    if (!imageData) return <p>Loading...</p>

    return (
        <main className={styles.main}>
            <div style={{ display: 'flex', flexDirection: 'column', 'justifyContent': 'center', alignItems: 'center', gap: '1rem' }}>
                <img className={styles.level}
                    src={imageData.url}
                    onClick={handleClick}
                    alt="Level" />

                {clickCoords && (
                    <div style={{
                        position: 'absolute',
                        top: clickCoords.y + 80,
                        left: clickCoords.x + 335,
                        border: '5px solid red',
                        borderRadius: '50%',
                        width: 40,
                        height: 40,
                        pointerEvents: 'none',
                    }}></div>
                )}

                {clickCoords && (
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <p>Who is here?</p>
                        {imageData.characters.map((c) =>
                            foundCharacters.includes(c.id) ? null : (
                                <button key={c.id} onClick={() => handleCharacterSelect(c.id, c.name)}>
                                    {c.name}
                                </button>
                            )
                        )}
                    </div>
                )}

                {foundCharacters.length === imageData.characters.length && (
                    <button onClick={handleFinish}>Finish and Save Time</button>
                )}
            </div>
        </main>
    );
};

export default Game;