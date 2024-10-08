import React from 'react';
import {Pressable, Text, ViewStyle} from 'react-native';

const Button = ({onPress}: {onPress: () => void}) => {
  return (
    <Pressable
      style={({pressed}) => [
        $button,
        {
          opacity: pressed ? 0.5 : 1,
        },
      ]}
      onPress={onPress}>
      <Text>Settings</Text>
    </Pressable>
  );
};

const $button: ViewStyle = {
  padding: 10,
  backgroundColor: '#ddd',
  borderRadius: 5,
  marginTop: 60,
  marginBottom: 20,
  width: 100,
  marginRight: 30,
  alignItems: 'center',
  alignSelf: 'flex-end',
};

export default Button;
