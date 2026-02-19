import React, { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;

  useEffect(() => {
    console.log('Users: Fetching data from REST API endpoint:', apiUrl);
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        console.log('Users: Fetched data:', data);
        const items = Array.isArray(data) ? data : data.results || [];
        setUsers(items);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Users: Error fetching data:', err);
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
          <h2 className="mb-0">👤 Users</h2>
          <span className="badge bg-light text-dark">{users.length} total</span>
        </div>
        <div className="card-body p-0">
          {users.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">👤</span>
              <h5>No users found</h5>
              <p className="text-muted">Users will appear here once they are added.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover table-striped mb-0" aria-label="Users table">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">Age</th>
                    <th scope="col">Fitness Goal</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user._id || user.id}>
                      <td className="text-muted">{index + 1}</td>
                      <td><strong>{user.username}</strong></td>
                      <td>
                        <a href={`mailto:${user.email}`} className="text-decoration-none">
                          {user.email}
                        </a>
                      </td>
                      <td><span className="badge bg-secondary">{user.age}</span></td>
                      <td><span className="badge bg-primary">{user.fitness_goal}</span></td>
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

export default Users;
