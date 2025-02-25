import { BridgeTransaction, Balance} from '@core/types';
import { BigNumber } from 'ethers';

export interface AppStateType {
  bridgeTransactions: BridgeTransaction[];
  isLoggedIn: boolean;
  balance: Balance[];
  isLocked: boolean;
  isTrInProgress: boolean;
  isApproveInProgress: boolean;
  popupsState: {
    account: boolean;
    install: boolean;
  };
  gasPrices: GasPrices;
  rates: RatesApiResponse;
}

export interface RatesApiResponse {
  [currency: string]: {
    usd: number;
  };
}

interface GasPrice {
  type: BigNumber;
  hex: string;
};

export interface GasPriceItem {
  lastBaseFeePerGas: GasPrice;
  maxFeePerGas: GasPrice;
  maxPriorityFeePerGas: GasPrice;
  gasPrice: GasPrice;
};

export interface RelayFeeParams {
  baseCurrencyPriceInUSD: number;
  currencyPriceInUSD: number;
  gasPrice: number;
  currencyDecimals: number;
}

export interface GasPrices {
  [networkId: string]: number;
}

export interface GasPriceResponse {
  [network: string]: GasPriceItem;
};
