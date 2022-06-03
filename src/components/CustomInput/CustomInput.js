import {StyleSheet, Text, View} from 'react-native';
import * as React from 'react';

import {Controller} from 'react-hook-form';
import {TextInput} from 'react-native-paper';

const CustomInput = ({
  control,
  name,
  placeholder,
  rules = {},
  iconName = 'account',
  password = false,
}) => {
  const element = <TextInput.Icon name={iconName} size={22} />;

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>
          <View
            style={[
              styles.container,
              {
                //borderColor: error ? 'red' : '#e8e8e8',
                justifyContent: 'center',
              },
            ]}>
            <TextInput
              label={placeholder}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              style={{
                width: '90%',
                backgroundColor: '#fff',
                height: 50,
                justifyContent: 'center',
              }}
              mode="outlined"
              outlineColor="#1F51FF"
              activeOutlineColor="#1F51FF"
              left={element}
              secureTextEntry={password}
            />
          </View>
          {error && (
            <Text
              style={{color: 'red', alignSelf: 'flex-start', marginLeft: 30}}>
              {error.message || 'Error'}
            </Text>
          )}
        </>
      )}
    />
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: '90%',
    alignItems: 'center',
  },
  textInput: {
    color: 'red',
  },
  input: {
    height: 40,
    color: '#000',
  },
});
