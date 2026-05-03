const Users = () => {
    return ( 
        <div>
      <h4 className="mb-3">Users</h4>

      <div className="card shadow">
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Role</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>admin</td>
                <td><span className="badge bg-primary">Admin</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
     );
}
 
export default Users;