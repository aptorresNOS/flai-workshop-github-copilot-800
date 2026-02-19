import React, { useState, useEffect } from 'react';

function RankBadge({ rank }) {
  if (rank === 1) return <span className="badge rank-1">🥇 1st</span>;
  if (rank === 2) return <span className="badge rank-2">🥈 2nd</span>;
  if (rank === 3) return <span className="badge rank-3">🥉 3rd</span>;
  return <span className="badge bg-secondary">#{rank}</span>;
}

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

  useEffect(() => {
    console.log('Leaderboard: Fetching data from REST API endpoint:', apiUrl);
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        console.log('Leaderboard: Fetched data:', data);
        const items = Array.isArray(data) ? data : data.results || [];
        setEntries(items);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Leaderboard: Error fetching data:', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  if (loading) return (
    <div className="loading-spinner">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  if (error) return (
    <div className="container mt-4">
      <div className="alert alert-danger d-flex align-items-center" role="alert">
        <span className="me-2">⚠️</span> Error: {error}
      </div>
    </div>
  );

  return (
    <div className="container mt-4 mb-5">
      <div className="card data-card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2 className="mb-0">🏆 Leaderboard</h2>
          <span className="badge bg-light text-dark">{entries.length} entries</span>
        </div>
        <div className="card-body p-0">
          {entries.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">🏆</span>
              <h5>No leaderboard entries yet</h5>
              <p className="text-muted">Start logging activities to appear on the leaderboard!</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover table-striped mb-0" aria-label="Leaderboard table">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">Rank</th>
                    <th scope="col">User</th>
                    <th scope="col">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry, index) => (
                    <tr key={entry._id || entry.id} className={index < 3 ? 'fw-semibold' : ''}>
                      <td><RankBadge rank={index + 1} /></td>
                      <td>{entry.user}</td>
                      <td><span className="badge bg-primary fs-6">{entry.score}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
