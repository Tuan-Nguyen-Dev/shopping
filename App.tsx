import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import AuthNavigator from './src/routers/AuthNavigator';
import MainNavigator from './src/routers/MainNavigator';
import Splash from './src/screens/Splash';
import {firebase} from '@react-native-firebase/auth';

const App = () => {
  const [isLoging, setIsLoging] = useState(false);
  const [isWellcome, setIsWellcome] = useState(true);
  // const firebaseConfig = {
  //   apiKey: 'AIzaSyDzq0B1Cby8N_pqsyYis4vESRFx7woJeV4',
  //   authDomain: 'ecommerce-app-9c4f2.firebaseapp.com',
  //   projectId: 'ecommerce-app-9c4f2',
  //   storageBucket: 'ecommerce-app-9c4f2.appspot.com',
  //   messagingSenderId: '321857551049',
  //   appId: '1:321857551049:web:692e860c9b01cbf8816b18',
  // };

  // firebase
  //   .initializeApp(firebaseConfig)
  //   .then(() => {})
  //   .catch(() => {});
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsWellcome(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <NavigationContainer>
      {/* <MainNavigator /> */}
      {isWellcome ? (
        <Splash />
      ) : isLoging ? (
        <MainNavigator />
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
};

export default App;
