import {StyleSheet, Text, View, ScrollView, StatusBar} from 'react-native';
import CustomInput from '../../components/CustomInput';
import * as React from 'react';
import CustomButton from '../../components/CustomButtom';
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';

const EMAIL_REGEX =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const SignUpScreen = () => {
  const navigation = useNavigation();
  const {control, handleSubmit, watch} = useForm();

  const pwd = watch('password');

  const onRegisterPress = data => {
    console.log('Register');
    navigation.navigate('ConfirmEmail');
    console.log(data);
  };

  const onSignInWithFacebookPressed = () => {
    console.log('Sign In With Facebook');
  };

  const onSignInWithGooglePressed = () => {
    console.log('Sign In With Google');
  };

  const onSignInWithApplePressed = () => {
    console.log('Sign In With Apple');
  };

  const onTermsOfUsePressed = () => {
    console.log('Terms of Use');
  };

  const onPrivacyPolicyPressed = () => {
    console.log('Privacy Policy');
  };

  const onSignInPressed = () => {
    console.log('Sign In Pressed');

    navigation.navigate('SignIn');
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.container}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>Create Account</Text>
        </View>

        <CustomInput
          placeholder="Username"
          control={control}
          rules={{
            required: 'Username is required',
            minLength: {
              value: 3,
              message: 'Username should be at least 3 characters',
            },
            maxLength: {
              value: 24,
              message: 'Username must be at most 24 characters',
            },
          }}
          name="username"
        />

        <CustomInput
          placeholder="email"
          control={control}
          iconName="email"
          rules={{
            required: 'Email is required',
            pattern: {value: EMAIL_REGEX, message: 'Not A Valid Email Address'},
          }}
          name="email"
          password={false}
        />

        <CustomInput
          placeholder="Password"
          control={control}
          name="password"
          rules={{
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password should be minimum 6 characters',
            },
          }}
          iconName="form-textbox-password"
          password={true}
        />

        <CustomInput
          placeholder="Confirm Password"
          control={control}
          name="confirmpassword"
          iconName="form-textbox-password"
          rules={{
            validate: value => value === pwd || 'Passwords Do Not Match',
          }}
          password={true}
        />

        <CustomButton onPress={handleSubmit(onRegisterPress)} text="Register" />
        <View style={{width: '90%', marginTop: 10, marginBottom: 10}}>
          <Text style={{color: '#000', fontSize: 12}}>
            By registering, you confirm that you accept our{' '}
            <Text style={{color: '#E4D00A'}} onPress={onTermsOfUsePressed}>
              Terms of Use
            </Text>{' '}
            and{' '}
            <Text style={{color: '#E4D00A'}} onPress={onPrivacyPolicyPressed}>
              Privacy Policy
            </Text>
          </Text>
        </View>
        <CustomButton
          onPress={onSignInWithGooglePressed}
          text="Sign in with Google"
          type="GOOGLE"
        />
        <CustomButton
          onPress={onSignInWithFacebookPressed}
          text="Sign in with Facebook"
          type="FB"
        />
        <CustomButton
          onPress={onSignInWithApplePressed}
          text="Sign in with Apple"
          type="APPLE"
        />
        <CustomButton
          onPress={onSignInPressed}
          text="Have an Account? Sign In"
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  headerTextContainer: {
    paddingVertical: 30,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 30,
    color: '#0047AB',
    fontWeight: 'bold',
  },
});
