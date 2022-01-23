import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Drawer, Switch, TouchableRipple, Text } from 'react-native-paper';
import usePreference from '../hooks/usePreferences';
import AvatarUser from '../screens/User/Avatar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from '../../actions/loginActions';

export default function DrawerContent({ navigation }) {
  const dispatch = useDispatch();
  const [active, setActive] = useState('Home');
  const { theme, toggleTheme } = usePreference();
  const states = useSelector(state => state.login);
  const { Imagen, NombreUsuario } = states.user;
  const onChangeScreen = screen => {
    setActive(screen);
    navigation.navigate(screen);

  };
  const SalirApp = () => {
    navigation.navigate("Login");
    AsyncStorage.removeItem("@userData")
    dispatch(login([]));
    navigation.closeDrawer();
  }

  return (
    <DrawerContentScrollView>
      <Drawer.Section title="User">
        <TouchableRipple>
          <View style={styles.UserAvatar}>
            <AvatarUser image={Imagen ? Imagen : ""} />
            <Text>
              {NombreUsuario ? NombreUsuario : ''}
            </Text>
          </View>
        </TouchableRipple>
      </Drawer.Section>
      <Drawer.Section>
        <Drawer.Item
          label="Inicio"
          icon='home'
          active={active === 'Home'}
          onPress={() => onChangeScreen('Home')}
        />
        <Drawer.Item
          label="Visita"
          icon='badge-account-horizontal'
          onPress={() => onChangeScreen('Cuenta')}
        />
        <Drawer.Item
          label="Registro Unico"
          icon='map-marker-radius'
          onPress={() => onChangeScreen('RegistroUnico')}
        />
      </Drawer.Section>
      <Drawer.Section title="Opciones">
        <TouchableRipple>
          <View style={styles.preference}>
            <Text>Tema Oscuro</Text>
            <Switch value={theme === 'dark'} onValueChange={toggleTheme} />
          </View>
        </TouchableRipple>
      </Drawer.Section>
      <Drawer.Item icon='forward' label="Cerrar Sesion" onPress={() => SalirApp()} />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

  UserAvatar: {
    alignItems: 'center',
  },
});
