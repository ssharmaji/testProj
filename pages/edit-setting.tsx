import * as React from 'react';
import withAuth from '../auth/withAuth';
import { Image } from '@chakra-ui/react';

const EditSettings = () => {
  return (
    <div className="setting-page">
      <div className="head-section">
        <h2>Settings</h2>
      </div>

      <div className="banner-section">
        <Image src="/plus.png" alt="user Icon" />
      </div>
      <div className="form-box">
        <form>
          <div className="form-group">
            <i className="fa fa-user" aria-hidden="true"></i>
            <input type="text" defaultValue="John Doe" />
          </div>
          <div className="form-group">
            <i className="fa fa-map-marker" aria-hidden="true"></i>
            <input type="text" defaultValue="San Francisco, CA" />
          </div>
          <div className="form-group">
            <i className="fa fa-envelope" aria-hidden="true"></i>
            <input type="text" defaultValue="john.doe@mail.com" />
          </div>
          <div className="form-group">
            <i className="fa fa-phone" aria-hidden="true"></i>
            <input type="text" defaultValue="+0200300500" />
          </div>
          <div className="form-group">
            <i className="fa fa-lock" aria-hidden="true"></i>
            <input type="password" defaultValue="john.doe@mail.com" />
          </div>
          <button type="button" className="form-btn">
            SAVE CHANGES
          </button>
        </form>
      </div>
    </div>
  );
};

export default withAuth(EditSettings);
// export default Home;
