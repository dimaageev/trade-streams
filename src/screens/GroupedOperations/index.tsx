import React, {useCallback} from 'react';
import {View, Text, ViewStyle, TextStyle} from 'react-native';
import useGroupedOperations from './container';
import {SafeAreaView} from 'react-native-safe-area-context';
import {IGroupedTrade} from '../Operations/types';
import {FlashList} from '@shopify/flash-list';

const GroupedOperations: React.FC = () => {
  const {groupedTrades} = useGroupedOperations();

  const GroupedItem = useCallback(({item}: {item: IGroupedTrade}) => {
    return (
      <View style={$tradeItem}>
        <Text>Time: {item.time}</Text>
        <Text>Average Price: {item.averagePrice.toFixed(2)}</Text>
        <Text>Total Quantity: {item.totalQuantity}</Text>
        <Text>Trade Count: {item.tradeCount}</Text>
      </View>
    );
  }, []);

  return (
    <SafeAreaView style={$container}>
      <Text style={$header}>Grouped Trades</Text>
      <FlashList
        data={groupedTrades}
        keyExtractor={item => item.time}
        renderItem={({item}) => <GroupedItem item={item} />}
        estimatedItemSize={100}
      />
    </SafeAreaView>
  );
};

const $header: TextStyle = {
  fontSize: 24,
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: 20,
};

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: '#fff',
};

const $tradeItem: ViewStyle = {
  padding: 10,
  borderBottomWidth: 1,
  borderBottomColor: '#ddd',
  height: 100,
};

export default GroupedOperations;
