import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  StyleProp,
  ViewStyle,
  Text as RNText,
  TouchableOpacity,
  DatePickerAndroid,
  Platform,
  Text,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {colors, spacing, typography} from '../theme';
import {format} from 'date-fns';
import {calculateMargin} from '../utils/margin';
import Modal from 'react-native-modal';

interface Props<T> {
  label?: string;
  placeholder?: string;
  error?: string;
  margin?: string;
  date?: number;
  onDateSet: (value: number) => void;
  minDate?: Date;
  maxDate?: Date;
  useDefaultAge?: boolean;
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

export function DateInput<T>(props: Props<T>) {
  const [isOpen, setIsOpen] = useState(false);

  const [show, setShow] = useState(false);

  // DateTimePicker from react-native-community is rendered as JSX on Android as well as
  // iOS instead of being Promise-based, but does not properly dismiss when it is removed
  // from the 'markup' based on JS logic. This Promise-based version from react-native is
  // deprecated but dismisses properly. We should fix this.
  async function openAndroid() {
    try {
      const {
        action,
        year,
        month,
        day,
      }: {
        action: any;
        year?: number;
        month?: number;
        day?: number;
      } = await DatePickerAndroid.open({
        date: props.date,
        maxDate: props.maxDate ? props.maxDate : undefined,
        minDate: props.minDate ? props.minDate : undefined,
        mode: 'spinner',
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        if (year === undefined || month === undefined || day === undefined) {
          console.error('Invalid date selected');
          return;
        }
        const dateSelected = new Date(year, month, day);
        props.onDateSet(dateSelected.getTime());
        onClose();
      }
      if (action === DatePickerAndroid.dismissedAction) {
        onClose();
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }

  function onOpen() {
    if (Platform.OS === 'android') {
      openAndroid();
      return;
    }

    setShow(!show);
  }

  function onClose() {
    setShow(false);
    setIsOpen(false);
  }

  let displayValue;
  let showPlaceholder = false;

  if (props.date) {
    displayValue = format(props.date, 'dd/MM/yyyy');
  } else if (props.placeholder) {
    displayValue = props.placeholder;
    showPlaceholder = true;
  } else {
    displayValue = '   ';
  }

  return (
    <View style={calculateMargin(props.margin)}>
      {!!props.label && (
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
      )}
      <TouchableWithoutFeedback
        onPress={() => {
          setIsOpen(true);
          onOpen();
        }}>
        <View
          style={[styles.inputWrapper, getInputStyles(isOpen, !!props.error)]}>
          <View style={styles.inputContent}>
            <RNText
              style={[
                styles.inputValue,
                showPlaceholder && styles.placholderText,
              ]}>
              {displayValue}
            </RNText>
          </View>
        </View>
      </TouchableWithoutFeedback>

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

      <Modal
        style={{margin: 0, justifyContent: 'flex-end'}}
        isVisible={show}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        onSwipeComplete={() => onClose()}
        swipeDirection={['down']}
        backdropColor={colors.background}
        onBackdropPress={() => {
          onClose();
        }}>
        <View>
          <View
            style={{
              backgroundColor: colors.foreground,
              paddingTop: spacing.s,
              paddingBottom: spacing.s,
              paddingEnd: spacing.s,
              width: '100%',
            }}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                onClose();
              }}>
              <View style={{display: 'flex', alignSelf: 'flex-end'}}>
                <Text
                  style={{
                    fontFamily: typography.family.expanded,
                    textTransform: 'uppercase',

                    fontSize: typography.size.text.s,
                    lineHeight: typography.lineheight.body.s,
                    color: colors.background,
                  }}>
                  Done
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <DateTimePicker
            maximumDate={props.maxDate ? props.maxDate : undefined}
            minimumDate={props.minDate ? props.minDate : undefined}
            value={props.date ? new Date(props.date) : new Date()}
            mode="date"
            display="spinner"
            style={{
              width: '100%',
              backgroundColor: colors.foreground,
            }}
            onChange={(event, selectedDate) => {
              const defaultDate = props.date
                ? new Date(props.date)
                : new Date();
              const currentDate = selectedDate || defaultDate;

              props.onDateSet(currentDate.getTime());
            }}
          />
        </View>
      </Modal>
    </View>
  );
}

const borderWidth = 2;
const horizontalPadding = 12;

const styles = StyleSheet.create({
  inputWrapper: {
    borderWidth: borderWidth,
    position: 'relative',
    borderRadius: 4,
    paddingVertical: spacing.s - borderWidth,
    paddingHorizontal: horizontalPadding - borderWidth,
    backgroundColor: colors.backgroundAlt,
    display: 'flex',
    flexDirection: 'row',
  },
  inputValue: {
    fontFamily: typography.family.body,
    fontSize: 16,
    lineHeight: 18,
    paddingVertical: 16,
    paddingHorizontal: 6,
    color: colors.foreground,
  },
  placholderText: {
    color: colors.foreground,
  },
  errorMessage: {
    paddingLeft: horizontalPadding,
    paddingTop: spacing.s,
  },
  inputContent: {
    flexGrow: 1,
  },
});
