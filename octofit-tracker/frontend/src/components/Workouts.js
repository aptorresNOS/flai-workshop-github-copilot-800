import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

  useEffect(() => {
    console.log('Workouts: Fetching data from REST API endpoint:', apiUrl);
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        console.log('Workouts: Fetched data:', data);
        const items = Array.isArray(data) ? data : data.results || [];
        setWorkouts(items);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Workouts: Error fetching data:', err);
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
          <h2 className="mb-0">💪 Workouts</h2>
          <span className="badge bg-light text-dark">{workouts.length} total</span>
        </div>
        <div className="card-body p-0">
          {workouts.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">💪</span>
              <h5>No workouts found</h5>
              <p className="text-muted">Workout plans will appear here once they are added.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover table-striped mb-0" aria-label="Workouts table">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Workout Name</th>
                    <th scope="col">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {workouts.map((workout, index) => (
                    <tr key={workout._id || workout.id}>
                      <td className="text-muted">{index + 1}</td>
                      <td><strong>{workout.name}</strong></td>
                      <td className="text-muted">{workout.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Workout plan cards */}
      {workouts.length > 0 && (
        <>
          <h3 className="fw-bold mb-3">Workout Plans</h3>
          <div className="row g-4">
            {workouts.map((workout) => (
              <div className="col-sm-6 col-lg-4" key={workout._id || workout.id}>
                <div className="card workout-card">
                  <div className="card-header">
                    <h5 className="mb-0">💪 {workout.name}</h5>
                  </div>
                  <div className="card-body">
                    <p className="card-text text-muted">
                      {workout.description || 'No description available.'}
                    </p>
                  </div>
                  <div className="card-footer">
                    <button className="btn btn-primary btn-sm w-100">Start Workout</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Workouts;
