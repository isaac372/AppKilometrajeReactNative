import * as React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {Card} from 'react-native-paper';
import usePreference from '../../hooks/usePreferences';

const MyComponent = () => {
  const {theme} = usePreference();
  const Perfil = useSelector(state => state.login);
  return (
    <ScrollView style={theme === 'dark'?styles.container:""}>
      <Card>
        <Card.Cover source={{uri: 'https://picsum.photos/700'}} />
      </Card>
    </ScrollView>
  );
};

export default MyComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#192734',
  },
});
