export interface SharedStateType {
  routerLink: string;
  errorMessage: string | null;
  systemState: {
    isConnected: boolean;
    address: string;
    chainId: string;
  };
  balances: any[];
  transactions: any[];
  isLoaded: boolean;
}
