import {useEffect, useState, useRef, useContext} from 'react';
import {ITradeItem} from './types';
import {PriceLimitContext} from '../../../App';

const useOperations = () => {
  const toastRef = useRef<any>(null);
  const [toastType, setToastType] = useState<'top' | 'bottom'>('top');

  const handleShowToast = () => {
    if (toastRef.current) {
      toastRef.current.show();
    }
  };
  const [tradeData, setTradeData] = useState<ITradeItem[]>([]);
  const ws = useRef<WebSocket | null>(null);

  const {priceLimit, resetPriceLimit} = useContext(PriceLimitContext);

  useEffect(() => {
    ws.current = new WebSocket(
      'wss://stream.binance.com:9443/ws/btcusdt@aggTrade',
    );

    ws.current.onmessage = event => {
      const message = JSON.parse(event.data);

      const trade = {
        id: message.a,
        price: message.p,
        quantity: message.q,
        timestamp: new Date(message.T),
      };

      console.log(priceLimit);

      if (priceLimit.max !== 0 && priceLimit.min !== 0) {
        if (Number(priceLimit.max) < Number(trade.price)) {
          setToastType('top');
        }
        if (Number(priceLimit.min) > Number(trade.price)) {
          setToastType('bottom');
        }
        resetPriceLimit();
        setTimeout(() => {
          handleShowToast();
        }, 1000);
      }

      setTradeData(prevTrades => {
        const now = new Date();
        const oneHourAgo = now.getTime() - 60 * 60 * 1000;

        return [trade, ...prevTrades]
          .filter(t => t.timestamp.getTime() >= oneHourAgo)
          .slice(0, 10);
      });
    };

    ws.current.onerror = error => {
      console.error('WebSocket Error:', error.message);
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [priceLimit, resetPriceLimit]);

  return {tradeData, toastRef, toastType, resetPriceLimit};
};

export default useOperations;
