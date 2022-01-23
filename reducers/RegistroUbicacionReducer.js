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

const initialState = {
  loading: false,
  error: false,
  mensaje: [],
  reglocalstorage: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case INICIO_REGISTRO_UBICACION:
      return {
        ...state,
        loading: true,
      };
    case EXITO_REGISTRO_UBICACION:
      return {
        ...state,
        loading: false,
        mensaje: action.payload,
      };
    case ERROR_REGISTRO_UBICACION:
      return {
        ...state,
        loading: false,
        error: true,
        mensaje: action.payload,
      };
    case SAVE_LOCALSTORAGE:
      const setItemLocal = async () => {
        try {
          await AsyncStorage.setItem(
            '@RegistroKilometraje',
            JSON.stringify(action.payload),
          );
        } catch (error) {
          // Error saving data
        }
      };
      setItemLocal();
      return {
        ...state,
        reglocalstorage: action.payload,
      };
    case CERRAR_SNAKE_REGISTER:
      return {
        ...state,
        mensaje: action.payload,
        loading: false,
      };
    case INICIO_REGISTRO_UNICO:
      return {
        ...state,
        loading: action.payload,
      };
    case EXITO_REGISTRO_UNICO:
      return {
        ...state,
        loading: false,
        mensaje: action.payload,
      };
    case ERROR_REGISTRO_UNICO:
      return {
        ...state,
        loading: false,
        error: true,
        mensaje: action.payload,
      };
    default:
      return state;
  }
}
