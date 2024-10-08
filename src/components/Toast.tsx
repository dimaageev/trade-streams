import React, {
  forwardRef,
  useContext,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {Animated, Text, ViewStyle} from 'react-native';
import {PriceLimitContext} from '../../App';

interface IToastProps {
  type: 'top' | 'bottom';
}

const ANIM_TIME = 800;

const Toast = forwardRef<any, IToastProps>(({type}, ref) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const {priceLimit, resetPriceLimit} = useContext(PriceLimitContext);

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: ANIM_TIME,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: ANIM_TIME,
      useNativeDriver: true,
    }).start();
  };

  const [isVisible, setIsVisible] = useState(false);

  const showToast = () => {
    if (priceLimit.max !== 0 && priceLimit.min !== 0) {
      setIsVisible(true);
      fadeIn();
      const timer = setTimeout(() => {
        fadeOut();
        resetPriceLimit();
        setIsVisible(false);
        clearTimeout(timer);
      }, 1500);
    }
  };

  useImperativeHandle(ref, () => ({
    show: showToast,
  }));

  let message = '';

  switch (type) {
    case 'top':
      message = 'Price has risen above your limit';
      break;
    case 'bottom':
      message = 'Price has fallen below your limit';
      break;
    default:
      message = 'Nothing to view';
  }

  return (
    <>
      {isVisible ? (
        <Animated.View
          ref={ref}
          style={[
            $container,
            {
              opacity: fadeAnim,
            },
          ]}>
          <Text>{message}</Text>
        </Animated.View>
      ) : null}
    </>
  );
});

const $container: ViewStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  backgroundColor: 'yellow',
  padding: 10,
};

export default Toast;
