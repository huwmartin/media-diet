import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
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
import {TextInput} from '../components/TextInput';

type Props = StackScreenProps<RootStackParamList, RootStackRoutes.Details>;

const AddDetailsScreen = ({navigation, route}: Props) => {
  const type = route.params && route.params.type;

  const [name, setName] = useState('');

  const dispatch = useDispatch();

  let verbage;
  switch (type) {
    case MediaType.Short:
    case MediaType.TV:
    case MediaType.Movie:
      verbage = 'watch';
      break;
    case MediaType.Book:
    case MediaType.ShortStory:
    case MediaType.Essay:
      verbage = 'read';
      break;
    case MediaType.Podcast:
      verbage = 'listen to';
      break;
    case MediaType.Play:
    case MediaType.Exhibition:
      verbage = 'see';
      break;
  }

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.background}
        translucent
      />
      <SafeAreaView>
        <View style={styles.body}>
          <ScrollView>
            <TextInput
              label={`What did you ${verbage}?`}
              value={name}
              onChange={(value) => setName(value)}
            />

            <Text
              style={{
                color: colors.midtone,
                fontFamily: typography.family.body,
                fontSize: typography.size.text.m,
                lineHeight: typography.lineheight.body.m,
                marginBottom: spacing.s,
                marginTop: spacing.xl,
              }}>{`When did you ${verbage} it?`}</Text>
            <View style={styles.optionsWrapper}></View>
          </ScrollView>
          <View style={styles.addButtonWrapper}>
            <TouchableOpacity
              onPress={() => {
                dispatch(
                  actions.logEntry({
                    id: uuidv4(),
                    name: name,
                    type,
                    watchedTime: new Date(),
                  }),
                );

                navigation.navigate(RootStackRoutes.Main);
              }}
              style={styles.addButton}
              accessibilityLabel="Done">
              <Text style={styles.addButtonText}>Dne</Text>
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
    height: '100%',
    paddingTop: spacing.l,
    paddingHorizontal: spacing.m,
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
  optionsWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default AddDetailsScreen;
