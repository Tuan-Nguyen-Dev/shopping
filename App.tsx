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
import {StatusBar} from 'react-native';
const App = () => {
  return (
    <NavigationContainer>
      {/* <StatusBar translucent backgroundColor="transparent" /> */}
      <Provider store={store}>
        <Router />
      </Provider>
    </NavigationContainer>
  );
};

export default App;
