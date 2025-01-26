export enum ProductStatus {
  LIST = "LIST",
  UN_LIST = "UN_LIST",
}

export enum OrderStatus {
  SUCCESS = "SUCCESS",
  REFUND = "REFUND",
  NOTPAY = "NOTPAY",
  CLOSED = "CLOSED",
  REVOKED = "REVOKED",
  USERPAYING = "USERPAYING",
  PAYERROR = "PAYERROR",
}

// Type of card
export enum CardType {
  TIME = "time",
  DURATION = "duration",
}
// Status of card
export enum CardStatus {
  VALID = "VALID",
  EXPIRED = "EXPIRED",
  DEPLETE = "DEPLETE",
}
