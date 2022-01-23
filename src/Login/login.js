import React, { memo, useState, useEffect } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  BackHandler,
  Alert,
} from 'react-native';
import { loginActions, login, CargandoDataAsyncStorage } from "../../actions/loginActions";
import { ListadoCompañia, ListaRol, GuardarRolSelected } from '../../actions/compañiaActions'
import { useDispatch, useSelector } from 'react-redux';
import Background from './Background';
import Header from './Header';
import Button from './Button';
import TextInput from './TextInput';
import { theme } from '../Login/core/theme';
import { passwordValidator, nameValidator } from './core/utils';
import { Checkbox } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from "./Logo";
const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const statess = useSelector(state => state.login);
  const [checked, setChecked] = React.useState(false);

  const [NombreUsuario, setUsuario] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  const backAction = () => {
    if (navigation.isFocused()) {
      BackHandler.exitApp();
      return () => backHandler.remove();
    }
    return false;
  };
  const backHandler = BackHandler.addEventListener(
    'hardwareBackPress',
    backAction,
  );

  const _onLoginPressed = () => {
    const UsuarioError = nameValidator(NombreUsuario.value);
    const passwordError = passwordValidator(password.value);

    if (UsuarioError || passwordError) {
      setUsuario({ ...NombreUsuario, error: UsuarioError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    dispatch(loginActions(NombreUsuario.value, password.value, checked, navigation));
  };


  useEffect(async () => {
    const dataUser = await AsyncStorage.getItem('@userData');
    console.log("RESULTADO DEL LOCAL STORAGE", JSON.parse(dataUser))
    if (!(dataUser == undefined || dataUser === "" || dataUser == null)) {
      dispatch(CargandoDataAsyncStorage(true));
      dispatch(login(JSON.parse(dataUser)));
    } else {
      navigation.navigate('Login');
    }
  }, [])
  useEffect(() => {
    if ((statess.user == undefined || statess.user == null) || statess.user === "") {
      navigation.navigate('Login');
      return;
    }

    if (
      statess.user.EntityID &&
      Object.entries(statess.user.CompañiaUsuario).length > 0
    ) {
      dispatch(ListadoCompañia(statess.user.CompañiaUsuario));
      dispatch(ListaRol(statess.user.CompañiaUsuario.ListaRol));
      if (Object.entries(statess.user.CompañiaUsuario).length == 1) {
        //valida las compañias y el listado de rol si es igual a uno dirigir hacia el home
        if (
          Object.entries(statess.user.CompañiaUsuario[0].ListaRol).length == 1
        ) {
          dispatch(
            GuardarRolSelected(statess.user.CompañiaUsuario[0].ListaRol),
          );
          navigation.navigate('Home');
        } else {
          navigation.navigate('Rol');
          dispatch(GuardarCompanySelected(statess.user.CompañiaUsuario[0]));
          dispatch(SeleccionDeRol(statess.user.CompañiaUsuario[0].ListaRol));
        }
      } else {
        navigation.navigate('Company');
      }
    }
  }, [statess.user]);

  return (
    <Background>
      <Logo />
      {statess.cargandoDataAsyncStorage ?
        <Header>Cargando..</Header>
        :
        <>
          <Header>Bienvenido</Header>

          <TextInput
            style={styles.label}
            label="usuario"
            returnKeyType="next"
            value={NombreUsuario.value}
            onChangeText={text => setUsuario({ value: text, error: '' })}
            error={!!NombreUsuario.error}
            errorText={NombreUsuario.error}
          />

          <TextInput
            style={styles.label}
            label="Password"
            returnKeyType="done"
            value={password.value}
            onChangeText={text => setPassword({ value: text, error: '' })}
            error={!!password.error}
            errorText={password.error}
            secureTextEntry
          />

          <View style={styles.forgotPassword}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPasswordScreen')}>
              <Text style={styles.label}>Olvidaste tu contraseña ?</Text>
            </TouchableOpacity>
          </View>

          <Button mode="contained" onPress={_onLoginPressed}>
            {!statess.LoadingLogin ? ' Iniciar Sesion' : 'Cargando'}
          </Button>
          <View style={styles.saveSesionContainer}>
            <Checkbox.Item
              label="Guardar sesion"
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked(!checked);
              }}
            />
          </View>
        </>
      }
    </Background>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  saveSesionContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    color: 'red'
  },
});

export default memo(LoginScreen);
