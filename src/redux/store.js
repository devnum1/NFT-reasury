import { configureStore } from '@reduxjs/toolkit';
import selectedNftReducer from './slices/selectedNft';
import refreshListReducer from './slices/refreshList';
import transactionsReducer from './slices/transactions';

export const store = configureStore({
  reducer: {
    selectedNft: selectedNftReducer,
    refreshList: refreshListReducer,
    transactions: transactionsReducer,
  },
});
