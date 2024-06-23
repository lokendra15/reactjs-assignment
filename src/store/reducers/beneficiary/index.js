import { createSlice } from '@reduxjs/toolkit';
import {fetchBeneficiery, fetchAddUpdateBeneficiery} from './thunk';

import {ToastNotifyError} from '../../../components/Toast/ToastNotify';
const initialData = {
  beneficiaryData: [],
  addUpdateBeneficiary: {}
};

const beneficiarySlice = createSlice({
  name: 'beneficiary',
  initialState: { ...initialData },
  reducers: {
    addUpdateBeneficiary: (state, action) => {
      state.addUpdateBeneficiary = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBeneficiery.fulfilled, (state, action) => {
      state.beneficiaryData = action?.payload;
    });
    builder.addCase(fetchBeneficiery.rejected, (state, action) => {
      state.addBeneficiary = {
        error: true,
        errors: action.payload.data,
      };
      ToastNotifyError('Failed to get beneficiery');
    });
    builder.addCase(fetchAddUpdateBeneficiery.pending, (state) => {
      state.addUpdateBeneficiary = {};
    });
    builder.addCase(fetchAddUpdateBeneficiery.fulfilled, (state, action) => {
      state.addUpdateBeneficiary = action.payload;
    });
    builder.addCase(fetchAddUpdateBeneficiery.rejected, (state, action) => {
      state.addUpdateBeneficiary = {
        error: true,
        errors: action?.payload?.data,
      };
      ToastNotifyError('Failed beneficiery.');
    });
  }
});

const {
  actions: { addUpdateBeneficiary, beneficiaryDetail },
  reducer,
} = beneficiarySlice;

const selectorBeneficiary = (state) => state.beneficiarySlice

export { addUpdateBeneficiary, beneficiaryDetail, selectorBeneficiary };

export default reducer;
