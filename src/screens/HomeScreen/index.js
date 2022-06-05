import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Amplify, Auth} from 'aws-amplify';
import awsconfig from '../../aws-exports';

Amplify.configure(awsconfig);

const HomeScreen = () => {
  const signOut = () => {
    Auth.signOut();
  };
  return (
    <View>
      <Text style={{color: '#000'}}>HomeScreen</Text>

      <TouchableOpacity
        style={{
          backgroundColor: '#009688',
          width: 200,
          height: 50,
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
        }}
        onPress={signOut}>
        <Text style={{color: '#fff'}}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
