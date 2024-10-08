import useOperations from '../Operations/container';
import {IGroupedTrade, ITradeItem} from '../Operations/types';

const useGroupedOperations = () => {
  const {tradeData} = useOperations();

  const groupTradesByMinute = (trades: ITradeItem[]) => {
    const grouped: Record<string, IGroupedTrade> = {};

    trades.forEach(trade => {
      const timeKey = trade.timestamp.toISOString().substring(0, 16); // "YYYY-MM-DDTHH:mm"
      if (!grouped[timeKey]) {
        grouped[timeKey] = {
          time: trade.timestamp.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
          averagePrice: parseFloat(trade.price),
          totalQuantity: Number(trade.quantity),
          tradeCount: 1,
        };
      } else {
        grouped[timeKey].averagePrice =
          (grouped[timeKey].averagePrice * grouped[timeKey].tradeCount +
            parseFloat(trade.price)) /
          (grouped[timeKey].tradeCount + 1);
        grouped[timeKey].totalQuantity += Number(trade.quantity);
        grouped[timeKey].tradeCount += 1;
      }
    });

    return Object.values(grouped).sort((a, b) => b.time.localeCompare(a.time)); // Sort by time descending
  };

  const groupedTrades = groupTradesByMinute(tradeData);

  return {groupedTrades};
};

export default useGroupedOperations;
