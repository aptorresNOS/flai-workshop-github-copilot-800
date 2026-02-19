import React, { useState, useEffect } from 'react';

const ACTIVITY_COLORS = {
  running:  'success',
  cycling:  'info',
  swimming: 'primary',
  walking:  'warning',
  gym:      'danger',
  yoga:     'secondary',
};

function activityColor(type) {
  return ACTIVITY_COLORS[(type || '').toLowerCase()] || 'secondary';
}

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

  useEffect(() => {
    console.log('Activities: Fetching data from REST API endpoint:', apiUrl);
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        console.log('Activities: Fetched data:', data);
        const items = Array.isArray(data) ? data : data.results || [];
        setActivities(items);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Activities: Error fetching data:', err);
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
          <h2 className="mb-0">🏃 Activities</h2>
          <span className="badge bg-light text-dark">{activities.length} total</span>
        </div>
        <div className="card-body p-0">
          {activities.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">🏃</span>
              <h5>No activities found</h5>
              <p className="text-muted">Activities will appear here once they are logged.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover table-striped mb-0" aria-label="Activities table">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">User</th>
                    <th scope="col">Activity Type</th>
                    <th scope="col">Duration</th>
                    <th scope="col">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((activity, index) => (
                    <tr key={activity._id || activity.id}>
                      <td className="text-muted">{index + 1}</td>
                      <td><strong>{activity.user}</strong></td>
                      <td>
                        <span className={`badge bg-${activityColor(activity.activity_type)}`}>
                          {activity.activity_type}
                        </span>
                      </td>
                      <td>{activity.duration} <small className="text-muted">min</small></td>
                      <td>{activity.date}</td>
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

export default Activities;
