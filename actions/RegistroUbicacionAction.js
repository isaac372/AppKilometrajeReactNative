import {
  INICIO_REGISTRO_UBICACION,
  EXITO_REGISTRO_UBICACION,
  ERROR_REGISTRO_UBICACION,
  CERRAR_SNAKE_REGISTER,
  SAVE_LOCALSTORAGE,
  INICIO_REGISTRO_UNICO,
  EXITO_REGISTRO_UNICO,
  ERROR_REGISTRO_UNICO,
} from '../types/RutasTypes';
import clienteAxiosAuth from '../config/ClienteAxios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CreateRegisterUbicacion = (
  value,
  navigation,
  latitude,
  longitude,
  Tipo,
) => {
  value.Latitud = latitude;
  value.Longitud = longitude;

  return async dispatch => {
    await clienteAxiosAuth
      .post('MyTest/Api/Mobil/AppIosAndroidRegistrarKilometraje', value)
      .then(respuesta => {
        if (respuesta.data.Resultado) {
          console.log(respuesta.data);
          switch (Tipo) {
            case 1:
              dispatch(SaveLocalstorage(respuesta.data));
              break;
            case 2:
              AsyncStorage.removeItem('@RegistroKilometraje');
              dispatch(SaveLocalstorage([]));
              break;
            default:
              break;
          }
          navigation.goBack();
        }
        dispatch(SussesRegister(respuesta.data));
      })
      .catch(error => {
        console.log('Ocurrio un error ' + error);
        dispatch(ErrorRegister(error));
      });
  };
};

export const LoadingRegister = () => ({
  type: INICIO_REGISTRO_UBICACION,
});

export const SussesRegister = value => ({
  type: EXITO_REGISTRO_UBICACION,
  payload: value,
});

export const SaveLocalstorage = value => ({
  type: SAVE_LOCALSTORAGE,
  payload: value,
});

export const ErrorRegister = error => ({
  type: ERROR_REGISTRO_UBICACION,
  payload: error,
});

export const CerrarMensajeRegister = value => ({
  type: CERRAR_SNAKE_REGISTER,
  payload: value,
});

/////Registro Unico
export const CreateRegistroUnico = (value, navigation, latitude, longitude) => {
  value.Latitud = latitude;
  value.Longitud = longitude;

  return async dispatch => {
    await clienteAxiosAuth
      .post('MyTest/Api/Mobil/AppIosAndroidRegistrarKilometraje', value)
      .then(respuesta => {
        if (respuesta.data.Resultado) {
          navigation.goBack();
        }
        dispatch(SaveRegisterUnico(respuesta.data));
      })
      .catch(error => {
        console.log('Ocurrio un error ' + error);
        dispatch(ErrorRegisterUnico(error));
      });
  };
};

export const LoadingRegisterUnico = value => ({
  type: INICIO_REGISTRO_UNICO,
  payload: value,
});

export const SaveRegisterUnico = value => ({
  type: EXITO_REGISTRO_UNICO,
  payload: value,
});

export const ErrorRegisterUnico = error => ({
  type: ERROR_REGISTRO_UNICO,
  payload: error,
});
