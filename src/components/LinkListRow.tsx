import * as React from 'react';
import {
  View,
  ViewStyle,
  StyleProp,
  TouchableNativeFeedback,
  Platform,
  Text,
} from 'react-native';
import {TouchableHighlight} from 'react-native';
import {colors, spacing, typography} from '../theme';
import RightArrow from './svgs/RightArrow';

export interface Props {
  label: string;
  onPress: () => void;
  style: StyleProp<ViewStyle>;

  // Variant:
  // "stack" renders a right-arrow to show the screen you are linking
  // to will push from the right. "modal" will instead render a blue link
  // so you know that it will open a modal (or take you elsewhere).
  variant?: 'stack' | 'modal';
}

export function ListLinkRow({variant = 'stack', label, onPress, style}: Props) {
  const content = (
    <View
      style={[
        {
          paddingVertical: spacing.m,
          paddingRight: spacing.m,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        },
        style,
      ]}>
      <View style={{flexGrow: 1, paddingRight: spacing.m}}>
        <Text
          style={{
            color: colors.foreground,
            fontFamily: typography.family.body,
            fontSize: typography.size.text.m,
            lineHeight: typography.lineheight.body.m,
          }}>
          {label}
        </Text>
      </View>
      {variant === 'stack' ? <RightArrow /> : null}
    </View>
  );

  if (Platform.OS === 'android') {
    return (
      <TouchableNativeFeedback onPress={onPress}>
        {content}
      </TouchableNativeFeedback>
    );
  }

  return (
    <TouchableHighlight
      onPress={onPress}
      activeOpacity={0.9}
      underlayColor={colors.midtone}>
      {content}
    </TouchableHighlight>
  );
}
