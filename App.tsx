import React, {useState, createContext} from 'react';
import TabNavigator from './src/navigation/Tab';
import {Text, TextInput, Button as RNButton, ViewStyle} from 'react-native';
import Button from './src/components/Button';
import Modal from 'react-native-modal';

export const PriceLimitContext = createContext({
  priceLimit: {max: 0, min: 0},
  resetPriceLimit: () => {},
});

function App() {
  const [formVisible, setFormVisible] = useState(false);
  const [maxPrice, setMaxPrice] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [priceLimit, setPriceLimit] = useState<{max: number; min: number}>({
    max: 0,
    min: 0,
  });

  const showForm = () => {
    setFormVisible(true);
  };

  const resetPriceLimit = () => {
    setPriceLimit({max: 0, min: 0});
  };

  return (
    <PriceLimitContext.Provider value={{priceLimit, resetPriceLimit}}>
      <Button onPress={showForm} />
      <TabNavigator />
      <Modal isVisible={formVisible} style={$modal}>
        <RNButton
          title="Close"
          onPress={() => setFormVisible(false)}
          color="red"
        />
        <Text>Max amount</Text>
        <TextInput
          style={$input}
          inputMode="numeric"
          onChangeText={val => setMaxPrice(Number(val))}
        />
        <Text>Min Amount</Text>
        <TextInput
          style={$input}
          inputMode="numeric"
          onChangeText={val => setMinPrice(Number(val))}
        />
        <RNButton
          title="Save"
          onPress={() => {
            setPriceLimit({max: maxPrice, min: minPrice});
            setFormVisible(false);
          }}
        />
      </Modal>
    </PriceLimitContext.Provider>
  );
}

export default App;

const $modal: ViewStyle = {
  width: '100%',
  backgroundColor: '#fff',
  alignSelf: 'center',
};

const $input: ViewStyle = {
  padding: 10,
  borderBottomWidth: 1,
  borderBottomColor: '#ddd',
  marginBottom: 20,
};
