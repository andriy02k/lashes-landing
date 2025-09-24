export interface WayForPayCallbackBody {
  merchantAccount: string;
  merchantSignature: string;
  merchantDomainName?: string;
  orderReference: string;
  amount: number;
  currency: string;
  authCode?: string;
  email?: string;
  phone?: string;
  createdDate?: number;
  processingDate?: number;
  cardPan?: string;
  cardType?: string;
  issuerBankCountry?: string;
  issuerBankName?: string;
  transactionStatus?: string;
  reason?: string;
  reasonCode?: string;
  fee?: number;
  paymentSystem?: string;
}
