export interface CurrenciesByNetworkType {
  [network_id: string]: CurrencyType;
};

export interface CurrencyType {
  [currency_id: string]: {
    name: string;
    rate_id: string;
    id: number;
    decimals: number;
    validator_dec: number;
    ethTokenContract: string;
    ethPipeContract: string;
  }
}
