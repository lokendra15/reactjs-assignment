import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '../../constants/route';
import './index.scss';
const { HOME } = ROUTE_PATH;
const Header = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(HOME);
  };
  return (
    <div className="headerWrap">
      <div className="headerTitleWrap" onClick={() => handleNavigate()}>
        <div>
          <i className="fa-solid fa-chart-column"></i>
        </div>
        Manage Beneficiary
      </div>
      <i className="fa-solid fa-user iconWrap"></i>
    </div>
  );
};

export default Header;
