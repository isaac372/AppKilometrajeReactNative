import React from 'react';
import {StyleSheet, Text, SafeAreaView} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Pendiente from './Pendiente';
import Realizado from './Realizado';

const Tab = createMaterialTopTabNavigator();

const Index = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Tab.Navigator>
        <Tab.Screen name="Pendientes" component={Pendiente} />
        <Tab.Screen name="Realizado" component={Realizado} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 25,
    fontWeight: '500',
  },
});

export default Index;
