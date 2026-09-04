import React from 'react';
function Leaderboard({ data }) {
    if (!data.length) return null;
    return (
        <div className="leaderboard">
            🏆 <strong>Liderlik Tablosu (En Yüksek Ortalama):</strong>
            <ol>
                {data.map((item, idx) => (
                    <li key={idx}>
                        {item.name}: <strong>{item.bestAverage} Puan</strong>
                    </li>
                ))}
            </ol>
        </div>
    );
}
export default React.memo(Leaderboard);