export interface ITradeItem {
  id: number;
  price: string;
  quantity: string;
  timestamp: Date;
}

export interface IGroupedTrade {
  time: string; // Time in "HH:mm" format
  averagePrice: number;
  totalQuantity: number;
  tradeCount: number;
}
