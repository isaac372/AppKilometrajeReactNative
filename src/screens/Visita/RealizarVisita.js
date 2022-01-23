import * as React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {
  Button,
  Divider,
  List,
  Switch,
  Text,
  TextInput,
} from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import 'moment/locale/es';
import {useDispatch, useSelector} from 'react-redux';
import {
  locationPermission,
  getCurrentLocation,
} from '../Configuracion/helperGeocalizacion';
import Activity from '../../components/ActivityIndicator';
import {
  CreateVisita,
  LoadingUpdateVisita,
  UpdateVisita,
} from '../../../actions/PendienteActions';

const RealizarVisita = ({route, navigation}) => {
  const dispatch = useDispatch();
  const statePendientes = useSelector(state => state.pendientes);
  const {
    CardCode,
    CardName,
    Titulo,
    Contacto,
    Hora,
    FechaProgramada,
    FechaProximaVisita,
    IdRegistro,
    Minuta,
    Comentario,
    HasHora,
    HasFechaProximaVisita,
    Type,
  } = route.params;
  /// Id Relacion
  const stateUser = useSelector(state => state.login);
  const {CompañiaUsuario} = stateUser.user;
  const IdRelacion = CompañiaUsuario
    ? CompañiaUsuario[0].ListaRol[0].EntityIDCompaniaRolUsuario
    : 0;

  const [data, setData] = React.useState({
    Titulo: Titulo,
    Contacto: Contacto,
    Hora: Hora,
    FechaProgramada: FechaProgramada,
    FechaProximaVisita: FechaProximaVisita,
    Minuta: Minuta,
    Comentario: Comentario,
    Latitud: 0,
    Longitud: 0,
    IdRelacion: IdRelacion,
    CardCode: CardCode,
    HasFechaProximaVisita: HasFechaProximaVisita,
    HasHora: HasHora,
    Proceso: 0,
    IdRegistro: IdRegistro,
  });

  const [isSwitchOn, setIsSwitchOn] = React.useState({
    A: false,
    B: false,
  });
  /////Error
  const [errorHora, seterrorHora] = React.useState(false);
  const [errorFecha, seterrorFecha] = React.useState(false);

  const onToggleSwitchA = () => {
    setIsSwitchOn({
      ...isSwitchOn,
      A: !isSwitchOn.A,
    });

    if (!isSwitchOn.A) {
      setDatePickerVisibility(true);
    }
  };

  const onToggleSwitchB = () => {
    setIsSwitchOn({
      ...isSwitchOn,
      B: !isSwitchOn.B,
    });
    if (!isSwitchOn.B) {
      setDatePickerVisibilityHour(true);
    }
  };

  ////Data piker
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
  const [isDatePickerVisibleHour, setDatePickerVisibilityHour] =
    React.useState(false);

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
    setIsSwitchOn({...isSwitchOn, A: false});
  };
  const handleConfirm = date => {
    const newDate = new Date(date);
    setData({
      ...data,
      FechaProximaVisita: newDate,
      HasFechaProximaVisita: true,
    });
    hideDatePicker();
  };

  const hideDatePickerHour = () => {
    setDatePickerVisibilityHour(false);
    setIsSwitchOn({...isSwitchOn, B: false});
  };
  const handleConfirmHour = date => {
    const newDate = new Date(date);
    seterrorHora(validateHour(newDate));
    setData({
      ...data,
      Hora: newDate.getHours() + ':' + newDate.getMinutes() + ':' + 0,
      HasHora: true,
    });
    hideDatePickerHour();
  };
  ////valida fecha
  React.useEffect(() => {
    const hoy = new Date();
    const fechaFormulario = new Date(data.FechaProximaVisita);
    // Comparamos solo las fechas => no las horas!!
    hoy.setHours(0, 0, 0, 0);
    fechaFormulario.setHours(0, 0, 0, 0); // Lo iniciamos a 00:00 horas

    if (hoy <= fechaFormulario) {
      seterrorFecha(false);
    } else {
      seterrorFecha(true);
    }
  }, [data.FechaProximaVisita]);

  ////validacion de hora

  const validateHour = time => {
    const time1 = new Date();

    time1.setHours(time.getHours());
    time1.setMinutes(time.getMinutes());
    const OPEN_HOUR = 7;
    const OPEN_MINUTE = 0;

    const CLOSE_HOUR = 17;
    const CLOSE_MINUTE = 0;

    const open = new Date();
    open.setHours(OPEN_HOUR);
    open.setMinutes(OPEN_MINUTE);
    const close = new Date();
    close.setHours(CLOSE_HOUR);
    close.setMinutes(CLOSE_MINUTE);
    if (time1 >= open && time1 <= close) {
      return false;
    } else {
      return true;
    }
  };

  const Onsubmit = async () => {
    dispatch(LoadingUpdateVisita(true));
    ///Actualizar
    const getLiveLocation = async () => {
      const locPermissionDenied = await locationPermission();
      if (locPermissionDenied) {
        const {latitude, longitude} = await getCurrentLocation();
        dispatch(UpdateVisita(data, navigation, latitude, longitude, Type));
      } else {
        dispatch(LoadingUpdateVisita(false));
      }
    };
    getLiveLocation();
  };
  return (
    <SafeAreaView>
      <ScrollView style={styles.scrollView}>
        <List.Section>
          <List.Subheader>Planificado</List.Subheader>
          <List.Item title={CardCode} />
          <Divider />
          <List.Item title={CardName} />
          <Divider />
          <View style={styles.textInput}>
            <TextInput
              mode="outlined"
              label="Contacto"
              value={data.Contacto}
              onChangeText={text => setData({...data, Contacto: text})}
            />
          </View>
          <Divider />
          <View style={styles.textInput}>
            <TextInput
              mode="outlined"
              label="Tema"
              value={data.Titulo}
              onChangeText={text => setData({...data, Titulo: text})}
            />
          </View>
          <Divider />
          <View style={styles.switch}>
            <Switch value={isSwitchOn.A} onValueChange={onToggleSwitchA} />
            <Text style={styles.text}>Proxima fecha Visita</Text>
          </View>
          <View style={styles.view}>
            {errorFecha && (
              <Text style={{color: 'red'}}>
                La fecha no debe ser menor a la fecha de hoy
                {data.FechaProximaVisita === '' && '  Ingrese una fecha '}
              </Text>
            )}
            <Text>{moment(data.FechaProximaVisita).format('LL')}</Text>
          </View>
          <Divider />
          <View style={styles.switch}>
            <Switch value={isSwitchOn.B} onValueChange={onToggleSwitchB} />

            <Text style={styles.text}>Hora de Proxima Visita</Text>
          </View>

          {errorHora && (
            <Text style={{color: 'red'}}>
              Error el horario tiene que estar entre 7 am a 5 pm
            </Text>
          )}

          {data.Hora === '' && (
            <Text style={{color: 'red'}}>Ingrese una Hora</Text>
          )}

          <View style={styles.view}>
            <Text>{data.Hora}</Text>
          </View>
          <View>
            {isDatePickerVisible && (
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                locale="es"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
            )}
            {isDatePickerVisibleHour && (
              <DateTimePickerModal
                isVisible={isDatePickerVisibleHour}
                mode="time"
                onConfirm={handleConfirmHour}
                onCancel={hideDatePickerHour}
                is24Hour={true}
              />
            )}
          </View>
          <Divider />
          <View style={styles.textInput}>
            <TextInput
              style={styles.textInputIn}
              mode="outlined"
              label="Minuta"
              value={data.Minuta}
              onChangeText={text => setData({...data, Minuta: text})}
            />
          </View>
          <View style={styles.textInput}>
            <TextInput
              style={styles.textInputIn}
              mode="outlined"
              label="Comentario"
              value={data.Comentario}
              onChangeText={text => setData({...data, Comentario: text})}
            />
          </View>
          <View style={styles.textInput}>
            {statePendientes.loading ? (
              <Activity />
            ) : (
              <Button
                style={styles.button}
                disabled={errorFecha || errorHora}
                mode="contained"
                uppercase={false}
                onPress={Onsubmit}>
                {Type === 0 ? 'Crear' : Type === 1 ? 'Realizar' : 'Actualizar'}
              </Button>
            )}
          </View>
        </List.Section>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  textInput: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 20,
  },
  textInputIn: {
    paddingBottom: 20,
  },
  switch: {
    paddingLeft: 10,
    paddingBottom: 10,
    flexDirection: 'row',
  },
  view: {
    paddingBottom: 15,
    paddingLeft: 10,
  },
  text: {
    paddingLeft: 10,
  },
  button: {
    borderRadius: 10,
  },
  scrollView: {
    marginHorizontal: 20,
  },
});

export default RealizarVisita;
