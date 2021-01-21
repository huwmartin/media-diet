import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
  SectionList,
  TouchableOpacity,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {v4 as uuidv4} from 'react-native-uuid';

import {
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {RootStackParamList, RootStackRoutes} from '.';
import {AppState, useDispatch} from '../store';
import {actions, MediaType} from '../store/log/slice';
import {useSelector} from 'react-redux';
import {colors, spacing, typography} from '../theme';
import {groupBy} from 'ramda';
import {format} from 'date-fns';
import {ListRow} from '../components/ListRow';
import {List} from '../components/List';
import {ListLinkRow} from '../components/LinkListRow';

type Props = StackScreenProps<RootStackParamList, RootStackRoutes.Add>;

const ChooseMediaTypeScreen = ({navigation}: Props) => {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.background}
        translucent
      />
      <SafeAreaView>
        <ScrollView style={styles.body}>
          <List
            margin="m 0 0"
            title="What are you adding?"
            items={[
              {
                label: 'Movie',
                onPress: () =>
                  navigation.navigate(RootStackRoutes.Details, {
                    type: MediaType.Movie,
                  }),
              },
              {
                label: 'Short movie',
                onPress: () =>
                  navigation.navigate(RootStackRoutes.Details, {
                    type: MediaType.Short,
                  }),
              },
              {
                label: 'TV series',
                onPress: () =>
                  navigation.navigate(RootStackRoutes.Details, {
                    type: MediaType.TV,
                  }),
              },
              {
                label: 'Podcast',
                onPress: () =>
                  navigation.navigate(RootStackRoutes.Details, {
                    type: MediaType.Podcast,
                  }),
              },
              {
                label: 'Book',
                onPress: () =>
                  navigation.navigate(RootStackRoutes.Details, {
                    type: MediaType.Book,
                  }),
              },
              {
                label: 'Short story',
                onPress: () =>
                  navigation.navigate(RootStackRoutes.Details, {
                    type: MediaType.ShortStory,
                  }),
              },
              {
                label: 'Essay',
                onPress: () =>
                  navigation.navigate(RootStackRoutes.Details, {
                    type: MediaType.Essay,
                  }),
              },
              {
                label: 'Play',
                onPress: () =>
                  navigation.navigate(RootStackRoutes.Details, {
                    type: MediaType.Play,
                  }),
              },
              {
                label: 'Exhibition',
                onPress: () =>
                  navigation.navigate(RootStackRoutes.Details, {
                    type: MediaType.Exhibition,
                  }),
              },
            ]}
            keyExtractor={(item, index) => item.label + index}
            renderItem={(item, style) => {
              return (
                <ListLinkRow
                  style={style}
                  label={item.label}
                  onPress={item.onPress}
                />
              );
            }}
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: colors.backgroundAlt,
    height: '100%',
  },
  sectionHeader: {
    textTransform: 'uppercase',
    padding: spacing.m,
    color: '#737480',
    fontFamily: typography.family.mono,
    fontSize: 14,
    lineHeight: 20,
  },
  addButtonWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: '#595D80',
  },
  addButtonText: {
    textTransform: 'uppercase',
    color: colors.foreground,
    fontFamily: typography.family.expanded,
    fontSize: typography.size.text.m,
    lineHeight: typography.lineheight.body.m,
  },
});

export default ChooseMediaTypeScreen;
