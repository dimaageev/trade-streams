import React, {useCallback} from 'react';
import {SafeAreaView, Text, View, ViewStyle, TextStyle} from 'react-native';
import useOperations from './container';
import {ITradeItem} from './types';
import {FlashList} from '@shopify/flash-list';
import Toast from '../../components/Toast';

const Operations = () => {
  const {tradeData, toastRef, toastType} = useOperations();

  const TradeItem = useCallback(({item}: {item: ITradeItem}) => {
    return (
      <View style={$tradeItem}>
        <Text>Price: {Number(item.price).toFixed(2)}$</Text>
        <Text>Quantity: {item.quantity}</Text>
        <Text>Time: {item.timestamp.toLocaleTimeString()}</Text>
      </View>
    );
  }, []);

  return (
    <SafeAreaView style={$container}>
      <Text style={$header}>Trades</Text>
      <FlashList
        data={tradeData}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <TradeItem item={item} />}
        estimatedItemSize={100}
      />
      <Toast ref={toastRef} type={toastType} />
    </SafeAreaView>
  );
};

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: '#fff',
  paddingTop: 50,
};

const $header: TextStyle = {
  fontSize: 24,
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: 20,
};

const $tradeItem: ViewStyle = {
  padding: 10,
  borderBottomWidth: 1,
  borderBottomColor: '#ddd',
  height: 100,
};

export default Operations;
