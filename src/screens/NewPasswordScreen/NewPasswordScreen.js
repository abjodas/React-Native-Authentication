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

const NewPasswordScreen = () => {
  const [confirmationCode, setConfirmationCode] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const navigation = useNavigation();
  const onSubmitPressed = () => {
    console.log('Submit Button Pressed');
    navigation.navigate('Home');
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
        <TInput
          value={confirmationCode}
          setValue={setConfirmationCode}
          text="Confirmation Code"
        />

        <TInput
          value={newPassword}
          setValue={setNewPassword}
          text="New Password"
        />

        <CustomButton onPress={onSubmitPressed} text="Submit" type="CONFIRM" />

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
