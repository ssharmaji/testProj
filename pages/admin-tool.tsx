import * as React from 'react';
import withAuth from '../auth/withAuth';






const AdminTool = () => {
  return (
    <div className="admin-page">
      <div className="sidebar">
        <ul>
          <li>
            <a href="#">
              <span>
                <i className="fa fa-calendar"></i>
              </span>
              Cost at Plant
            </a>
          </li>
          <li>
            <a href="#">
              <span>
                <i className="fa fa-calendar"></i>
              </span>
              Raw Material Cost
            </a>
          </li>
          <li>
            <a href="#">
              <span>
                <i className="fa fa-calendar"></i>
              </span>
              packing Materials
            </a>
          </li>
          <li>
            <a href="#">
              <span>
                <i className="fa fa-calendar"></i>
              </span>
              Sticker & Hot Melt
            </a>
          </li>
          <li>
            <a href="#">
              <span>
                <i className="fa fa-calendar"></i>
              </span>
              Fabric Cost
            </a>
          </li>
          <li>
            <a href="#">
              <span>
                <i className="fa fa-calendar"></i>
              </span>
              BOPP Cost
            </a>
          </li>
        </ul>
      </div>
      <div className="content-page">
        <h2>User Type</h2>
        <div className="primary-panel">
          <div className="panel-header d-flex justify-content-end">
            <button type="button" className="btn btn-secondary">
              <span>
                <i className="fa fa-plus" aria-hidden="true"></i>
              </span>
              Add New User Type
            </button>
          </div>
          <div className="filter-bar">
            <div className="d-flex justify-content-between">
              <div className="search">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                />
              </div>
              <div className="pagination">
                <ul>
                  <li>
                    <a href="#">
                      <i className="fa fa-angle-left" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li className="active">
                    <a href="#"> 1 </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-angle-right" aria-hidden="true"></i>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="sorting">
                Show
                <select className="form-control">
                  <option>50</option>
                </select>
                entries
              </div>
            </div>
          </div>
          <div className="table-box">
            <table className="table">
              <thead>
                <tr>
                  <th>
                    <input type="checkbox" />
                  </th>
                  <th>User Type</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>Attorneys</td>
                  <td>
                    <button type="button" className="btn btn-icon">
                      <i className="fa fa-pencil"></i>
                    </button>
                    <button type="button" className="btn btn-icon">
                      <i className="fa fa-trash-o"></i>
                    </button>
                    <button type="button" className="btn btn-icon">
                      <img src="https://www.amhammer.com/themes/dist/img/user-icon-with-key.png" />
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>Attorneys</td>
                  <td>
                    <button type="button" className="btn btn-icon">
                      <i className="fa fa-pencil"></i>
                    </button>
                    <button type="button" className="btn btn-icon">
                      <i className="fa fa-trash-o"></i>
                    </button>
                    <button type="button" className="btn btn-icon">
                      <img src="https://www.amhammer.com/themes/dist/img/user-icon-with-key.png" />
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>Attorneys</td>
                  <td>
                    <button type="button" className="btn btn-icon">
                      <i className="fa fa-pencil"></i>
                    </button>
                    <button type="button" className="btn btn-icon">
                      <i className="fa fa-trash-o"></i>
                    </button>
                    <button type="button" className="btn btn-icon">
                      <img src="https://www.amhammer.com/themes/dist/img/user-icon-with-key.png" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(AdminTool);
// export default Home;
