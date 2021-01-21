import * as React from 'react';
import {View, StyleSheet, StyleProp, ViewStyle, Text} from 'react-native';
import {colors, spacing, typography} from '../theme';
import {calculateMargin} from '../utils/margin';
import Divider from './Divider';

interface Props<T> {
  title?: string | null;
  items: T[];
  renderItem: (item: T, styles: StyleProp<ViewStyle>) => React.ReactNode;
  keyExtractor: (item: T, index: number) => string | number;
  margin?: string;
  leftInset?: 's' | 'm' | 'none';
  withTopBorder?: boolean;
  withBottomBorder?: boolean;
  showDividers?: boolean;
}

export function List<T>({
  leftInset = 'm',
  withBottomBorder = true,
  withTopBorder = true,
  showDividers = true,
  ...props
}: Props<T>) {
  const margin = calculateMargin(props.margin);

  const containerStyle = StyleSheet.flatten<ViewStyle>([
    styles.container,
    // withTopBorder && {
    //   borderTopWidth: StyleSheet.hairlineWidth,
    // },
    // withBottomBorder && {
    //   borderBottomWidth: StyleSheet.hairlineWidth,
    // },
  ]);

  return (
    <View style={{...margin}}>
      {props.title && (
        <Text
          style={{
            ...calculateMargin(`0 ${leftInset} s`),
            color: colors.midtone,
            fontFamily: typography.family.body,
            fontSize: typography.size.text.m,
            lineHeight: typography.lineheight.body.m,
          }}>
          {props.title}
        </Text>
      )}
      {withTopBorder && <Divider margin={`0 0 0 ${leftInset}`} />}
      <View style={containerStyle}>
        {props.items.map((item, index) => {
          const content = props.renderItem(item, {
            paddingLeft: leftInset !== 'none' ? spacing[leftInset] : 0,
          });

          if (!content) {
            return null;
          }

          return (
            <View key={props.keyExtractor(item, index)}>
              {content}
              {showDividers && props.items.length - 1 !== index && (
                <Divider margin={`0 0 0 ${leftInset}`} />
              )}
            </View>
          );
        })}
      </View>
      {withBottomBorder && <Divider margin={`0 0 0 ${leftInset}`} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundAlt,
    borderColor: colors.midtone,
  },
});
