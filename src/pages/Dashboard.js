const Dashboard = () => {
  const dashboardStats = {
    totalMembers: 342,
    activeMembers: 298,
    weeklyAttendance: 256,
    monthlyIncome: 12450,
    upcomingEvents: 3,
    assets: 45
  };
  return ( 
    <div>
      <h3 className="fw-bold mb-4">Dashboard Overview</h3>
      <div className="row g-3 mb-4">
        <div className="col-md-4 col-lg-2">
          <div className="card border-0 shadow-sm text-center">
            <div className="card-body">
              <i className="bi bi-people fs-1 text-primary"></i>
              <h4 className="fw-bold mb-0">{dashboardStats.totalMembers}</h4>
              <small className="text-muted">Total Members</small>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-lg-2">
          <div className="card border-0 shadow-sm text-center">
            <div className="card-body">
              <i className="bi bi-person-check fs-1 text-success"></i>
              <h4 className="fw-bold mb-0">{dashboardStats.activeMembers}</h4>
              <small className="text-muted">Active</small>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-lg-2">
          <div className="card border-0 shadow-sm text-center">
            <div className="card-body">
              <i className="bi bi-calendar-week fs-1 text-info"></i>
              <h4 className="fw-bold mb-0">{dashboardStats.weeklyAttendance}</h4>
              <small className="text-muted">Weekly Attendance</small>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-lg-2">
          <div className="card border-0 shadow-sm text-center">
            <div className="card-body">
              <i className="bi bi-currency-dollar fs-1 text-warning"></i>
              <h4 className="fw-bold mb-0">GHS {dashboardStats.monthlyIncome}</h4>
              <small className="text-muted">Monthly Income</small>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-lg-2">
          <div className="card border-0 shadow-sm text-center">
            <div className="card-body">
              <i className="bi bi-calendar-event fs-1 text-danger"></i>
              <h4 className="fw-bold mb-0">{dashboardStats.upcomingEvents}</h4>
              <small className="text-muted">Upcoming Events</small>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-lg-2">
          <div className="card border-0 shadow-sm text-center">
            <div className="card-body">
              <i className="bi bi-box-seam fs-1 text-secondary"></i>
              <h4 className="fw-bold mb-0">{dashboardStats.assets}</h4>
              <small className="text-muted">Assets Tracked</small>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0">
              <h5 className="mb-0 fw-bold">Recent Activity</h5>
            </div>
            <div className="card-body">
              <div className="list-group list-group-flush">
                <div className="list-group-item d-flex align-items-center px-0">
                  <i className="bi bi-person-plus text-success me-3 fs-5"></i>
                  <div className="flex-grow-1">
                    <div className="fw-semibold">New member registered</div>
                    <small className="text-muted">Sarah Johnson joined as Visitor</small>
                  </div>
                  <small className="text-muted">2h ago</small>
                </div>
                <div className="list-group-item d-flex align-items-center px-0">
                  <i className="bi bi-cash text-primary me-3 fs-5"></i>
                  <div className="flex-grow-1">
                    <div className="fw-semibold">Tithe recorded</div>
                    <small className="text-muted">GHS 500 via Mobile Money</small>
                  </div>
                  <small className="text-muted">5h ago</small>
                </div>
                <div className="list-group-item d-flex align-items-center px-0">
                  <i className="bi bi-calendar-check text-info me-3 fs-5"></i>
                  <div className="flex-grow-1">
                    <div className="fw-semibold">Sunday Service Attendance</div>
                    <small className="text-muted">256 members present</small>
                  </div>
                  <small className="text-muted">1d ago</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0">
              <h5 className="mb-0 fw-bold">Quick Actions</h5>
            </div>
            <div className="card-body">
              <div className="d-grid gap-2">
                <button className="btn btn-outline-primary text-start">
                  <i className="bi bi-person-plus me-2"></i>Add New Member
                </button>
                <button className="btn btn-outline-success text-start">
                  <i className="bi bi-plus-circle me-2"></i>Record Transaction
                </button>
                <button className="btn btn-outline-info text-start" >
                  <i className="bi bi-calendar-plus me-2"></i>Create Event
                </button>
                <button className="btn btn-outline-warning text-start" >
                  <i className="bi bi-megaphone me-2"></i>Send Announcement
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
   );
}
 
export default Dashboard;