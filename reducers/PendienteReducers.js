import {
  INICIO_PENDIENTE,
  EXITO_PENDIENTE,
  ERROR_PENDIENTE,
  INICIO_UPDATE_VISITA,
  EXITO_UPDATE_VISITA,
  ERROR_UPDATE_VISITA,
  CERRAR_SNAKE_REGISTER,
  CERRAR_SNAKE_UPDATE_VISITA,
  INICIO_REALIZADO,
  EXITO_REALIZADO,
  ERROR_REALIZADO,
  INICIO_SEARCH_CARCODE,
  EXITO_SEARCH_CARCODE,
  ERROR_SEARCH_CARCODE,
} from '../types/RutasTypes';

const initialState = {
  loading: false,
  error: false,
  pendiente: [],
  realizado: [],
  search: [],
  Mensaje: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case INICIO_PENDIENTE:
      return {
        ...state,
        loading: true,
      };
    case EXITO_PENDIENTE:
      return {
        ...state,
        loading: false,
        pendiente: action.payload,
      };
    case ERROR_PENDIENTE:
      return {
        ...state,
        loading: false,
        error: true,
        Mensaje: action.payload,
      };
    case INICIO_REALIZADO:
      return {
        ...state,
        loading: true,
      };
    case EXITO_REALIZADO:
      return {
        ...state,
        loading: false,
        realizado: action.payload,
      };
    case ERROR_REALIZADO:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case INICIO_UPDATE_VISITA:
      return {
        ...state,
        loading: action.payload,
      };
    case EXITO_UPDATE_VISITA:
      return {
        ...state,
        loading: false,
        Mensaje: action.payload,
      };
    case ERROR_UPDATE_VISITA:
      return {
        ...state,
        loading: false,
        error: true,
        Mensaje: action.payload,
      };
    case CERRAR_SNAKE_UPDATE_VISITA:
      return {
        ...state,
        Mensaje: action.payload,
        loading: false,
      };
    case INICIO_SEARCH_CARCODE:
      return {
        ...state,
        loading: true,
      };
    case EXITO_SEARCH_CARCODE:
      return {
        ...state,
        loading: false,
        search: action.payload,
      };
    case ERROR_SEARCH_CARCODE:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
}
