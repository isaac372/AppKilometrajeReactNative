import {
    USUARIO_COMPANY_INICIO,
    USUARIO_COMPANY_EXITO,
    USUARIO_COMPANY_ERROR,
    USUARIO_LOGOUT,
    COMPANY_SELECCIONAR_INICIO,
    COMPANY_SELECCIONAR_EXITO,
    COMPANY_SELECCIONAR_ERROR,
    ROL_SELECCIONAR_INICIO,
    ROL_SELECCIONAR_EXITO,
    ROL_SELECCIONAR_ERROR,
    ROL_SELECCIONADO_EXITO,
    GUARDAR_COMPANY_SELECCIONADO,
    GUARDAR_ROL_SELECCIONADO,
    LOGOUT_USUARIO_EXITO
  } from "../types";
  
  //obtener primero del localstorage
//   let company = JSON.parse(localStorage.getItem("company"));
//   var rol = JSON.parse(localStorage.getItem("rol"));
let company=[]
var rol =null
let rolList=[]
let companySelected=[]
let rolSelected=[];
  
  const initialState = company
    ? { company, rol,rolList, companySelected,rolSelected,cargando: false,cargandoLogOut:false }
    : { company: [], rol: [],rolList:[], companySelected:[],rolSelected:[],cargando: true ,cargandoLogOut:false};
  
  export default function(state = initialState, action) {
   
    switch (action.type) {
      case USUARIO_COMPANY_EXITO:
        return {
          ...state,
          company: action.payload,
          cargando: true
        }
      case COMPANY_SELECCIONAR_EXITO:
        return {
          ...state,
          company: action.payload
        };
      case COMPANY_SELECCIONAR_ERROR:
        return {
          ...state,
          company: action.payload
        };
      case ROL_SELECCIONAR_EXITO:
        return {
          ...state,
          rol: action.payload,
          cargando: false
        };
      case ROL_SELECCIONADO_EXITO:
      return{
        ...state,
        rolList:action.payload
      }  
      case GUARDAR_COMPANY_SELECCIONADO:
          return {
              ...state,
              companySelected:action.payload
          }
       case GUARDAR_ROL_SELECCIONADO:
           return{
               ...state,
               rolSelected:action.payload


           } 
        case LOGOUT_USUARIO_EXITO:
            return {
                company: [], rol: [],rolList:[], companySelected:[],rolSelected:[],cargando: true,cargandoLogOut:true
            }     
      default:
        return state;
    }
    

  }

//Asi de limpio Example
//   export default function(state = initialState, action) {
//     console.log(state,'ESTADO INICIAL COMPANY')  
//     switch (action.type) {
//       case USUARIO_COMPANY_INICIO:
//         return { ...state, cargando: true };
//       case USUARIO_COMPANY_EXITO:
//         return {
//           ...state,
//           company: action.payload,
//           cargando: true
//         };
//       case USUARIO_COMPANY_ERROR:
//         return { ...state, cargando: true };
//       case USUARIO_LOGOUT:
//         return {};
//       case COMPANY_SELECCIONAR_INICIO:
//         return {
//           ...state,
//           company: action.payload
//         };
//       case COMPANY_SELECCIONAR_EXITO:
//         return {
//           ...state,
//           company: action.payload
//         };
//       case COMPANY_SELECCIONAR_ERROR:
//         return {
//           ...state,
//           company: action.payload
//         };
//       case ROL_SELECCIONAR_INICIO:
//         return {
//           ...state,
//           rol: action.payload
//         };
//       case ROL_SELECCIONAR_EXITO:
//         return {
//           ...state,
//           rol: action.payload,
//           cargando: false
//         };
//       case ROL_SELECCIONAR_ERROR:
//         return {
//           ...state,
//           rol: action.payload
//         };
//       case ROL_SELECCIONADO_EXITO:
//       return{
//         ...state,
//         rolList:action.payload
//       }  
//       default:
//         return state;
//     }
    

//   }
  
  