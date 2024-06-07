import {Button, Input, Row, Section, Text} from '@bsdaoquang/rncomponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import {TickCircle} from 'iconsax-react-native';
import React, {useState} from 'react';
import {Image, ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import {Container} from '../../components';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import {localDataNames} from '../../constants/localDataNames';
import {addAuth} from '../../redux/reducers/authReducer';
import {Auth} from '../../utils/handleAuthen';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
GoogleSignin.configure({
  webClientId:
    '914730098133-71g2tfb4livrl90mi81tqlrgjahitg7t.apps.googleusercontent.com',
});
const Login = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      auth().signInWithCredential(googleCredential);
      console.log('User signed in successfully');
    } catch (error) {
      console.log(error);
    }
  }
  const handleLoginWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.hasPlayServices();
      console.log(userInfo);
    } catch (error) {
      console.log('error>>>', error);
    }
  };

  const handleLogin = async () => {
    if (email && password) {
      setIsLoading(true);
      try {
        const userCredential = await auth().signInWithEmailAndPassword(
          email,
          password,
        );
        const user = userCredential.user;

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
          await Auth.UpdateProfile(user);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('Missing email or password');
    }
  };

  return (
    <Container isScroll={false}>
      <Section>
        <Row styles={{paddingVertical: 20, paddingTop: 30}}>
          <Image
            source={require('../../assets/logo.png')}
            style={{width: 150, height: 150, resizeMode: 'contain'}}
          />
        </Row>
      </Section>
      <Section>
        <Text text="Welcome!" size={20} font={fontFamilies.poppinsBold} />
        <Text
          text="please login or sign up to continue our app!"
          color={colors.description}
        />
      </Section>
      <ScrollView>
        <Section>
          <Input
            required
            helpText="Please enter your email address"
            label="Email"
            value={email}
            radius={0}
            color="transparent"
            keyboardType="email-address"
            bordered={false}
            clear
            styles={{
              borderBottomColor: colors.dark,
              borderBottomWidth: 1,
              paddingHorizontal: 0,
            }}
            placeholder="abc@gmail.com"
            onChange={val => setEmail(val)}
            affix={
              email && email.includes('@') && email.includes('.') ? (
                <TickCircle variant="Bold" size={20} color={colors.dark} />
              ) : null
            }
          />
          <Input
            label="Password"
            value={password}
            radius={0}
            color="transparent"
            bordered={false}
            password
            styles={{
              borderBottomColor: colors.dark,
              borderBottomWidth: 1,
              paddingHorizontal: 0,
            }}
            placeholder="********"
            onChange={val => setPassword(val)}
          />
        </Section>

        <Row
          justifyContent="flex-end"
          styles={{paddingHorizontal: 16, marginBottom: 16}}>
          <Button
            title="Forgot Password"
            inline
            type="link"
            onPress={() => {}}
          />
        </Row>
        <Section>
          <Button
            loading={isLoading}
            inline
            title="Login"
            color={colors.dark}
            onPress={handleLogin}
          />
        </Section>
        <Row styles={{paddingHorizontal: 16, marginBottom: 16}}>
          <Text text="You have not account? " />
          <Button
            inline
            onPress={() => navigation.navigate('SignUp')}
            type="link"
            title="Sign Up? "
          />
        </Row>
        <GoogleSigninButton onPress={onGoogleButtonPress} />
        <Section>
          <Button
            icon={
              <Ionicons name="logo-facebook" size={18} color={colors.white} />
            }
            color={colors.primary}
            title="Continue with Facebook"
            textStyleProps={{fontFamily: fontFamilies.poppinsMedium}}
            onPress={handleLogin}
          />
        </Section>
        <Section>
          <Button
            icon={<Ionicons name="logo-google" size={18} color={colors.dark} />}
            title="Continue with Google"
            textStyleProps={{fontFamily: fontFamilies.poppinsMedium}}
            onPress={handleLoginWithGoogle}
          />
        </Section>
        <Section>
          <Button
            icon={<Ionicons name="logo-apple" size={18} color={colors.dark} />}
            title="Continue with Apple"
            textStyleProps={{fontFamily: fontFamilies.poppinsMedium}}
            onPress={handleLogin}
          />
        </Section>
      </ScrollView>
    </Container>
  );
};

export default Login;
