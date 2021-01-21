import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {PersistGate} from 'redux-persist/integration/react';

import {store, persistor} from './store';

import {
  RootStackRoutes,
  RootStackParamList,
  MainStackRoutes,
  MainStackParamList,
} from './screens';
import HomeScreen from './screens/HomeScreen';
import {colors, typography} from './theme';
import ChooseMediaTypeScreen from './screens/ChooseMediaTypeScreen';
import AddDetailsScreen from './screens/AddDetailsScreen';

const RootStack = createStackNavigator<RootStackParamList>();
const MainStack = createStackNavigator<MainStackParamList>();

const MainStackScreen = () => {
  return (
    <MainStack.Navigator initialRouteName={MainStackRoutes.Home}>
      <MainStack.Screen
        name={MainStackRoutes.Home}
        component={HomeScreen}
        options={{
          title: 'Media Diet',
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTitleAlign: 'left',
          headerTitleStyle: {
            textTransform: 'uppercase',
            fontFamily: typography.family.expanded,
            fontSize: 34,
            lineHeight: 41,
            color: colors.foreground,
          },
        }}
      />
    </MainStack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RootStack.Navigator initialRouteName={RootStackRoutes.Main}>
            <RootStack.Screen
              name={RootStackRoutes.Main}
              component={MainStackScreen}
              options={{headerShown: false}}
            />

            <RootStack.Screen
              name={RootStackRoutes.Add}
              component={ChooseMediaTypeScreen}
              options={{
                title: 'Add',
                headerStyle: {
                  backgroundColor: colors.background,
                },
                headerTintColor: colors.foreground,
                headerTitleStyle: {
                  textTransform: 'uppercase',
                  fontFamily: typography.family.expanded,
                  fontSize: 17,
                  lineHeight: 22,
                  color: colors.foreground,
                },
                headerBackTitle: 'Back',
                headerBackTitleStyle: {
                  textTransform: 'uppercase',
                  fontFamily: typography.family.expanded,
                  fontSize: typography.size.text.m,
                  lineHeight: typography.lineheight.body.m,
                  color: colors.foreground,
                },
              }}
            />

            <RootStack.Screen
              name={RootStackRoutes.Details}
              component={AddDetailsScreen}
              options={{
                title: 'Details',
                headerStyle: {
                  backgroundColor: colors.background,
                },
                headerTintColor: colors.foreground,
                headerTitleStyle: {
                  textTransform: 'uppercase',
                  fontFamily: typography.family.expanded,
                  fontSize: 17,
                  lineHeight: 22,
                  color: colors.foreground,
                },
                headerBackTitleStyle: {
                  textTransform: 'uppercase',
                  fontFamily: typography.family.expanded,
                  fontSize: typography.size.text.m,
                  lineHeight: typography.lineheight.body.m,
                  color: colors.foreground,
                },
              }}
            />
          </RootStack.Navigator>
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
