import * as React from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';

const MyComponent = () => (
  <FAB
    style={styles.fab}
    small
    icon="plus"
    uppercase={false}
    onPress={() => console.log('Pressed')}
  />
);

const styles = StyleSheet.create({
  fab: {
    margin: 16,
    right: 0,
    bottom: 0,
  },
})

export default MyComponent;