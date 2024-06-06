import {Button, Section, Space, Text} from '@bsdaoquang/rncomponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import {TickCircle} from 'iconsax-react-native';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Container} from '../../components';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import {localDataNames} from '../../constants/localDataNames';
import {addAuth} from '../../redux/reducers/authReducer';
import {globalStyles} from '../../styles/globalStyles';
const Result = ({navigation, route}: any) => {
  const dispatch = useDispatch();
  const user = auth().currentUser;

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleSaveUser();
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  const handleSaveUser = async () => {
    if (user) {
      const data = {
        uid: user.uid,
        email: user.email ?? '',
        displayName: user.displayName ?? '',
        emailVerified: user.emailVerified,
        photoUrl: user.photoURL,
        creationTime: user.metadata.creationTime,
        lastSignInTime: user.metadata.lastSignInTime,
      };
      dispatch(addAuth(data));
      await AsyncStorage.setItem(localDataNames.auth, JSON.stringify(data));
    }
  };
  return (
    <Container isScroll={false}>
      <Section styles={[globalStyles.center, {flex: 1}]}>
        <TickCircle color={colors.success} size={50} />
        <Space height={20} />
        <Text
          text="Successfullly"
          font={fontFamilies.poppinsBold}
          size={20}
          weight={'800'}
        />
        <Text
          color={colors.gray2}
          textAlign="center"
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi nulla iste esse, velit assumenda fuga molestias voluptate quas libero. "
          font={fontFamilies.poppinsRegular}
          numberOfLine={2}
          size={14}
        />
      </Section>
      <Section>
        <Button
          onPress={handleSaveUser}
          title="Start Shooping"
          color={colors.dark}
          textStyleProps={{
            fontWeight: '700',
            fontFamily: fontFamilies.poppinsBold,
          }}
        />
      </Section>
    </Container>
  );
};

export default Result;
