import {StyleSheet, Text, View, Pressable} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import EvilIcon from 'react-native-vector-icons/EvilIcons';

const CustomButton = ({onPress, text, type = 'PRIMARY'}) => {
  return (
    <Pressable
      style={[styles.container, styles[`container_${type}`]]}
      onPress={onPress}>
      {type === 'GOOGLE' && (
        <Icon name="googleplus" size={24} color="#cf6f6a" style={styles.icon} />
      )}
      {type === 'FB' && (
        <EvilIcon
          name="sc-facebook"
          size={24}
          color="#4a68ad"
          style={styles.icon}
        />
      )}
      {type === 'APPLE' && (
        <Icon name="apple1" size={24} color="#fff" style={styles.icon} />
      )}
      <Text style={styles[`text_${type}`]}>{text}</Text>
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderRadius: 5,
    height: 50,
  },
  container_PRIMARY: {
    backgroundColor: '#1F51FF',
  },
  container_CONFIRM: {
    backgroundColor: '#F4BB44',
  },
  container_TERTIARY: {},
  text_PRIMARY: {
    color: '#FFF',
  },
  text_TERTIARY: {
    color: '#000',
  },
  text_CONFIRM: {
    color: '#fff',
  },
  container_GOOGLE: {
    backgroundColor: '#f3e9ea',
    justifyContent: 'flex-start',
    padding: 10,
  },
  container_FB: {
    backgroundColor: '#e7e9f5',
    justifyContent: 'flex-start',
    padding: 10,
  },
  container_APPLE: {
    backgroundColor: '#000',
    justifyContent: 'flex-start',
    padding: 10,
  },
  text_GOOGLE: {
    color: '#cf6f6a',
    fontWeight: '700',
  },
  text_FB: {
    color: '#4a68ad',
    fontWeight: '700',
  },
  text_APPLE: {
    color: '#fff',
    fontWeight: '700',
  },
  icon: {
    marginRight: 70,
  },
});
