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
import {MainStackRoutes, RootStackParamList, RootStackRoutes} from '.';
import {AppState, useDispatch} from '../store';
import {actions, MediaType} from '../store/log/slice';
import {useSelector} from 'react-redux';
import {colors, spacing, typography} from '../theme';
import {groupBy} from 'ramda';
import {format} from 'date-fns';
import {ListRow} from '../components/ListRow';

type Props = StackScreenProps<RootStackParamList, RootStackRoutes.Main>;

const HomeScreen = ({navigation}: Props) => {
  // const [value, setValue] = useState("");

  // const dispatch = useDispatch();

  const groupedSections = useSelector((state: AppState) => {
    const entries = state.log.entries.allIds.map(
      (id) => state.log.entries.byId[id],
    );

    const groupedEntries = groupBy((entry) => {
      return format(new Date(entry.watchedTime), 'MMMM yyyy');
    }, entries);

    const sections = Object.keys(groupedEntries).map((title) => ({
      title,
      data: groupedEntries[title],
    }));

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
            style={{height: '100%'}}
            sections={groupedSections}
            keyExtractor={(item) => item.id}
            renderItem={({item, index}) => {
              const mediaTypeDescriptionMap = {
                [MediaType.Movie]: 'Movie',
                [MediaType.TV]: 'TV series',
                [MediaType.Book]: 'Book',
                [MediaType.Short]: 'Short',
                [MediaType.Play]: 'Play',
                [MediaType.ShortStory]: 'Short story',
                [MediaType.Podcast]: 'Podcast',
                [MediaType.Essay]: 'Essay',
                [MediaType.Exhibition]: 'Exhibition',
              };

              return (
                <ListRow
                  title={item.name}
                  description={mediaTypeDescriptionMap[item.type]}
                  prefix={
                    index === 0
                      ? format(new Date(item.watchedTime), 'dd')
                      : undefined
                  }
                  // prefix="04"
                />
              );
            }}
            renderSectionHeader={({section: {title}}) => (
              <Text style={styles.sectionHeader}>{title}</Text>
            )}
          />
          <View style={styles.addButtonWrapper}>
            <TouchableOpacity
              onPress={() => navigation.navigate(RootStackRoutes.Add)}
              style={styles.addButton}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: colors.backgroundAlt,
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

export default HomeScreen;
