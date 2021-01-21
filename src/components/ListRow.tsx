import React from 'react';
import {StyleProp, ViewStyle, View, StyleSheet, Text} from 'react-native';
import {spacing, typography} from '../theme';

interface Props {
  title?: string;
  description?: string;
  prefix?: string;
  children?: React.ReactNode;
}

export const ListRow = ({title, description, prefix, children}: Props) => {
  const containerStyle = StyleSheet.flatten([styles.container]);
  return (
    <View style={containerStyle}>
      <View>
        {/* 
            Monospace font so we can be cheeky and just render
            two blank spaces for rows where we don't include a
            prefix to get the alignment right 😈
        */}
        {<Text style={styles.prefix}>{prefix || '  '}</Text>}
      </View>
      <View style={styles.fill}>
        {!!title && <Text style={styles.title}>{title}</Text>}
        {!!description ? (
          <Text style={styles.description}>{description}</Text>
        ) : null}
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: spacing.m,
  },
  prefix: {
    color: '#737480',
    fontFamily: typography.family.mono,
    fontSize: typography.size.text.m,
    lineHeight: typography.lineheight.body.m,
    marginRight: spacing.s,
  },
  title: {
    color: '#FFFFFF',
    fontFamily: typography.family.body,
    fontSize: typography.size.text.m,
    lineHeight: typography.lineheight.body.m,
  },
  description: {
    color: '#737480',
    fontFamily: typography.family.body,
    fontSize: 14,
    lineHeight: 20,
  },
  fill: {
    flex: 1,
  },
});
