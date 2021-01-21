import 'react-native-gesture-handler';
import React, { useState } from 'react';
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
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { v4 as uuidv4 } from 'react-native-uuid';

import {
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { RootStackParamList, RootStackRoutes } from '.';
import { AppState, useDispatch } from '../store';
import { actions, MediaType } from '../store/log/slice';
import { useSelector } from 'react-redux';
import { colors, spacing, typography } from '../theme';
import { groupBy } from "ramda";
import { format } from 'date-fns';
import { ListRow } from '../components/ListRow';

type Props = StackScreenProps<RootStackParamList, RootStackRoutes.Home>;

const HomeScreen = ({ navigation }: Props) => {
  // const [value, setValue] = useState("");

  // const dispatch = useDispatch();

  const groupedSections = useSelector((state: AppState) => {
    const entries = state.log.entries.allIds.map(id => state.log.entries.byId[id]);

    const groupedEntries = groupBy(entry => {
      return format(new Date(entry.watchedTime), "MMMM yyyy")
    }, entries);

    const sections = Object.keys(groupedEntries).map(title => ({
      title,
      data: groupedEntries[title],
    }))

    return sections;
  });

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.background}
        translucent
      />
      <SafeAreaView>
          <View style={styles.body}>
          {/* <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
              onChangeText={value => setValue(value)}
              value={value}
            />

            <Button
              onPress={() => dispatch(actions.logEntry({
                id: uuidv4(),
                name: value,
                type: MediaType.Book,
                watchedTime: new Date()
              }))}
              title="Add"
            /> */}
            <SectionList
              style={{ height: "100%" }}
              sections={groupedSections}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => {
                const mediaTypeDescriptionMap = {
                  [MediaType.Movie]: "Movie",
                  [MediaType.TV]: "TV series",
                  [MediaType.Book]: "Book",
                  [MediaType.Short]: "Short",
                  [MediaType.Play]: "Play",
                  [MediaType.ShortStory]: "Short story,"
                };

                return (
                  <ListRow
                    title={item.name}
                    description={mediaTypeDescriptionMap[item.type]}
                    // prefix={format(new Date(item.watchedTime), "dd")}
                    prefix="04"
                  />
                )
              }}
              renderSectionHeader={({ section: { title } }) => (
                <Text style={styles.sectionHeader}>{title}</Text>
              )}
            />
          </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
    body: {
      backgroundColor: colors.backgroundAlt,
    },
    sectionHeader: {
      textTransform: "uppercase",
      padding: spacing.m,
      color: "#737480",
      fontFamily: typography.family.mono,
      fontSize: 14,
      lineHeight: 20,
    }
});

export default HomeScreen;