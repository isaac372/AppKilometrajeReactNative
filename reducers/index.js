import {combineReducers} from 'redux';
import loginReducers from './loginReducers';
import CompanyReducer from './compañiaReducer';
import RegistroUb from './RegistroUbicacionReducer';
import Pendiente from './PendienteReducers';

export default combineReducers({
  login: loginReducers,
  company: CompanyReducer,
  RegistroUbi: RegistroUb,
  pendientes: Pendiente,
});
