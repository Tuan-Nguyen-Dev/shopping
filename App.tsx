import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import AuthNavigator from './src/routers/AuthNavigator';
import MainNavigator from './src/routers/MainNavigator';
import Splash from './src/screens/Splash';
import {firebase} from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isWellcome, setIsWellcome] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsWellcome(false);
    }, 1500);

    // tự động chuyển qua màn hình home khi đăng ký
    // auth().onAuthStateChanged(state =>
    //   setIsLogin(state ? (state?.uid ? true : false) : false),
    // );

    return () => clearTimeout(timeout);
  }, []);

  return (
    <NavigationContainer>
      {/* <MainNavigator /> */}
      {isWellcome ? <Splash /> : 1 > 2 ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default App;
