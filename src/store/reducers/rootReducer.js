import { combineReducers } from '@reduxjs/toolkit';
import beneficiary from './beneficiary';
const rootReducer = combineReducers({
  beneficiary,
});

export default rootReducer;
