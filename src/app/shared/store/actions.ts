import { createAction } from 'typesafe-actions';
import { SharedActionTypes } from './constants';

export const navigate = createAction(SharedActionTypes.NAVIGATE)<string>();
export const setError = createAction(SharedActionTypes.SET_ERROR)<string | null>();

export const setWalletAddress = createAction('@@SHARED/SET_WALLET_ADDRESS')<string>();
export const setNetworkState = createAction('@@SHARED/SET_NETWORK_STATE')<string>();
export const setIsCorrectNetwork = createAction('@@SHARED/SET_IS_CORRECT_NETWORK')<boolean>();
export const setIsAppConnected = createAction('@@SHARED/SET_IS_APP_CONNECTED')<boolean>();

export const setTransactions = createAction('@@TRANSACTIONS/SET_TRANSACTIONS')<any[]>();
export const setIsLoaded = createAction('@@SHARED/SET_IS_LOADED')<boolean>();