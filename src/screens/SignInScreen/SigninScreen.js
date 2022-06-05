import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
} from 'react-native';
import * as React from 'react';
import Logo from '../../../assets/images/logo.png';
import CustomInput from '../../components/CustomInput';
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButtom from '../../components/CustomButtom';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {Auth, Amplify} from 'aws-amplify';
import awsconfig from '../../aws-exports';

Amplify.configure(awsconfig);

const SigninScreen = props => {
  const {height} = useWindowDimensions();

  const navigation = useNavigation();

  const {control, handleSubmit, watch} = useForm();
  const [loading, setLoading] = React.useState(false);
  const [userConfirmed, setUserConfirmed] = React.useState(true);
  const username = watch('username');

  const onForgotPasswordPressed = () => {
    console.log('Forgot Password');
    navigation.navigate('ForgotPassword');
  };
  const userNotConfirmed = () => {
    return (
      <View style={{marginTop: 20}}>
        <Text style={{color: 'red'}}>
          User is not verified yet!{' '}
          <TouchableOpacity
            onPress={() => navigation.navigate('ConfirmEmail', {username})}>
            <Text style={{color: 'blue'}}>
              Do you want to complete the verification now?
            </Text>
          </TouchableOpacity>
        </Text>
      </View>
    );
  };
  const onSignInPressed = async data => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const response = await Auth.signIn(data.username, data.password);

      navigation.navigate('Home');
    } catch (err) {
      if ((err.name = 'UserNotConfirmedException')) {
        console.log(err.message);
        if (err.message == 'Incorrect username or password.') {
          Alert.alert('oops', err.message);
          setUserConfirmed(true);
        }
        if (err.message == 'User is not confirmed.') {
          setUserConfirmed(false);
          Alert.alert('oops', err.message);
        } else {
          setUserConfirmed(true);
          Alert.alert('oops', err.message);
        }
      }
    }
    setLoading(false);

    // console.log('Sign In');
    // console.log(data);

    // navigation.navigate('Home');
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
  const onSignUpPressed = () => {
    console.log('Sign Up');
    navigation.navigate('SignUp');
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={{alignItems: 'center', backgroundColor: '#fff'}}>
        <Image
          source={Logo}
          style={[styles.logo, {height: height * 0.3}]}
          resizeMode="contain"
        />

        <CustomInput
          placeholder="Username"
          control={control}
          rules={{
            required: 'Username Field Is Required',
            minLength: {
              value: 6,
              message: 'Username Must Be Atleast 6 Characters',
            },
            maxLength: {
              value: 24,
              message: 'Username Must Be Under 24 Characters',
            },
          }}
          name="username"
          password={false}
        />

        <CustomInput
          placeholder="Password"
          control={control}
          rules={{
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password Length Should Be Minimum 6 characters',
            },
          }}
          iconName="form-textbox-password"
          name="password"
          password={true}
        />

        <CustomButtom
          text={loading ? 'Loading...' : 'Sign In'}
          onPress={handleSubmit(onSignInPressed)}
        />
        {userConfirmed == false && userNotConfirmed()}
        <CustomButtom
          text="Forgot Password?"
          onPress={onForgotPasswordPressed}
          type="TERTIARY"
        />
        <CustomButtom
          text="Sign In with Google"
          onPress={onSignInWithGooglePressed}
          type="GOOGLE"
        />
        <CustomButtom
          text="Sign In with Facebook"
          onPress={onSignInWithFacebookPressed}
          type="FB"
        />
        <CustomButtom
          text="Sign In with Apple"
          onPress={onSignInWithApplePressed}
          type="APPLE"
        />
      </View>
      <View style={{alignItems: 'center', marginTop: 20}}>
        <Text style={{color: '#000'}}>
          Don't Have An Account?{' '}
          <Text
            style={{color: 'blue', fontWeight: '700'}}
            onPress={onSignUpPressed}>
            Create One
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
};

export default SigninScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    bckgroundColor: 'red',
  },
  logo: {
    width: 200,
    height: 200,
  },
});
