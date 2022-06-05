import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import CustomInput from '../../components/CustomInput';
import * as React from 'react';
import CustomButton from '../../components/CustomButtom';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {Amplify, Auth} from 'aws-amplify';
import awsconfig from '../../aws-exports';
import {useRoute} from '@react-navigation/native';

Amplify.configure(awsconfig);

const NewPasswordScreen = () => {
  const route = useRoute();
  const {control, handleSubmit, watch} = useForm({
    defaultValues: {username: route?.params?.username},
  });
  const navigation = useNavigation();

  const pwd = watch('password');

  const onSubmitPressed = async data => {
    // console.log('Submit Button Pressed');
    // navigation.navigate('Home');

    try {
      const response = await Auth.forgotPasswordSubmit(
        data.username,
        data.code,
        data.password,
      );
      navigation.navigate('SignIn');
    } catch (err) {
      Alert.alert('Oops', err.message);
    }
  };

  const onBackToSignInPressed = () => {
    console.log('Back To Sign In Pressed');
    navigation.navigate('SignIn');
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.container}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>Reset Password</Text>
        </View>
        <CustomInput
          control={control}
          placeholder="Username"
          name="username"
          rules={{required: 'Username is required'}}
        />
        <CustomInput
          control={control}
          placeholder="Confirmation Code"
          name="code"
          rules={{required: 'Comfirmation code is required'}}
          iconName="form-textbox-password"
        />
        <CustomInput
          control={control}
          placeholder="New Password"
          name="password"
          rules={{required: 'Password is required'}}
          iconName="form-textbox-password"
          password={true}
        />
        <CustomInput
          control={control}
          placeholder="Confirm New Password"
          name="confirmpassword"
          rules={{validate: value => value === pwd || 'Passwords do not match'}}
          iconName="form-textbox-password"
          password={true}
        />
        <CustomButton
          onPress={handleSubmit(onSubmitPressed)}
          text="Submit"
          type="CONFIRM"
        />

        <Text
          style={{color: '#F4BB44', fontWeight: '700', marginTop: 20}}
          onPress={onBackToSignInPressed}>
          Back to Sign In
        </Text>
      </View>
    </ScrollView>
  );
};

export default NewPasswordScreen;

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
    color: '#F4BB44',
    fontWeight: 'bold',
  },
});
