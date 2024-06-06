import {
  Button,
  Input,
  Row,
  Section,
  Space,
  Text,
} from '@bsdaoquang/rncomponent';
import {TickCircle, TickSquare} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {Image, Platform, ScrollView} from 'react-native';
import {Container} from '../../components';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import {Auth} from '../../utils/handleAuthen';
import auth, {firebase} from '@react-native-firebase/auth';
const initState = {
  username: '',
  email: '',
  password: '',
  confirm: '',
};
const SignUp = ({navigation}: any) => {
  const [registerForm, setRegisterForm] = useState(initState);
  const [isDisable, setIsDisable] = useState(true);
  const [errorText, setErrorText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const {email, password, confirm} = registerForm;
    if (password && confirm) {
      setErrorText(password !== confirm ? 'Password is not match!!' : '');
    }

    setIsDisable(false);
  }, [registerForm]);

  const handleChangeForm = (val: string, key: string) => {
    const items: any = {...registerForm};

    if (val && key) {
      items[`${key}`] = val;

      setRegisterForm(items);
    } else {
      console.log('Missing values');
    }
  };
  const createNewAccount = async () => {
    setIsLoading(true);
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        registerForm.email,
        registerForm.password,
      );

      const user = userCredential.user;

      if (user) {
        if (registerForm.username) {
          await user.updateProfile({
            displayName: registerForm.username,
          });
        }
        await Auth.CreateProfile();
        navigation.navigate('Result');
      }
      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
      setErrorText(error.message);
      setIsLoading(false);
    }
  };
  const renderButtonRegister = () => {
    return (
      <Button
        loading={isLoading}
        disable={isDisable}
        isShadow={false}
        title="Sign Up"
        textStyleProps={{fontFamily: fontFamilies.poppinsBold}}
        color={colors.dark}
        inline
        onPress={createNewAccount}
      />
    );
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
        <Text
          text="Sign Up"
          size={Platform.OS === 'ios' ? 20 : 18}
          font={fontFamilies.poppinsBold}
        />
        <Text text="Create an new account" color={colors.description} />
      </Section>
      <ScrollView>
        <Section>
          <Input
            required
            helpText="Please enter your email address"
            label="User Name"
            value={registerForm.username}
            radius={0}
            color="transparent"
            bordered={false}
            clear
            styles={{borderBottomColor: colors.dark, borderBottomWidth: 1}}
            placeholder="User name"
            onChange={val => handleChangeForm(val, 'username')}
          />

          <Input
            required
            helpText="Please enter your email address"
            label="Email"
            value={registerForm.email}
            radius={0}
            keyboardType="email-address"
            color="transparent"
            bordered={false}
            clear
            styles={{borderBottomColor: colors.dark, borderBottomWidth: 1}}
            placeholder="abc@gmail.com"
            onChange={val => handleChangeForm(val, 'email')}
            affix={
              registerForm.email &&
              registerForm.email.includes('@') &&
              registerForm.email.includes('.') ? (
                <TickCircle variant="Bold" size={20} color={colors.dark} />
              ) : null
            }
          />
          <Input
            label="Password"
            value={registerForm.password}
            radius={0}
            color="transparent"
            bordered={false}
            password
            styles={{borderBottomColor: colors.dark, borderBottomWidth: 1}}
            placeholder="password"
            onChange={val => handleChangeForm(val, 'password')}
          />
          <Input
            label="Confirm Password"
            value={registerForm.confirm}
            radius={0}
            color="transparent"
            bordered={false}
            password
            styles={{borderBottomColor: colors.dark, borderBottomWidth: 1}}
            placeholder="Confirm"
            onChange={val => handleChangeForm(val, 'confirm')}
          />
        </Section>

        {errorText && (
          <Section>
            <Text text={errorText} color={colors.dange} />
          </Section>
        )}
        <Section>
          <Row alignItems="flex-start">
            <TickSquare size={20} variant="Bold" color={colors.description} />
            <Space width={8} />
            <Text
              text="By create an acount, you have agree with out term & condication"
              color={colors.description}
            />
          </Row>
        </Section>
        <Section>{renderButtonRegister()}</Section>
        <Row styles={{paddingHorizontal: 16, marginBottom: 16}}>
          <Text text="You have not account? " />
          <Button
            inline
            onPress={() => navigation.navigate('Login')}
            type="link"
            title="Login "
          />
        </Row>
      </ScrollView>
    </Container>
  );
};

export default SignUp;
