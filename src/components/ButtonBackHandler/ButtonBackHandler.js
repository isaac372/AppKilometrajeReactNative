import {BackHandler,Alert,Platform}from 'react-native'
export const BackHanlder=(navigation)=>{    
    if(Platform.OS === 'android'){        
    const backAction = () => {    
        if(navigation.isFocused()){
          Alert.alert("Salir", "¿Desea salir de la aplicacion?", [
            {
              text: "Cancelar",
              onPress: () => null,
              style: "cancel"
            },
            { text: "Si", onPress: () => BackHandler.exitApp() }
          ]);
            return () => backHandler.remove();
        }
        return false 
        ;
      };
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
        );
    }

}


export const ExitApp=()=>{
  Alert.alert("Salir", "¿Desea salir de la aplicacion?", [
    {
      text: "Cancelar",
      onPress: () => null,
      style: "cancel"
    },
    { text: "Si", onPress: () => BackHandler.exitApp() }
  ]);
    return () => backHandler.remove();
}

 