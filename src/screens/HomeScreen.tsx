import 'react-native-gesture-handler';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  SectionList,
  TouchableOpacity,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

import {RootStackParamList, RootStackRoutes} from '.';
import {AppState} from '../store';
import {MediaType} from '../store/log/slice';
import {useSelector} from 'react-redux';
import {colors, spacing, typography} from '../theme';
import {groupBy} from 'ramda';
import {format} from 'date-fns';
import {ListRow} from '../components/ListRow';

type Props = StackScreenProps<RootStackParamList, RootStackRoutes.Main>;

const HomeScreen = ({navigation}: Props) => {
  const groupedSections = useSelector((state: AppState) => {
    const entries = state.log.entries.allIds.map(
      (id) => state.log.entries.byId[id],
    );

    const sortedEntries = entries.sort((a, b) => {
      return (
        new Date(b.watchedTime).getTime() - new Date(a.watchedTime).getTime()
      );
    });

    const groupedEntries = groupBy((entry) => {
      return format(new Date(entry.watchedTime), 'MMMM yyyy');
    }, sortedEntries);

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
          <SectionList
            style={{height: '100%'}}
            sections={groupedSections}
            keyExtractor={(item) => item.id}
            renderItem={({item, index, section}) => {
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

              const isFirstOnDate =
                section.data.findIndex((i) => i.day === item.day) === index;

              return (
                <ListRow
                  title={
                    item.type === MediaType.TV && item.episodes
                      ? `${item.name} (${item.episodes})`
                      : item.name
                  }
                  description={mediaTypeDescriptionMap[item.type]}
                  prefix={
                    isFirstOnDate
                      ? format(new Date(item.watchedTime), 'dd')
                      : undefined
                  }
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
