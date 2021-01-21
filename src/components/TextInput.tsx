import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TextInput as RNTextInput,
  TouchableWithoutFeedback,
  ViewStyle,
  StyleProp,
  Animated,
  TextStyle,
  TextInputProps,
  Text,
} from 'react-native';
import {colors, spacing, typography} from '../theme';
import {calculateMargin} from '../utils/margin';

interface Props {
  value: string;
  label: string;
  placeholder?: string;
  error?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  margin?: string;
  inputProps?: TextInputProps;
  isMultiline?: boolean;
}

function getInputStyles(isFocused: boolean, isErroring: boolean) {
  const result: StyleProp<ViewStyle> = {
    borderColor: colors.midtone,
  };

  if (isErroring) {
    result.borderColor = colors.error;
  } else if (isFocused) {
    result.borderColor = colors.foreground;
  }

  return result;
}

function getFocusRingStyles(isFocused: boolean, isErroring: boolean) {
  const result: StyleProp<ViewStyle> = {
    borderColor: 'transparent',
    borderRadius: 8,
    borderWidth: 2,
    margin: -4,
  };

  if (isFocused) {
    result.borderColor = isErroring ? colors.error : colors.foreground;
  }

  return result;
}

export const TextInput = (props: Props) => {
  const [isFocused, setFocused] = useState(false);
  const inputRef = useRef<RNTextInput>(null);

  function focusInput() {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.focus();
  }

  function onFocus() {
    setFocused(true);
  }

  function onBlur() {
    if (props.onBlur) {
      props.onBlur();
    }

    setFocused(false);
  }

  return (
    <>
      <Text
        style={{
          color: colors.midtone,
          fontFamily: typography.family.body,
          fontSize: typography.size.text.m,
          lineHeight: typography.lineheight.body.m,
          marginBottom: spacing.s,
        }}>
        {props.label}
      </Text>
      <TouchableWithoutFeedback onPress={focusInput}>
        <View style={calculateMargin(props.margin)}>
          <View
            style={[
              styles.inputWrapper,
              getInputStyles(isFocused, !!props.error),
            ]}>
            <View
              style={[
                styles.inputContent,
                {height: props.isMultiline ? 150 : undefined},
              ]}>
              <RNTextInput
                textAlignVertical="top"
                multiline={props.isMultiline}
                numberOfLines={props.isMultiline ? 20 : undefined}
                ref={inputRef}
                value={props.value}
                onFocus={onFocus}
                placeholder={props.placeholder}
                onBlur={onBlur}
                style={styles.input}
                placeholderTextColor={colors.midtone}
                onChangeText={props.onChange}
                returnKeyType={
                  props.inputProps &&
                  (props.inputProps.keyboardType === 'number-pad' ||
                    props.inputProps.keyboardType === 'numeric')
                    ? 'done'
                    : 'default'
                }
                {...(props.inputProps || {})}
              />
            </View>
          </View>
          {props.error ? (
            <View style={styles.errorMessage}>
              <Text
                style={{
                  color: colors.error,
                  fontFamily: typography.family.body,
                  fontSize: typography.size.text.m,
                  lineHeight: typography.lineheight.body.m,
                }}>
                {props.error}
              </Text>
            </View>
          ) : null}
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const borderWidth = 2;
const horizontalPadding = 12;

const styles = StyleSheet.create({
  inputWrapper: {
    borderWidth: borderWidth,
    borderRadius: 4,
    backgroundColor: colors.backgroundAlt,
  },
  input: {
    flexShrink: 1,
    fontFamily: typography.family.body,
    fontSize: 16,
    lineHeight: 18,
    padding: 16,
    color: colors.foreground,
  },
  inputContent: {
    flexGrow: 1,
  },
  errorMessage: {
    paddingLeft: horizontalPadding,
    paddingTop: spacing.s,
  },
});
