import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {useParams} from 'react-router-dom';
import Button from '../../components/Button';
import { ROUTE_PATH } from '../../constants/route';
import messages from '../../constants/messages';
import CONSTANTS from '../../constants/constants';
import generateShortUniqueId from '../../utils/common/common';
import { fetchAddUpdateBeneficiery } from '../../store/reducers/beneficiary/thunk';
import { addUpdateBeneficiary } from '../../store/reducers/beneficiary';
import './index.scss';

const {
  REGEX: { PINCODE },
  BENEFICIARY_ACTION
} = CONSTANTS;

const { MANAGE_BENEFICIARY } = ROUTE_PATH;
const { MSG_FULL_NAME_REQUIRED, MSG_ADDRESS_REQUIRED, MSG_COUNTRY_REQUIRED, MSG_PINCODE_REQUIRED, MSG_PINCODE_MUST_BE } = messages;

const BeneficiaryForm = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const beneficiary = useSelector((state) => (state.beneficiary));
  const details = useSelector((state) => (state?.beneficiary?.beneficiaryData?.find((item) => item.id === id)));
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const handleNavigate = () => {
    navigate(MANAGE_BENEFICIARY);
  };

  useEffect(() => {
    if (details) {
      for(let item in details){
        setValue(item, details[item]);
      }
    }
  }, [details, setValue]);

  useEffect(() => {
    const {addUpdateBeneficiary: { status = '' } = {} } = beneficiary
    if([200,201].includes(status)){
      dispatch(addUpdateBeneficiary({}))
      navigate(MANAGE_BENEFICIARY)
    }
  }, [beneficiary.addUpdateBeneficiary])

  const onSubmit = (data) => {
    const beneficiaryData = {
      type: id ? BENEFICIARY_ACTION.EDIT : BENEFICIARY_ACTION.ADD,
      data: {
        id: id || generateShortUniqueId(),
        ...data,
      }
    };
    dispatch(fetchAddUpdateBeneficiery(beneficiaryData));
  };

  return (
    <div className="formWrap">
      <form onSubmit={handleSubmit(onSubmit)} className="formContainerWrap">
        <div>
          <label>Full Name</label>
          <input
            {...register('fullName', { required: MSG_FULL_NAME_REQUIRED })}
            type="text"
            placeholder="Please enter full name"
          />
          {errors.fullName && <p>{errors.fullName.message}</p>}
        </div>
        <div>
          <label>Address</label>
          <input
            {...register('address', { required: MSG_ADDRESS_REQUIRED })}
            type="text"
            placeholder="Please enter address"
          />
          {errors.address && <p>{errors.address.message}</p>}
        </div>
        <div>
          <label>Country</label>
          <select {...register('country', { required: MSG_COUNTRY_REQUIRED })}>
            <option value="">Select a country</option>
            <option value="India">India</option>
            <option value="Russia">Russia</option>
            <option value="Canada">Canada</option>
            <option value="Sweden">Sweden</option>
            <option value="Australia">Australia</option>
          </select>
          {errors.country && <p>{errors.country.message}</p>}
        </div>
        <div>
          <label>Pincode</label>
          <input
            {...register('pincode', {
              required: MSG_PINCODE_REQUIRED,
              pattern: {
                value: PINCODE,
                message: MSG_PINCODE_MUST_BE,
              },
            })}
            type="number"
            placeholder="Please enter pincode"
          />
          {errors.pincode && <p>{errors.pincode.message}</p>}
        </div>
        <div className="buttonsWrap">
          <Button text="Cancel" onClick={() => handleNavigate()} className='btn-secondary' />
          <Button type="submit" text={id ? 'Update' : 'Add'} className="submitWrap" />
        </div>
      </form>
    </div>
  );
};

export default BeneficiaryForm;
