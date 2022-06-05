import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';

import * as React from 'react';
import CustomButton from '../../components/CustomButtom';
import {useNavigation} from '@react-navigation/native';
import CustomInput from '../../components/CustomInput';
import {useForm} from 'react-hook-form';
import {Amplify, Auth} from 'aws-amplify';
import awsconfig from '../../aws-exports';

Amplify.configure(awsconfig);

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const {control, handleSubmit, watch} = useForm();
  const [loading, setLoading] = React.useState(false);

  const username = watch('username');

  const onSendPressed = async data => {
    // console.log('Send Button Pressed');
    // navigation.navigate('NewPassword');
    setLoading(true);
    try {
      const response = await Auth.forgotPassword(data.username);
      console.log(response);
      navigation.navigate('NewPassword', {username});
    } catch (err) {
      Alert.alert('Oops', err.message);
    }
    setLoading(false);
  };

  const onBackToSignInPressed = () => {
    console.log('Back To Sign In Pressed');
    navigation.navigate('SignIn');
  };
  return (
    <ScrollView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={{alignItems: 'center'}}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>Reset Password</Text>
        </View>
        <CustomInput
          control={control}
          name="username"
          placeholder="Username"
          rules={{
            required: 'Username is Required',
            minLength: {
              value: 6,
              message: 'Username Must Be Atleast 6 Characters',
            },
            maxLength: {
              value: 24,
              message: 'Username Must Be Under 24 Characters',
            },
          }}
        />
        <CustomButton
          onPress={handleSubmit(onSendPressed)}
          text={loading ? 'Sending ...' : 'Send'}
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

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //
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
