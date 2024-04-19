import { useUser } from '../../auth/useUser';

const NavLinks = ({ showLabel = false }) => {
  const { user, logout }: { user: any; logout: () => void } = useUser();
  return (
    <div className="nav-links">
      <ul className="option-list">
        <li>
          <a href="/notification">
            <i className="fa fa-bell" aria-hidden="true"></i>
            {showLabel && 'Notifications'}
          </a>
        </li>
        {/* <li>
          <a href="#">
            <i className="fa fa-cog" aria-hidden="true"></i>
            {showLabel && 'General'}
          </a>
        </li> */}
        <li>
          <a href="/edit-account">
            <i className="fa fa-light fa-user-circle-o" aria-hidden="true"></i>
            {showLabel && 'Account'}
          </a>
        </li>
        <li>
          <a href="/">
            <i className="fa fa-plus" aria-hidden="true"></i>
            {showLabel && 'Create New'}
          </a>
        </li>
        <li>
          <a href="/quotes-list">
            <i className="fa fa-database" aria-hidden="true"></i>
            {showLabel && 'Privacy'}
          </a>
        </li>
        <li>
          <a href="#" onClick={() => logout()}>
            <i className="fa fa-sign-out" aria-hidden="true"></i>
            {showLabel && 'Logout'}
          </a>
        </li>
      </ul>
    </div>
  );
};

export default NavLinks;
