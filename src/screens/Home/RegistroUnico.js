import * as React from 'react';
import {Image, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {Button, Divider, FAB, List, TextInput} from 'react-native-paper';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {
  CreateRegistroUnico,
  LoadingRegister,
  LoadingRegisterUnico,
} from '../../../actions/RegistroUbicacionAction';
import {useDispatch, useSelector} from 'react-redux';
import Activity from '../../components/ActivityIndicator';
import {
  locationPermission,
  getCurrentLocation,
} from '../Configuracion/helperGeocalizacion';

const RegistroUnico = ({navigation}) => {
  const dispatch = useDispatch();

  const stateRegister = useSelector(state => state.RegistroUbi);
  const stateUser = useSelector(state => state.login);
  const {CompañiaUsuario} = stateUser.user;
  const IdRela = CompañiaUsuario
    ? CompañiaUsuario[0].ListaRol[0].EntityIDCompaniaRolUsuario
    : 0;

  const [Simage, setimage] = React.useState('');
  const [data, setdata] = React.useState({
    Kilometraje: '',
    Comentario: '',
    Latitud: 0,
    Longitud: 0,
    IdRelacion: IdRela,
    AuxBase64Image: '',
  });

  const selectImage = () => {
    const options = {
      title: 'Selecciona Imagen',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      quality: 0,
      includeBase64: true,
    };

    launchImageLibrary(options, response => {
      if (response.errorCode) {
        console.log(response.errorMessage);
      } else if (response.didCancel) {
        console.log('el usuario cancelo la seleccion');
      } else {
        let existe = false;
        do {
          if (response.assets[0].base64 != '') {
            setdata({
              ...data,
              AuxBase64Image: response.assets[0].base64,
            });
            existe = true;
          }
        } while (!existe);
        const uri = response.assets[0].uri;
        setimage(uri);
      }
    });
  };

  const takepicture = () => {
    const options = {
      title: 'Tomar una Foto',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      quality: 0,
      includeBase64: true,
    };
    launchCamera(options, response => {
      if (response.errorCode) {
        console.log(response.errorMessage);
      } else if (response.didCancel) {
        console.log('el usuario cancelo la seleccion');
      } else {
        let existe = false;
        do {
          if (response.assets[0].base64 != '') {
            setdata({
              ...data,
              AuxBase64Image: response.assets[0].base64,
            });
            existe = true;
          }
        } while (!existe);

        const uri = response.assets[0].uri;
        setimage(uri);
      }
    });
  };

  const CrearRegistro = () => {
    dispatch(LoadingRegisterUnico(true));
    const getLiveLocation = async () => {
      const locPermissionDenied = await locationPermission();
      if (locPermissionDenied) {
        const {latitude, longitude} = await getCurrentLocation();
        dispatch(CreateRegistroUnico(data, navigation, latitude, longitude));
      } else {
        dispatch(LoadingRegisterUnico(false));
      }
    };
    getLiveLocation();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.TextInputStyle}>
          <TextInput
            mode="outlined"
            label="Kilometraje"
            value={data.Kilometraje.toString()}
            onChangeText={text => setdata({...data, Kilometraje: text})}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.TextInputStyle}>
          <TextInput
            style={styles.comentsStyle}
            mode="outlined"
            label="Comentario"
            value={data.Comentario}
            onChangeText={text => setdata({...data, Comentario: text})}
          />
        </View>
        <View style={styles.buttonstyle}>
          <Button
            icon="camera-burst"
            mode="outlined"
            uppercase={false}
            onPress={selectImage}>
            seleccionar Imagen
          </Button>
          <Button
            icon="camera-plus"
            mode="outlined"
            uppercase={false}
            onPress={takepicture}>
            Tomar foto
          </Button>
        </View>
        {Simage != '' && (
          <View style={styles.viewImage}>
            <Image style={styles.imageStyle} source={{uri: Simage}} />
          </View>
        )}
        {stateRegister.loading ? (
          <Activity />
        ) : (
          <FAB
            style={styles.fab}
            label="Crear"
            icon="map-marker-path"
            uppercase={false}
            onPress={() => CrearRegistro()}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  TextInputStyle: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 5,
  },
  comentsStyle: {
    paddingBottom: 80,
  },
  fab: {
    position: 'relative',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  buttonstyle: {
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    alignSelf: 'center',
    height: 300,
    width: 330,
  },
  viewImage: {
    paddingTop: 10,
    paddingBottom: 10,
  },
});

export default RegistroUnico;
