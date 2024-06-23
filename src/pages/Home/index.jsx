import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { ROUTE_PATH } from '../../constants/route';
import './index.scss';
const { MANAGE_BENEFICIARY } = ROUTE_PATH;
const Home = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(MANAGE_BENEFICIARY);
  };
  return (
    <div className="homeWrap">
      <Button
        onClick={() => handleNavigate()}
        className={'buttonWrap'}
        text={'Go to Manage Beneficiary'}
      />
    </div>
  );
};

export default Home;
