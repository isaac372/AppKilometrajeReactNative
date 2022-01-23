import React, {useEffect} from 'react';
import {map} from 'lodash';
import {StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Pendientes} from '../../../actions/PendienteActions';
import Activity from '../../components/ActivityIndicator';
import Avatar from '../Avatar';
import SnakMensaje from '../../components/SnakBar';
import {List, Divider} from 'react-native-paper';
import moment from 'moment';
import 'moment/locale/es';

const Pendiente = ({navigation}) => {
  const dispatch = useDispatch();

  const stateUser = useSelector(state => state.login);
  const {CompañiaUsuario} = stateUser.user;
  const IdRelacion = CompañiaUsuario
    ? CompañiaUsuario[0].ListaRol[0].EntityIDCompaniaRolUsuario
    : 0;
  const statePendientes = useSelector(state => state.pendientes);

  useEffect(() => {
    const unsubscribe = navigation.addListener('state', e => {
      if (e.data.state.index === 0) {
        dispatch(Pendientes(IdRelacion));
      }
    });
    return unsubscribe;
  }, [navigation]);

  const MensajeData = statePendientes.Mensaje.length === 0 ? false : true;
  return (
    <SafeAreaView>
      <ScrollView style={styles.scrollView}>
        {statePendientes.loading ? (
          <Activity />
        ) : statePendientes.pendiente.length > 0 ? (
          map(statePendientes.pendiente, (pendient, index) => (
            <List.Section key={index}>
              <List.Subheader>
                {moment(pendient.FechaProgramada).format('LL')}
              </List.Subheader>
              <List.Item
                title={pendient.Titulo}
                description={pendient.CardName}
                left={() => <List.Icon icon="file-account" />}
                onPress={() => {
                  navigation.navigate('RealizarVisita', {
                    CardCode: pendient.CardCode,
                    CardName: pendient.CardName,
                    Titulo: pendient.Titulo,
                    Contacto: pendient.Contacto,
                    Hora: pendient.Hora,
                    FechaProgramada: pendient.FechaProgramada,
                    FechaProximaVisita: pendient.FechaProximaVisita,
                    HasFechaProximaVisita:pendient.HasFechaProximaVisita,
                    HasHora:pendient.HasHora,
                    IdRegistro: pendient.IdRegistro,
                    Minuta: pendient.Minuta,
                    Comentario: pendient.Comentario,
                    Type: 1,
                  });
                }}
              />
              <List.Item
                title={pendient.Contacto}
                description={' Hora ' + pendient.Hora}
              />
              <Divider />
            </List.Section>
          ))
        ) : (
          <Avatar
            titleIcon="emoticon-sad-outline"
            title="No se encontararon Pendientes"
          />
        )}
        {MensajeData && (
          <SnakMensaje Mensaje={statePendientes.Mensaje} IdTipo={2} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 25,
    fontWeight: '500',
  },
  scrollView: {
    marginHorizontal: 20,
  },
});

export default Pendiente;
