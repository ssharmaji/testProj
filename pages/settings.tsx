import * as React from 'react';
import withAuth from '../auth/withAuth';
import { Image } from '@chakra-ui/react';
import NavLinks from '../components/Navbar/NavLinks';

const Settings = () => {
  const showLabel = true;
  return (
    <div className="setting-page">
      <div className="head-section">
        <h2>Settings</h2>
      </div>

      <div className="banner-section">
        <Image src="/user-icon.png" alt="user Icon" />
      </div>
      <div className="detail-box">
        <div className="left-box">
          <h2>John Doe</h2>
          <p>San Francisco, CA</p>
        </div>
        <button type="button">EDIT</button>
      </div>
      <NavLinks showLabel={showLabel}/>
    </div>
  );
};

export default withAuth(Settings);
// export default Home;
