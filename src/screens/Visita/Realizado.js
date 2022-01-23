import React, {useEffect} from 'react';
import {map} from 'lodash';
import {StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Realizados} from '../../../actions/PendienteActions';
import Avatar from '../Avatar';
import Activity from '../../components/ActivityIndicator';
import {List, Divider, Text} from 'react-native-paper';
import moment from 'moment';
import 'moment/locale/es';
import Search from './Searchbar';
import SnakMensaje from '../../components/SnakBar';

const Realizado = ({navigation}) => {
  const dispatch = useDispatch();
  const stateUser = useSelector(state => state.login);
  const {CompañiaUsuario} = stateUser.user;
  const IdRelacion = CompañiaUsuario
    ? CompañiaUsuario[0].ListaRol[0].EntityIDCompaniaRolUsuario
    : 0;
  const stateRealizados = useSelector(state => state.pendientes);

  useEffect(() => {
    const unsubscribe = navigation.addListener('state', e => {
      if (e.data.state.index === 1) {
        dispatch(Realizados(IdRelacion));
      }
    });
    return unsubscribe;
  }, [navigation]);

  const MensajeData = stateRealizados.Mensaje.length === 0 ? false : true;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Search IdRelacion={IdRelacion} />
        {stateRealizados.loading ? (
          <Activity />
        ) : stateRealizados.realizado.length > 0 ? (
          map(stateRealizados.realizado, (pendient, index) => (
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
                    HasFechaProximaVisita: pendient.HasFechaProximaVisita,
                    HasHora: pendient.HasHora,
                    IdRegistro: pendient.IdRegistro,
                    Minuta: pendient.Minuta,
                    Comentario: pendient.Comentario,
                    Type: 2,
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
            title="No se encontararon Realizados"
          />
        )}
        {MensajeData && (
          <SnakMensaje Mensaje={stateRealizados.Mensaje} IdTipo={2} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 25,
    fontWeight: '500',
  },
  scrollView: {
    marginHorizontal: 20,
  },
});

export default Realizado;
