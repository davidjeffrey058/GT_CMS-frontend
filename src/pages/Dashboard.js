
const Dashboard = () => {
    return ( 
       <div>
      <h3 className="mb-4">Dashboard</h3>

      <div className="row">
        <div className="col-md-4">
          <div className="card text-center shadow">
            <div className="card-body">
              <h6>Members</h6>
              <h3>120</h3>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center shadow">
            <div className="card-body">
              <h6>Attendance</h6>
              <h3>85</h3>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center shadow">
            <div className="card-body">
              <h6>Donations</h6>
              <h3>GHS 5,200</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
     );
}
 
export default Dashboard;
