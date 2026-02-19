import React, { useState, useEffect } from 'react';

function parseMembers(raw) {
  if (Array.isArray(raw)) return raw;
  if (typeof raw === 'string') return raw.split(',').map((m) => m.trim()).filter(Boolean);
  return [];
}

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

  useEffect(() => {
    console.log('Teams: Fetching data from REST API endpoint:', apiUrl);
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        console.log('Teams: Fetched data:', data);
        const items = Array.isArray(data) ? data : data.results || [];
        setTeams(items);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Teams: Error fetching data:', err);
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
      {/* Summary table */}
      <div className="card data-card mb-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2 className="mb-0">👥 Teams</h2>
          <span className="badge bg-light text-dark">{teams.length} total</span>
        </div>
        <div className="card-body p-0">
          {teams.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">👥</span>
              <h5>No teams found</h5>
              <p className="text-muted">Teams will appear here once they are created.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover table-striped mb-0" aria-label="Teams table">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Team Name</th>
                    <th scope="col">Members</th>
                    <th scope="col">Size</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map((team, index) => {
                    const members = parseMembers(team.members);
                    return (
                      <tr key={team._id || team.id}>
                        <td className="text-muted">{index + 1}</td>
                        <td><strong>{team.name}</strong></td>
                        <td>
                          {members.map((m, i) => (
                            <span key={i} className="member-badge">{m}</span>
                          ))}
                        </td>
                        <td>
                          <span className="badge bg-info text-dark">
                            {members.length} member{members.length !== 1 ? 's' : ''}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Team detail cards */}
      {teams.length > 0 && (
        <>
          <h3 className="fw-bold mb-3">Team Details</h3>
          <div className="row g-4">
            {teams.map((team) => {
              const members = parseMembers(team.members);
              return (
                <div className="col-sm-6 col-lg-4" key={team._id || team.id}>
                  <div className="card workout-card">
                    <div className="card-header">
                      <h5 className="mb-0">👥 {team.name}</h5>
                    </div>
                    <div className="card-body">
                      <h6 className="text-muted mb-2">Members</h6>
                      <div>
                        {members.map((m, i) => (
                          <span key={i} className="badge bg-secondary me-1 mb-1">{m}</span>
                        ))}
                      </div>
                    </div>
                    <div className="card-footer text-muted">
                      <small>{members.length} member{members.length !== 1 ? 's' : ''}</small>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default Teams;
