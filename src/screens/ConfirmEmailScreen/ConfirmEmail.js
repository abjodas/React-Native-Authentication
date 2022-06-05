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
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {useRoute} from '@react-navigation/native';
import {Amplify, Auth} from 'aws-amplify';
import awsconfig from '../../aws-exports';

Amplify.configure(awsconfig);

const TInput = ({value, setValue, text}) => {
  return (
    <TextInput
      label={text}
      value={value}
      onChangeText={text => setValue(text)}
      style={{
        width: '90%',
        backgroundColor: '#fff',
        //   borderWidth: 1,
        //   borderColor: 'rgba(0,0,0,0.3)',
        height: 40,
      }}
      mode="outlined"
      outlineColor="#F4BB44"
      activeOutlineColor="#F4BB44"
    />
  );
};

const ConfirmEmail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {control, handleSubmit, watch} = useForm({
    defaultValues: {username: route?.params?.username},
  });

  const [loading, setLoading] = React.useState(false);
  const [resendLoading, setResendLoading] = React.useState(false);

  const username = watch('username');

  const onConfirmPressed = async data => {
    setLoading(true);
    try {
      const response = await Auth.confirmSignUp(
        data.username,
        data.confirmationcode,
      );
      navigation.navigate('SignIn');
    } catch (err) {
      Alert.alert('Oops', err.message);
    }
    setLoading(false);
  };

  const onResendCodePressed = async () => {
    setResendLoading(true);
    try {
      const response = await Auth.resendSignUp(username);
      console.log(response);
      Alert.alert('Success', 'Code resent successfully.');
    } catch (err) {
      Alert.alert('Failed to resend verification code', err.message);
    }
    setResendLoading(false);
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
          <Text style={styles.headerText}>Confirm Email</Text>
        </View>

        <CustomInput
          name="username"
          control={control}
          rules={{required: 'Username is required'}}
          placeholder="Username"
        />

        <CustomInput
          name="confirmationcode"
          control={control}
          rules={{required: 'Confirmation Code is required'}}
          placeholder="Confirmation Code"
        />

        <CustomButton
          onPress={handleSubmit(onConfirmPressed)}
          text={loading ? 'Confirming...' : 'Confirm'}
          type="CONFIRM"
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            paddingHorizontal: 30,
            paddingVertical: 20,
          }}>
          <Text
            style={{color: resendLoading ? 'gray' : '#F4BB44'}}
            onPress={onResendCodePressed}>
            Resend Code
          </Text>
          <Text
            style={{color: '#F4BB44', fontWeight: '700'}}
            onPress={onBackToSignInPressed}>
            Back to Sign In
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default ConfirmEmail;

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
