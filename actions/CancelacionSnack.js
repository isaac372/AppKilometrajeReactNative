import {CloseSnakeUpdateVisita} from './PendienteActions';
import {CerrarMensajeRegister} from './RegistroUbicacionAction';

export const CancelarSnackMessaje = numero => {
  return dispatch => {
    switch (numero) {
      case 1:
        dispatch(CerrarMensajeRegister([]));
        break;
      case 2:
        dispatch(CloseSnakeUpdateVisita([]));
        break;
      default:
        break;
    }
  };
};
