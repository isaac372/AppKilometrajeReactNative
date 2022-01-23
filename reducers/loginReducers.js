import {
    USUARIO_LOGIN_INICIO,
    USUARIO_LOGIN_EXITO,
    USUARIO_LOGIN_ERROR,
    USUARIO_LOGOUT,
    LOGIN_TRUE_INICIO,
    LOGIN_TRUE_EXITO,
    LOGIN_TRUE_ERROR,
    IMAGEN_ACTUALIZADA_EXITOSAMENTE,
    TEST_REDUX,
    INICIO_LOGIN_USUARIO,
    LOGOUT_USUARIO_INICIO,
    LOGOUT_USUARIO_EXITO,
    CARGANDO_INICIO_LOGIN,
    CARGANDO_CARGA_ASYNCSTORAGE_USER
  } from "../types";
  import AsyncStorage from '@react-native-async-storage/async-storage';

//   //obtener primero del localstorage



async function getDataUser (){
    return  await AsyncStorage.getItem('@userData');
}
const data2 = getDataUser().then((val) =>{
  return JSON.parse(val)
});



  const initialState = data2? { loggedIn: true, user:'',LoadingLogin:false,cargandoLogout:false,cargandoInicio:false,cargandoDataAsyncStorage:false } : {};
 

  export default function (state = initialState, action) {
   //console.log(state,'ESTADO INICIAL DE EL LOGUN')
  //console.log(action.payload,'Result Payload')
    switch (action.type) {
      case USUARIO_LOGIN_INICIO:        
        return {
          loggedIn: true,
          user: action.payload,
          
        };
      case USUARIO_LOGIN_EXITO:        
        return {
          loggedIn: true,
          user: action.payload,
          cargandoInicio:false
        };
      case USUARIO_LOGIN_ERROR:
        return {
          user:action.payload
        };
      case USUARIO_LOGOUT:
        return {};
      case LOGIN_TRUE_INICIO:
        return { ...state };
      case LOGIN_TRUE_EXITO:
        return { ...state };
      case LOGIN_TRUE_ERROR:
        return {};
    case TEST_REDUX:
    
      return {
        
        user: action.payload,
      };
        
      case IMAGEN_ACTUALIZADA_EXITOSAMENTE:
        let auxNuevoUser = { ...state.user };
        auxNuevoUser.Imagen = action.payload;
        //localStorage.setItem("user", JSON.stringify(auxNuevoUser));
        return {
          ...state,
          user: auxNuevoUser,
        };
     case INICIO_LOGIN_USUARIO:
       return{
         ...state,
         LoadingLogin:action.payload
       }
      case LOGOUT_USUARIO_INICIO:
        return{
          cargandoLogout:action.payload
        }
      case LOGOUT_USUARIO_EXITO:

        return{
          cargandoLogout:false,
          loggedIn: true, 
          user:'',
          LoadingLogin:false,
          cargandoLogout:false
        }
       case CARGANDO_INICIO_LOGIN:
         return{
           ...state,
           cargandoInicio:action.payload
         }
      case CARGANDO_CARGA_ASYNCSTORAGE_USER:
        return {
          ...state,
          cargandoDataAsyncStorage:action.payload
        }     

      default:
        return state;
    }
  }
  