import './App.css';
import { Routes, Route, NavLink } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

const NAV_LINKS = [
  { to: '/users',       label: 'Users' },
  { to: '/activities',  label: 'Activities' },
  { to: '/teams',       label: 'Teams' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts',    label: 'Workouts' },
];

const FEATURES = [
  { icon: '👤', title: 'Users',       desc: 'Manage user profiles and fitness goals',   to: '/users'       },
  { icon: '🏃', title: 'Activities',  desc: 'Log and track your fitness activities',    to: '/activities'  },
  { icon: '👥', title: 'Teams',       desc: 'Join or create competitive fitness teams', to: '/teams'       },
  { icon: '🏆', title: 'Leaderboard', desc: 'See who tops the fitness charts',          to: '/leaderboard' },
  { icon: '💪', title: 'Workouts',    desc: 'Browse personalised workout plans',        to: '/workouts'    },
];

function App() {
  return (
    <div className="App">
      {/* ── Navbar ── */}
      <nav className="navbar navbar-expand-lg navbar-nos sticky-top shadow-sm">
        <div className="container-fluid">
          <NavLink className="navbar-brand d-flex align-items-center" to="/">
            <img
              src="/nos-logo-light.png"
              alt="NOS"
              className="nos-logo"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            OctoFit Tracker
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {NAV_LINKS.map(({ to, label }) => (
                <li className="nav-item" key={to}>
                  <NavLink
                    className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                    to={to}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* ── Routes ── */}
      <Routes>
        <Route
          path="/"
          element={
            <>
              {/* Hero */}
              <div className="hero-section">
                <div className="container">
                  <h1 className="display-4 fw-bold">Welcome to OctoFit Tracker</h1>
                  <p className="lead mt-3">
                    Track your fitness activities, compete with your team, and reach your goals!
                  </p>
                  <div className="mt-4">
                    <NavLink to="/activities" className="btn btn-nos-primary btn-lg me-2 px-4">
                      Get Started
                    </NavLink>
                    <NavLink to="/leaderboard" className="btn btn-nos-outline btn-lg px-4">
                      View Leaderboard
                    </NavLink>
                  </div>
                </div>
              </div>

              {/* Feature cards */}
              <div className="container mb-5">
                <h2 className="text-center fw-bold mb-4 section-heading mx-auto">Explore OctoFit</h2>
                <div className="row g-4 justify-content-center">
                  {FEATURES.map(({ icon, title, desc, to }) => (
                    <div className="col-sm-6 col-lg-4" key={title}>
                      <NavLink to={to} className="text-decoration-none">
                        <div className="card feature-card h-100">
                          <div className="card-body text-center">
                            <span className="feature-icon">{icon}</span>
                            <h5 className="card-title fw-bold">{title}</h5>
                            <p className="card-text text-muted small">{desc}</p>
                            <span className="btn btn-sm btn-nos-primary mt-1">Go to {title}</span>
                          </div>
                        </div>
                      </NavLink>
                    </div>
                  ))}
                </div>
              </div>
            </>
          }
        />
        <Route path="/users"       element={<Users />} />
        <Route path="/activities"  element={<Activities />} />
        <Route path="/teams"       element={<Teams />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts"    element={<Workouts />} />
      </Routes>

      {/* ── Footer ── */}
      <footer className="app-footer">
        <div className="container">
          <p className="mb-0">&copy; 2024 OctoFit Tracker &mdash; Built with React &amp; Django</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
