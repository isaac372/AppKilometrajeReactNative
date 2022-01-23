import {
  INICIO_PENDIENTE,
  EXITO_PENDIENTE,
  ERROR_PENDIENTE,
  CERRAR_SNAKE_REGISTER,
  INICIO_UPDATE_VISITA,
  EXITO_UPDATE_VISITA,
  ERROR_UPDATE_VISITA,
  CERRAR_SNAKE_UPDATE_VISITA,
  INICIO_REALIZADO,
  EXITO_REALIZADO,
  ERROR_REALIZADO,
  INICIO_SEARCH_CARCODE,
  EXITO_SEARCH_CARCODE,
  ERROR_SEARCH_CARCODE,
} from '../types/RutasTypes';
import clienteAxiosAuth from '../config/ClienteAxios';

export const Pendientes = IdRelacion => {
  return async dispatch => {
    dispatch(Loading());
    await clienteAxiosAuth
      .get(`MyTest/api/Mobil/GetVisitasOpen/${IdRelacion}`)
      .then(respuesta => {
        dispatch(Susses(respuesta.data));
      })
      .catch(error => {
        console.log('Ocurrio un error ' + error);
        dispatch(Error(error));
      });
  };
};

export const Loading = () => ({
  type: INICIO_PENDIENTE,
});

export const Susses = value => ({
  type: EXITO_PENDIENTE,
  payload: value,
});

export const Error = error => ({
  type: ERROR_PENDIENTE,
  payload: error,
});

export const CerrarMensajeRegister = value => ({
  type: CERRAR_SNAKE_REGISTER,
  payload: value,
});

export const UpdateVisita = (Value, navigation, latitude, longitude, Type) => {
  Value.Latitud = latitude;
  Value.Longitud = longitude;

  return async dispatch => {
    await clienteAxiosAuth
      .post(
        `MyTest/Api/Mobil/${Type === 0 ? 'CrearVisita' : 'UpdateVisita'}`,
        Value,
      )
      .then(respuesta => {
        if (respuesta.data.Resultado) {
          if (Type === 1) {
            dispatch(Pendientes(Value.IdRelacion));
          } else {
            dispatch(Realizados(Value.IdRelacion));
          }
          if (Type === 0) {
            navigation.goBack();
            navigation.goBack();
          } else {
            navigation.goBack();
          }
        }
        dispatch(SussesUpdateVisita(respuesta.data));
      })
      .catch(error => {
        console.log('Ocurrio un error ' + error);
        dispatch(ErrorUpdateVisita(error));
      });
  };
};

export const LoadingUpdateVisita = value => ({
  type: INICIO_UPDATE_VISITA,
  payload: value,
});

export const SussesUpdateVisita = value => ({
  type: EXITO_UPDATE_VISITA,
  payload: value,
});

export const ErrorUpdateVisita = error => ({
  type: ERROR_UPDATE_VISITA,
  payload: error,
});

export const CloseSnakeUpdateVisita = value => ({
  type: CERRAR_SNAKE_UPDATE_VISITA,
  payload: value,
});

///REALIZADOS

export const Realizados = IdRelacion => {
  return async dispatch => {
    dispatch(LoadingRealizado());
    await clienteAxiosAuth
      .get(`MyTest/api/Mobil/GetVisitasDone/${IdRelacion}`)
      .then(respuesta => {
        dispatch(SussesRealizado(respuesta.data));
      })
      .catch(error => {
        console.log('Ocurrio un error ' + error);
        dispatch(ErrorRealizado(error));
      });
  };
};

export const LoadingRealizado = () => ({
  type: INICIO_REALIZADO,
});

export const SussesRealizado = value => ({
  type: EXITO_REALIZADO,
  payload: value,
});

export const ErrorRealizado = error => ({
  type: ERROR_REALIZADO,
  payload: error,
});

export const RealizadosByfecha = (IdRelacion, Dates) => {
  return async dispatch => {
    dispatch(LoadingRealizado());
    await clienteAxiosAuth
      .get(`MyTest/api/Mobil/GetVisitasDone/${IdRelacion}/${Dates}`)
      .then(respuesta => {
        dispatch(SussesRealizado(respuesta.data));
      })
      .catch(error => {
        console.log('Ocurrio un error ' + error);
        dispatch(ErrorRealizado(error));
      });
  };
};

///Search Carcode
export const SearchCarcode = (IdRelacion, value) => {
  return async dispatch => {
    dispatch(LoadingSearch());
    await clienteAxiosAuth
      .get(`MyTest/api/Mobil/GetBuscarSocio/${IdRelacion}/${value}`)
      .then(respuesta => {
        dispatch(SussesSearch(respuesta.data.Detalle));
      })
      .catch(error => {
        console.log('Ocurrio un error ' + error);
        dispatch(ErrorSearch(error));
      });
  };
};

export const LoadingSearch = () => ({
  type: INICIO_SEARCH_CARCODE,
});

export const SussesSearch = value => ({
  type: EXITO_SEARCH_CARCODE,
  payload: value,
});

export const ErrorSearch = error => ({
  type: ERROR_SEARCH_CARCODE,
  payload: error,
});
