import { createBrowserRouter } from 'react-router-dom';
import { ROUTE_PATH } from '../constants/route';
import Home from '../pages/Home';
import ManageBeneficiary from '../pages/ManageBeneficiary';
import BeneficiaryForm from '../pages/BeneficiaryForm';
import PublicLayout from '../layout/PublicLayout';

const { HOME = '', MANAGE_BENEFICIARY, BENEFICIARY_FORM } = ROUTE_PATH;

const routes = createBrowserRouter([
  {
    path: HOME,
    element: (
      <PublicLayout>
        <Home />
      </PublicLayout>
    ),
  },
  {
    path: MANAGE_BENEFICIARY,
    element: (
      <PublicLayout>
        <ManageBeneficiary />
      </PublicLayout>
    ),
  },
  {
    path: `${BENEFICIARY_FORM}/:id?`,
    element: (
      <PublicLayout>
        <BeneficiaryForm />
      </PublicLayout>
    ),
  },
]);

export default routes;
