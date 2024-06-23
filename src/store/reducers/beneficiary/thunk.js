import { createAsyncThunk } from '@reduxjs/toolkit';
import { ROUTE_API } from '../../../constants/route';
import { getAuthorization } from '../../../service/api';
import { ToastNotifyError, ToastNotifySuccess } from '../../../components/Toast/ToastNotify';
import messages from '../../../constants/messages';
import CONSTANTS from  '../../../constants/constants';
const { MSG_BENEFICIERY } = messages;
const { BENEFICIARY_ACTION } = CONSTANTS

const fetchBeneficiery = createAsyncThunk(
  'fetchBeneficiery',
  async (payload, { getState, rejectWithValue }) => {
    const API = getAuthorization(getState);
    try {
      const response = await API.get(`${ROUTE_API.BENEFICIARY}`, payload);
      const { data = {}, response: errresponse, response: { status = '' } = {} } = response;
      if (status === 400) {
        return rejectWithValue(errresponse);
      }
      return data;
    } catch (err) {
      ToastNotifyError(err);
      return err;
    }
  },
);

const fetchAddUpdateBeneficiery = createAsyncThunk(
  'fetchAddUpdateBeneficiery',
  async (payload = {}, { dispatch, getState, rejectWithValue }) => {
    const API = getAuthorization(getState);
    try {
      let response;
      switch(payload.type){
        case BENEFICIARY_ACTION.EDIT:
          response = await API.patch(`${ROUTE_API.BENEFICIARY}/${payload.data.id}`, payload.data);
          break;
        case BENEFICIARY_ACTION.DELETE:
          response = await API.delete(`${ROUTE_API.BENEFICIARY}/${payload.data.id}`);
          break;
        default:
          response = await API.post(`${ROUTE_API.BENEFICIARY}/`, payload.data);
          break;
      }
      const { status = '' } = response;
      if ([200,201].includes(status)) {
        ToastNotifySuccess(`${MSG_BENEFICIERY[payload.type]}`);
        if(payload.type === BENEFICIARY_ACTION.DELETE){
          dispatch(fetchBeneficiery())
          return ''
        }
        return response;
      }
      return rejectWithValue(response);
    } catch (err) {
      ToastNotifyError(err);
      return err;
    }
  },
);

export { fetchBeneficiery, fetchAddUpdateBeneficiery };
