import { StyleSheet } from 'react-native';
import { View } from '../Themed';
import TickerList from './TickerList';
import Tick from './Tick';
import { useState } from 'react';

export enum CurrencyTypeEnum {
  USD = 'USD',
  EUR = 'EUR',
  BGN = 'BGN',
  GBP = 'GBP',
}

interface TickerProps {
  value?: number;
  fontSize?: number;
  isCurrency?: boolean;
  currencyType?: CurrencyTypeEnum;
}

const Ticker: React.FC<TickerProps> = ({
  value = 12345,
  fontSize = 50,
  isCurrency = false,
  currencyType = CurrencyTypeEnum.USD,
}) => {
  const [adjustedFontSize, setAdjustedFontSize] = useState(fontSize);

  const intNumber = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyType,
  }).format(value);

  const splitValue = isCurrency
    ? intNumber.toString().split('')
    : value.toString().split('');

  return (
    <View>
      <Tick
        style={{ position: 'absolute', top: -1000000 }}
        onTextLayout={(e) => {
          setAdjustedFontSize(e.nativeEvent.lines[0].ascender);
        }}
        numberOfLines={1}
        adjustsFontSizeToFit
        fontSize={fontSize}
      >
        {splitValue}
      </Tick>
      <View style={styles.innerContainer}>
        {splitValue.map((number, index) => {
          return !isNaN(parseInt(number)) ? (
            <TickerList
              index={index}
              number={parseInt(number)}
              fontSize={adjustedFontSize}
              key={index}
            />
          ) : (
            <Tick
              style={styles.secondaryTick}
              fontSize={adjustedFontSize}
              key={index}
            >
              {number}
            </Tick>
          );
        })}
      </View>
    </View>
  );
};

export default Ticker;

const styles = StyleSheet.create({
  innerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  secondaryTick: {
    opacity: 0.5,
  },
});
