export interface WayForPayCallbackBody {
  merchantAccount: string;
  orderReference: string;
  merchantSignature: string;
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
  recToken?: string;
  transactionStatus?: string;
  reason?: string;
  reasonCode: number;
  fee?: number;
  paymentSystem?: string;
  acquirerBankName?: string;
  cardProduct?: string;
  clientName?: string;
  products?: { name: string; price: number; count: number }[];
  rrn?: string;
  terminal?: string;
  acquirer?: string;
}
