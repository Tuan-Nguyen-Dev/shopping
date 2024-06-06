import React, {useEffect, useState} from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {addAuth, authSelector} from '../redux/reducers/authReducer';
import Splash from '../screens/Splash';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {localDataNames} from '../constants/localDataNames';
const Router = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isWellcome, setIsWellcome] = useState(true);

  const dispatch = useDispatch();
  const user = useSelector(authSelector);

  useEffect(() => {
    getInitData();
    // const timeout = setTimeout(() => {
    //   setIsWellcome(false);
    // }, 1500);

    // // tự động chuyển qua màn hình home khi đăng ký
    // // auth().onAuthStateChanged(state =>
    // //   setIsLogin(state ? (state?.uid ? true : false) : false),
    // // );

    // return () => clearTimeout(timeout);
  }, []);

  const getInitData = async () => {
    await getAuthData();
    setIsWellcome(false);
  };

  const getAuthData = async () => {
    const res = await AsyncStorage.getItem(localDataNames.auth);

    if (res) {
      dispatch(addAuth(JSON.parse(res)));
    }
  };

  return isWellcome ? (
    <Splash />
  ) : user.uid ? (
    <MainNavigator />
  ) : (
    <AuthNavigator />
  );
};

export default Router;
