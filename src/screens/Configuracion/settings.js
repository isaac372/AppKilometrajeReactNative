import * as React from 'react';
import { ScrollView, StyleSheet, PermissionsAndroid, View, TouchableOpacity, Text, Platform } from 'react-native';
import { Card, Button } from 'react-native-paper';
import usePreference from '../../hooks/usePreferences';
//import Geolocation from '@react-native-community/geolocation';
import Geolocation from 'react-native-geolocation-service';



export async function requestLocationPermission() {
  if (Platform.OS === 'android') {
    const isGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    if (isGranted) {
      console.log("ya setienen esos permisos ")
      let enabled = false
      if (enabled) {
        console.log("no esta encendido")
      } else {
        //setLocationServiceEnabled(enabled);
        console.log("encendido")
      }
      return true;
    }
  }
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'Active la Geolocalizacion',
        'message': 'Valla a permisos de la Aplicacion'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("se puede usar la locacion")
    } else {
      console.log("permiso denegado")
    }
  } catch (err) {
    console.warn(err)
  }
}


const MyComponent = () => {
  const [contador, guardarContador] = React.useState(1);


  React.useEffect(async () => {
    
    try {
      await requestLocationPermission()
    } catch (e) {
      console.error(e, 'El error');
    }
  }, [])

  function geoSucces(info) {
   
     guardarContador(1+contador)
  }
  function errorgeo(error) {
   
     console.log('asdfasdfasdfasdf',error)
  }


  React.useEffect(() => {
    
    try {
    Geolocation.getCurrentPosition(geoSucces, errorgeo, {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},);

    } catch (e) {
      console.log(e, 'ERROR')
    }

  }, [])





  const { theme } = usePreference();
  return (

    <>

    </>

  )
};

export default MyComponent;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#192734',
  },
  button_view: {
    margin: 4,
    borderRadius: 4,
    backgroundColor: '#8d4dfc',
    alignItems: 'center',
  },
  button_text: {
    padding: 6,
    fontSize: 16,
    fontWeight: '600'
  },
  containerB: {
    backgroundColor: '#192734',
    flex: 1,
    padding: 10,
  },
});




