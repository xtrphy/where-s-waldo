import { useEffect, useState } from 'react';

function App() {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/test');
                if (!res.ok) throw new Error('Ошибка запроса');
                const data = await res.json();
                setMessage(data.message);
            } catch (error) {
                console.error('Ошибка при запросе:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;

    return <h1>{message}</h1>;
}

export default App;