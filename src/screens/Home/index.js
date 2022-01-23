import * as React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {FAB} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SnakMensaje from '../../components/SnakBar';
import {useSelector} from 'react-redux';
import AvatarIcon from '../Avatar';
const MyComponent = ({navigation}) => {
  const stateRegister = useSelector(state => state.RegistroUbi);
  let Existe = false;

  const stateLocalstorage = async function () {
    try {
      const value = await AsyncStorage.getItem('@RegistroKilometraje');
      if (value !== null) {
        return true;
      }
    } catch (e) {
      return false;
    }
  };

  if (stateRegister.reglocalstorage.length === 0) {
    Existe = false;
  } else if (!stateLocalstorage) {
    Existe = false;
  } else {
    Existe = true;
  }

  const MensajeData = stateRegister.mensaje.length === 0 ? false : true;
  return (
    <SafeAreaView style={styles.container}>
      {!MensajeData ? (
        <>
          {!Existe && (
            <FAB
              style={styles.fab}
              icon="map-marker-plus"
              label="Iniciar Ruta"
              onPress={() => navigation.navigate('RegistroUB', {tipo: 1})}
            />
          )}
          {Existe && (
            <FAB
              style={styles.fab}
              icon="map-marker-minus"
              label="Finalizar Ruta"
              onPress={() => navigation.navigate('RegistroUB', {tipo: 2})}
            />
          )}
        </>
      ) : (
        <>
          <AvatarIcon
            title={stateRegister.mensaje.Mensaje}
            titleIcon="map-marker-check"
          />
          <SnakMensaje Mensaje={stateRegister.mensaje} IdTipo={1} />
        </>
      )}
    </SafeAreaView>
  );
};

export default MyComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  fab: {
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
