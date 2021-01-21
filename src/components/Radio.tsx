import * as React from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  TouchableNativeFeedback,
  Text,
  Platform,
} from 'react-native';
import {colors, spacing, typography} from '../theme';
import {calculateMargin} from '../utils/margin';

interface Props {
  label: string;
  onPress: (value: string) => void;
  value: string;
  checked: boolean;
  margin?: string;
}

export const Radio = ({checked, ...props}: Props) => {
  const margin = calculateMargin(props.margin);

  let textColor = colors.midtone;
  let backgroundColor = colors.backgroundAlt;
  let underlayColor = colors.background;

  if (checked) {
    (textColor = colors.foreground), (backgroundColor = colors.midtone);
    underlayColor = colors.foregroundAlt;
  }

  const onPress = () => {
    props.onPress(props.value);
  };

  const content = (
    <View style={[styles.textWrapper]}>
      <View>
        <Text
          style={{
            color: textColor,
            fontFamily: typography.family.body,
            fontSize: typography.size.text.m,
            lineHeight: typography.lineheight.body.m,
          }}>
          {props.label}
        </Text>
      </View>
    </View>
  );

  if (Platform.OS === 'android') {
    return (
      <TouchableNativeFeedback onPress={() => onPress()}>
        <View style={[styles.wrapper, {backgroundColor}, margin]}>
          {content}
        </View>
      </TouchableNativeFeedback>
    );
  }

  return (
    <TouchableHighlight
      onPress={() => onPress()}
      underlayColor={underlayColor}
      style={[styles.wrapper, {backgroundColor}, margin]}>
      {content}
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexBasis: 0,
    flexGrow: 1,
    position: 'relative',
    paddingVertical: 12,
    paddingHorizontal: spacing.m,
    borderRadius: 4,
    borderColor: colors.midtone,
    borderWidth: 2,
  },
  textWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
