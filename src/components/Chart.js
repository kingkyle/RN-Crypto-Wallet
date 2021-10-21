/* eslint-disable react-native/no-inline-styles */
import {COLORS, FONTS, SIZES} from '../constants';

import {LineChart} from 'react-native-chart-kit';
import React from 'react';
import {View} from 'react-native';
import dayjs from 'dayjs';

const Chart = ({containerStyle, chartPrices}) => {
  const data = chartPrices ? chartPrices?.map(i => i) : [];

  return (
    <View style={{...containerStyle}}>
      {data.length > 0 && (
        <LineChart
          data={{
            datasets: [{data}],
          }}
          width={SIZES.width}
          height={200}
          bezier
          withDots={false}
          yAxisLabel="$"
          yAxisInterval={1}
          formatXLabel={v => dayjs(v).format('DD-MM')}
          withInnerLines={false}
          withOuterLines={false}
          withVerticalLabels={false}
          chartConfig={{
            color: () => COLORS.lightGreen,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            fillShadowGradient: COLORS.white,
            fillShadowGradientOpacity: 0.5,
            strokeWidth: 2,
            decimalPlaces: 2,
            style: {
              borderRadius: 16,
            },
            propsForLabels: {
              ...FONTS.h5,
            },
          }}
          style={{marginVertical: 8, borderRadius: 16}}
        />
      )}
    </View>
  );
};

export default Chart;
