export interface WayForPayCallbackBody {
  merchantSignature: string;
  merchantAccount: string;
  orderReference: string;
  amount: number;
  currency: string;
  authCode?: string;
  merchantTransactionType?: string;
  transactionStatus?: string;
  status?: string;
  clientEmail?: string;
  email?: string;
  productName?: string;
}
