import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaView, StyleSheet, ScrollView, StatusBar} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

import {RootStackParamList, RootStackRoutes} from '.';
import {MediaType} from '../store/log/slice';
import {colors, spacing, typography} from '../theme';
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
});

export default ChooseMediaTypeScreen;
