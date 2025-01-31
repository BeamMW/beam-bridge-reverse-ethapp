import produce from 'immer';
import { ActionType, createReducer } from 'typesafe-actions';

import { SharedStateType } from '../interface';
import * as actions from './actions';

type Action = ActionType<typeof actions>;

const initialState: SharedStateType = {
  routerLink: '',
  errorMessage: null,
  systemState: {
    address: "",
    chainId: "",
    isConnected: false,
  },
  transactions: [],
  isLoaded: false,
  balances: [],
};

const reducer = createReducer<SharedStateType, Action>(initialState)
  .handleAction(actions.navigate, (state, action) => produce(state, (nexState) => {
    nexState.routerLink = action.payload;
  }))
  .handleAction(actions.setTransactions, (state, action) => produce(state, (nexState) => {
    nexState.transactions = state.transactions.length
      ? [...new Map([...state.transactions, ...action.payload].map((item) => [item.hash, item])).values()]
      : action.payload;
  }))
  .handleAction(actions.setIsAppConnected, (state, action) => produce(state, (nexState) => {
    nexState.systemState.isConnected = action.payload;
  }))  
  .handleAction(actions.setWalletAddress, (state, action) => produce(state, (nexState) => {
    nexState.systemState.address = action.payload;
  }));

export { reducer as SharedReducer };
