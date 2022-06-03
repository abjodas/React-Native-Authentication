import {StyleSheet, Text, View, ScrollView, StatusBar} from 'react-native';
import CustomInput from '../../components/CustomInput';
import * as React from 'react';
import CustomButton from '../../components/CustomButtom';
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';

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
  const [username, setUsername] = React.useState('');
  const [confirmationCode, setConfirmationCode] = React.useState('');
  const navigation = useNavigation();
  const {control, handleSubmit} = useForm();
  const onConfirmPressed = () => {
    console.log('Confirmation Button Pressed');
    navigation.navigate('Home');
  };

  const onResendCodePressed = () => {
    console.log('Resend Code Pressed');
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
          text="Confirm"
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
          <Text style={{color: '#F4BB44'}} onPress={onResendCodePressed}>
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
