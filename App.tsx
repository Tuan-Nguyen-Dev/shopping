import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import AuthNavigator from './src/routers/AuthNavigator';
import MainNavigator from './src/routers/MainNavigator';
import Splash from './src/screens/Splash';
import {firebase} from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import {Provider} from 'react-redux';
import Router from './src/routers/Router';
import store from './src/redux/store';
const App = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Router />
      </Provider>
    </NavigationContainer>
  );
};

export default App;
