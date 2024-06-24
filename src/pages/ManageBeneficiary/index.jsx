import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../../components/Button';
import BeneficiaryList from '../../components/BeneficiaryList';
import { ROUTE_PATH } from '../../constants/route';
import CONSTANTS from '../../constants/constants';
import {fetchBeneficiery, fetchAddUpdateBeneficiery} from '../../store/reducers/beneficiary/thunk'

import Modal from '../../components/Modal';
import Breadcrumb from '../../components/Breadcrumb';
import './index.scss';

const { BENEFICIARY_ACTION } = CONSTANTS

const { BENEFICIARY_FORM } = ROUTE_PATH;

const ListOfBeneficiaries = () => {
  const dispatch = useDispatch();
  const beneficiary = useSelector((state) => (state.beneficiary));
  const navigate = useNavigate();
  const [selectedBeneficiary, setSelectedBeneficiary] = useState(null);
  const [isModal,setIsModal] = useState({type: '', status: false})

  useEffect(() => { 
    dispatch(fetchBeneficiery())
  }, [])

  const handleEdit = (id) => {
    navigate(`${BENEFICIARY_FORM}/${id}`)
  };

  const handleModal = (type = '', status = false) => {
    setIsModal({type: type, status: status})
  }

  const handleSelectModal = (type, id = '') => {
    console.log('id, type', id, type)
    let temp = beneficiary.beneficiaryData.find((item) => item.id === id)
    setSelectedBeneficiary(temp);
    handleModal(type, true)
  }
  const handleDeleteConfirm = () => {
    const { id = '' } = selectedBeneficiary;
    const beneficiaryData = {
      type: BENEFICIARY_ACTION.DELETE,
      data: {
        id: id
      }
    };
    dispatch(fetchAddUpdateBeneficiery(beneficiaryData));
    handleModal()
  }
  
  const handleNavigation = () => {
    navigate(BENEFICIARY_FORM);
  };


  const renderModal = () => {
    if(!isModal.status){
      return
    }
    const { DELETE, VIEW } = BENEFICIARY_ACTION
    switch(isModal.type){
      case DELETE:
        return (
          <Modal>
            <div>
              <h3 className='heading'>Are you sure you want to delete this beneficiary ?</h3>
              <div className='btn-wrap'>
                <Button
                  onClick={() => handleModal()}
                  className='btn-secondary'
                  text={'Cancel'}
                />
                <Button
                  onClick={() => handleDeleteConfirm('delete', true)}
                  text={'Submit'}
                />
              </div>
            </div>
          </Modal>
        )
      case VIEW: { 
        const {fullName = '', address = '', country = '', pincode = ''} = selectedBeneficiary
        return (
          <Modal >
            <div>
              <h3 className='heading'>Beneficiary detail</h3>
              <div>
                <ul className='no-bullets'>
                  <li><b>Full Name:</b> <span>{fullName}</span></li>
                  <li><b>Address:</b> <span>{address}</span></li>
                  <li><b>Country:</b> <span>{country}</span></li>
                  <li><b>Pincode:</b> <span>{pincode}</span></li>
                </ul>
              </div>
              <div className='btn-wrap'>
                <Button className='btn-secondary' onClick={()=>handleModal()} text="Cancel" />
                <Button
                  onClick={() => handleModal()}
                  text={'Cancel'}
                />
              </div>
            </div>
          </Modal>
        )
      }
      default:
        return ''
    }
  }

  return (
    <div className="manageBeneficiaryWrap">
      <div className="breadcrumbWrap">
        <Breadcrumb />
        <Button
          onClick={() => handleNavigation()}
          className={'AddButtonWrap'}
          text={'Add Beneficiary'}
        />
      </div>
      <div className="tableWrap">
        <BeneficiaryList
          data={beneficiary?.beneficiaryData || []}
          onEdit={handleEdit}
          onDelete={(id) => handleSelectModal(BENEFICIARY_ACTION.DELETE, id)}
          onView={(id) => handleSelectModal(BENEFICIARY_ACTION.VIEW, id)}
        />
      </div>
      {renderModal()}
    </div>
  );
};

export default ListOfBeneficiaries;
