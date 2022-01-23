import {
    USUARIO_COMPANY_INICIO,
    USUARIO_COMPANY_EXITO,
    USUARIO_COMPANY_ERROR,
    COMPANY_SELECCIONAR_INICIO,
    COMPANY_SELECCIONAR_EXITO,
    COMPANY_SELECCIONAR_ERROR,
    ROL_SELECCIONAR_INICIO,
    ROL_SELECCIONAR_EXITO,
    ROL_SELECCIONAR_ERROR,
    ROL_SELECCIONADO_EXITO,
    GUARDAR_COMPANY_SELECCIONADO,
    GUARDAR_ROL_SELECCIONADO
  } from "../types";


  export function ListadoCompañia(listaCompany){
      return (dispatch)=>{
        dispatch(company_exito(listaCompany))
      }
  }
  export function ListaRol (ListaRol){
      return (dispatch)=>{
          dispatch(seleccionar_rol_user_exito(ListaRol))
      }
  }
  export function SeleccionDeRol (seleccionado){
      return (dispatch)=>{
        dispatch(SeleccionarRol(seleccionado))
      }
  }

  export function GuardarCompanySelected(company){
      return (dispatch)=>{
            dispatch(guardarCompanySeleccionada(company))
      }
  }
  
  export function GuardarRolSelected(rol){
      return (dispatch)=>{
        dispatch(guardarRolSelected(rol))            
      }
  }
  

  export const company_exito = (company) => ({
    type: USUARIO_COMPANY_EXITO,
    payload: company
    
  });

  export const seleccionar_rol_user_exito = (rol) => ({
    type: ROL_SELECCIONAR_EXITO,
    payload: rol
  });
  export const SeleccionarRol=(value)=>({
      type:ROL_SELECCIONADO_EXITO,
      payload:value
  })
  export const guardarCompanySeleccionada = (company)=>({
    type:GUARDAR_COMPANY_SELECCIONADO,
    payload:company
  })
  export const guardarRolSelected=(rol)=>({
      type:GUARDAR_ROL_SELECCIONADO,
      payload:rol
  })
  