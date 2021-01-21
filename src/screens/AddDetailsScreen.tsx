import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {v4 as uuidv4} from 'react-native-uuid';

import {RootStackParamList, RootStackRoutes} from '.';
import {useDispatch} from '../store';
import {actions, MediaType} from '../store/log/slice';
import {colors, spacing, typography} from '../theme';
import {startOfYesterday} from 'date-fns';
import {TextInput} from '../components/TextInput';
import {Radio} from '../components/Radio';
import {DateInput} from '../components/DateInput';

type Props = StackScreenProps<RootStackParamList, RootStackRoutes.Details>;

const AddDetailsScreen = ({navigation, route}: Props) => {
  const type = route.params && route.params.type;

  const [name, setName] = useState('');
  const [when, setWhen] = useState('');
  const [episodeCount, setEpisodeCount] = useState('');
  const [date, setDate] = useState(new Date().getTime());

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

            {type === MediaType.TV && (
              <TextInput
                margin="xl 0 0"
                label="How many episodes did you watch?"
                value={episodeCount}
                onChange={(value) => setEpisodeCount(value)}
                inputProps={{
                  keyboardType: 'number-pad',
                }}
              />
            )}

            <Text
              style={{
                color: colors.midtone,
                fontFamily: typography.family.body,
                fontSize: typography.size.text.m,
                lineHeight: typography.lineheight.body.m,
                marginBottom: spacing.s,
                marginTop: spacing.xl,
              }}>{`When did you ${verbage} it?`}</Text>
            <View style={styles.optionsWrapper}>
              <Radio
                margin="0 s 0 0"
                label="Today"
                value="today"
                checked={when === 'today'}
                onPress={(value) => setWhen(value)}
              />

              <Radio
                margin="0 s 0 0"
                label="Yesterday"
                value="yesterday"
                checked={when === 'yesterday'}
                onPress={(value) => setWhen(value)}
              />

              <Radio
                label="Other"
                value="other"
                checked={when === 'other'}
                onPress={(value) => setWhen(value)}
              />
            </View>

            {when === 'other' && (
              <DateInput
                margin="s 0 0"
                date={date}
                onDateSet={(value) => setDate(value)}
                maxDate={new Date()}
              />
            )}
          </ScrollView>
          <View style={styles.addButtonWrapper}>
            <TouchableOpacity
              onPress={() => {
                let watchedTime = new Date();

                if (when === 'yesterday') {
                  watchedTime = startOfYesterday();
                } else if (when === 'other') {
                  watchedTime = new Date(date);
                }

                dispatch(
                  actions.logEntry({
                    id: uuidv4(),
                    name: name,
                    type,
                    watchedTime,
                    ...(type === MediaType.TV && episodeCount
                      ? {episodes: Number(episodeCount)}
                      : {}),
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
