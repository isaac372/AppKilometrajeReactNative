import React from 'react';
import {IconButton} from 'react-native-paper';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../Login/login';
import Company from '../screens/Company';
import Rol from '../screens/rol';
import Home from '../screens/Home';
import RegistroUbicacion from '../screens/Home/RegistroUbicacion';
import Visita from '../screens/Visita';
import Search from '../screens/Visita/Search';
import RealizarVisita from '../screens/Visita/RealizarVisita';
import RegistroUnico from '../screens/Home/RegistroUnico';

const Stack = createNativeStackNavigator();

export default function StackNavigation({navigation}) {
  const buttonLeft = screen => {
    switch (screen) {
      case 'search':
      case 'movie':
        return (
          <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
        );
      default:
        return (
          <IconButton icon="menu" onPress={() => navigation.openDrawer()} />
        );
    }
  };

  const buttonRight = () => {
    return (
      <>
        <IconButton
          icon="magnify"
          onPress={() => navigation.navigate('search')}
        />
      </>
    );
  };
  const buttonKilometraje = () => {
    return (
      <>
        <IconButton
          icon="map-marker-plus"
          onPress={() => navigation.navigate('RegistroUB', {tipo: 1})}
        />
      </>
    );
  };

  const buttonLeftIndex = () => {
    return (
      <>
        <IconButton icon="arrow-left" onPress={handleChange} />
      </>
    );
  };

  const handleChange = () => {
    navigation.goBack();
  };

  const buttonLeftsalir = () => {
    return (
      <>
        <IconButton icon="arrow-left" onPress={handleChangeSalir} />
      </>
    );
  };

  const handleChangeSalir = () => {
    navigation.goBack();
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: 'Login',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Company"
        component={Company}
        options={{
          title: 'Compañias',
          headerTransparent: true,
          headerLeft: () => buttonLeft('search'),
        }}
      />
      <Stack.Screen
        name="Rol"
        component={Rol}
        options={{
          title: 'Rol',
          headerTransparent: true,
          headerLeft: () => buttonLeft('search'),
        }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Registro Ubicacion',
          headerTransparent: true,
          headerLeft: () => buttonLeft('Home'),
        }}
      />

      <Stack.Screen
        name="RegistroUB"
        component={RegistroUbicacion}
        options={{
          title: 'Registrar Ubicacion',
          headerTransparent: true,
          headerLeft: () => buttonLeft('search'),
        }}
      />
      <Stack.Screen
        name="Cuenta"
        component={Visita}
        options={{
          title: 'Agenda',
          headerTransparent: true,
          headerLeft: () => buttonLeft('search'),
          headerRight: () => buttonRight(),
        }}
      />
      <Stack.Screen
        name="search"
        component={Search}
        options={{
          title: '',
          headerTransparent: true,
          headerLeft: () => buttonLeft('search'),
        }}
      />

      <Stack.Screen
        name="RealizarVisita"
        component={RealizarVisita}
        options={{
          title: '',
          headerTransparent: true,
          headerLeft: () => buttonLeft('search'),
        }}
      />
      <Stack.Screen
        name="RegistroUnico"
        component={RegistroUnico}
        options={{
          title: '',
          headerTransparent: true,
          headerLeft: () => buttonLeft('search'),
        }}
      />
    </Stack.Navigator>
  );
}
