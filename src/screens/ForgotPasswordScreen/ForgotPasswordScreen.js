import {StyleSheet, Text, View, ScrollView, StatusBar} from 'react-native';

import * as React from 'react';
import CustomButton from '../../components/CustomButtom';
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import CustomInput from '../../components/CustomInput';
import {useForm} from 'react-hook-form';

const ForgotPasswordScreen = () => {
  const [username, setUsername] = React.useState('');
  const [confirmationCode, setConfirmationCode] = React.useState('');
  const navigation = useNavigation();
  const {control, handleSubmit} = useForm();

  const onSendPressed = () => {
    console.log('Send Button Pressed');
    navigation.navigate('NewPassword');
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
          text="Send"
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
