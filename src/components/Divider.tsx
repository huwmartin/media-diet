import * as React from 'react';
import {colors} from '../theme';
import {StyleSheet, View} from 'react-native';
import {calculateMargin} from '../utils/margin';

export default class Divider extends React.Component<{margin?: string}> {
  render() {
    const margin = calculateMargin(this.props.margin);

    return (
      <View
        style={{
          ...margin,
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: colors.midtone,
        }}
      />
    );
  }
}
