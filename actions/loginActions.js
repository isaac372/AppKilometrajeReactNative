import {
  TEST_REDUX,
  USUARIO_LOGIN_INICIO,
  USUARIO_LOGIN_EXITO,
  USUARIO_LOGIN_ERROR,
  LOGIN_TRUE_ERROR,
  INICIO_LOGIN_USUARIO,
  LOGOUT_USUARIO_INICIO,
  LOGOUT_USUARIO_EXITO,
  CARGANDO_INICIO_LOGIN,
  CARGANDO_CARGA_ASYNCSTORAGE_USER
} from "../types";
import clienteAxios from "../config/ClienteAxios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from "react-native";

export const loginActions = (NombreUsuario, Contraseña,GuardarCredenciales) => {
 // const navigation=useNavigation(); 
//console.log(NombreUsuario, Contraseña);
  const requestOptions = {
    NombreUsuario,
    Contraseña,
  };
  try {
    return async dispatch => {
      dispatch(CargaInicioLogin(true))
      const response = await clienteAxios.post("MyTest/Api/autenticacion/authenticate", requestOptions);
      const {
        CompañiaUsuario,
        Token,
        EntityID,
        Imagen,
        NombreUsuario,
        PreciosN,
      } = response.data;

      if (EntityID === 0 || EntityID === undefined) {
        dispatch(login_error("Usuario Incorrecto"));
        Alert.alert("Usuario incorrecto")
        //Toast.show("Usuario incorrecto")


      //   Toast.show({
      //     title: "Usuario o contraseña incorrecta",
      //     buttonText: 'Ok',
      //     duration: 5000
      // })
        return;
      }
      if (CompañiaUsuario.length === 0 || CompañiaUsuario === undefined) {
        //Swal.fire("Info", "el usuario no tiene niguna compañia", "warning");
        dispatch(login_error("El usuario no posee ninguna compania"));
        Alert.alert("El usuario no posee ninguna compaia")
      //   Toast.showsdf({
      //     title: "El usuario no posee ninguna compania",
      //     buttonText: 'Ok',
      //     duration: 5000
      // })
        return;
      }
      Token.EntityID = EntityID;
      Token.PreciosN = PreciosN;
      Token.Imagen = Imagen;
      Token.NombreUsuario = NombreUsuario;

      var fecha = new Date();
      var _min = 1000 * 60;
      var _hor = _min * 60;
      var timestamp = fecha.getTime() + _hor * 12;   
      Token.Fecha = timestamp;
      //dispatch(login_exito(Token));
      // guardar en store el JWT que proviene del api         
      //AsyncStorage.setItem("user", JSON.stringify(Token));

    const setItemLocal = async () => {
        try {
          await AsyncStorage.setItem(
            '@userData',
            JSON.stringify(response.data)
          );
        } catch (error) {
          // Error saving data
        }
    };
    if(GuardarCredenciales){
      setItemLocal();
    }else{
      AsyncStorage.removeItem("@userData");

    }
      


      
      
      dispatch(login(response.data));      
         
             
    //   const getData= async () => {
    //     const jsonValue = await AsyncStorage.getItem('@userData')
    //     return JSON.parse(jsonValue);
    // } 
    
  //   async function getDataUser (){
  //     return  await AsyncStorage.getItem('@userData');
  // }
  //  getDataUser().then((resultDataUser) =>{
    
  //  // dispatch(login(JSON.parse(resultDataUser)));   
  //  if(resultDataUser!=null)
  //  {
  //   navigation.navigate("Compañia")
  //  }   
   

  // });


    // getData().then((resultDataUser)=>{
    //   if(resultDataUser!=null ||resultDataUser!=undefined ){
    //     navigation.navigate("Compañia")
    //   }
    // })


   // console.log(getData(),'response local')
      //console.log(getData(),'Token');
      // if (response.data) {
      //   dispatch(login(response.data));
      // } else {
      //   console.log('no se poque!');
      // }
    };
  } catch (error) {    
    dispatch({
      type: LOGIN_TRUE_ERROR,
      payload: error
    });
  }
  dispatch(CargaInicioLogin(false))
};

export function InicioLogout(status){
  return (dispatch)=>{
    dispatch(LogoutUser(status))
  }
}

export function InicioLogout_Exito(){
  return (dispatch)=>{
    dispatch(LogoutUser_Exito())
  }
}


export const CargandoInicio=(status)=>({
  type:CARGANDO_INICIO_LOGIN,
  payload:status  
})
export const login = (valor) => ({
  type: USUARIO_LOGIN_INICIO,
  payload: valor,
});
export const login_error = (error) => ({
  type: USUARIO_LOGIN_ERROR,
  payload: error,
});
export const CargaInicioLogin =(estado)=>({
  type:INICIO_LOGIN_USUARIO,
  payload:estado
})
export const LogoutUser=(status)=>({
  type:LOGOUT_USUARIO_INICIO,
  payload:status
})

export const LogoutUser_Exito=()=>({
  type:LOGOUT_USUARIO_EXITO,
})
export const CargandoDataAsyncStorage=(value)=>({
  type:CARGANDO_CARGA_ASYNCSTORAGE_USER,
  payload:value
})



