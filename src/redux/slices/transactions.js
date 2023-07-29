import { createSlice } from '@reduxjs/toolkit';
import { Alchemy } from 'alchemy-sdk';
import { ethers } from 'ethers';
import { find } from 'lodash';
import { alchemySettings } from 'src/config';

const initialState = {
  buying: [],
  selling: [],
  isLoadingBuying: false,
  isLoadingSelling: false,
};

export const transactions = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setLoadingSelling: (state, action) => {
      state.isLoadingSelling = action?.payload;
    },
    setLoadingBuying: (state, action) => {
      state.setLoadingBuying = action?.payload;
    },
    setBuying: (state, action) => {
      state.buying = action?.payload;
    },
    setSelling: (state, action) => {
      state.selling = action?.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setBuying, setSelling, setLoadingSelling, setLoadingBuying } = transactions.actions;

export const fetchTransactionsByAddress = (userAddress) => async (dispatch) => {
  const alchemy = new Alchemy(alchemySettings);
  dispatch(setLoadingBuying(true));
  const { transfers } = await alchemy.core.getAssetTransfers({
    fromBlock: '0x0',
    toAddress: userAddress,
    excludeZeroValue: true,
    category: ['erc721', 'erc1155'],
  });
  const allTransactions = await Promise.all(
    transfers.map(async (transfer) => await alchemy.core.getTransaction(transfer?.hash))
  );
  const parsedTransactions = allTransactions.map(
    ({ gasLimit, gasPrice, maxFeePerGas, maxPriorityFeePerGas, value, wait, ...transaction }) => ({
      ...transaction,
      gasLimit: ethers.utils.formatEther(gasLimit),
      gasPrice: ethers.utils.formatEther(gasPrice),
      maxFeePerGas: ethers.utils.formatEther(maxFeePerGas),
      maxPriorityFeePerGas: ethers.utils.formatEther(maxPriorityFeePerGas),
      value: ethers.utils.formatEther(value),
      detail: find(transfers, { hash: transaction?.hash }),
    })
  );
  dispatch(setBuying(parsedTransactions));
  dispatch(setLoadingBuying(false));
};

export const fetchBuyingTransactions = (userAddress) => async (dispatch) => {
  const alchemy = new Alchemy(alchemySettings);
  dispatch(setLoadingBuying(true));
  const { transfers } = await alchemy.core.getAssetTransfers({
    fromBlock: '0x0',
    toAddress: userAddress,
    excludeZeroValue: true,
    category: ['erc721', 'erc1155'],
  });
  const allTransactions = await Promise.all(
    transfers.map(async (transfer) => await alchemy.core.getTransaction(transfer?.hash))
  );
  
  dispatch(setBuying(allTransactions));
  dispatch(setLoadingBuying(false));
};

export const fetchSellingTransactions = (userAddress) => async (dispatch) => {
  const alchemy = new Alchemy(alchemySettings);
  dispatch(setLoadingSelling(true));
  const { transfers } = await alchemy.core.getAssetTransfers({
    fromAddress: userAddress,
    fromBlock: '0x0',
    excludeZeroValue: true,
    category: ['erc721', 'erc1155'],
  });
  const allTransactions = await Promise.all(
    transfers.map(async (transfer) => await alchemy.core.getTransaction(transfer?.hash))
  );
  const parsedTransactions = allTransactions.map(
    ({ gasLimit, gasPrice, maxFeePerGas, maxPriorityFeePerGas, value, wait, ...transaction }) => ({
      ...transaction,
      gasLimit: ethers.utils.formatEther(gasLimit),
      gasPrice: ethers.utils.formatEther(gasPrice),
      maxFeePerGas: ethers.utils.formatEther(maxFeePerGas),
      maxPriorityFeePerGas: ethers.utils.formatEther(maxPriorityFeePerGas),
      value: ethers.utils.formatEther(value),
      detail: find(transfers, { hash: transaction?.hash }),
    })
  );
  dispatch(setSelling(parsedTransactions));
  dispatch(setLoadingSelling(false));
};

export const transactionsSelector = (state) => state.transactions;

export default transactions.reducer;
