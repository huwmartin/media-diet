import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from "react-redux";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './store';

import { RootStackRoutes, RootStackParamList } from "./screens"
import HomeScreen from './screens/HomeScreen';

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Stack.Navigator initialRouteName={RootStackRoutes.Home}>
            <Stack.Screen name={RootStackRoutes.Home} component={HomeScreen} />
          </Stack.Navigator>
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
};

export default App;