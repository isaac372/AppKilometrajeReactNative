import React, {useState, useEffect} from 'react';
import {map, size} from 'lodash';
import {StyleSheet, View, ScrollView, SafeAreaView} from 'react-native';
import {Divider, List, Searchbar} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {SearchCarcode} from '../../../actions/PendienteActions';
import Activity from '../../components/ActivityIndicator';
import Avatar from '../Avatar';
import SnakMensaje from '../../components/SnakBar';

export default function Search({navigation}) {
  const dispatch = useDispatch();
  const stateUser = useSelector(state => state.login);
  const {CompañiaUsuario} = stateUser.user;
  const IdRelacion = CompañiaUsuario
    ? CompañiaUsuario[0].ListaRol[0].EntityIDCompaniaRolUsuario
    : 0;
  const stateSearch = useSelector(state => state.pendientes);

  const [search, setSearch] = useState('');
  const [cantida, setcantidad] = useState(false);
  const Buscar = e => {
    e.preventDefault();
    dispatch(SearchCarcode(IdRelacion, search));
    setcantidad(true);
  };
  const SizeRegister = size(stateSearch.search);
  const MensajeData = stateSearch.Mensaje.length === 0 ? false : true;
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Searchbar
          placeholder="Ingrese el codigo del Socio"
          icon="magnify"
          style={styles.input}
          onChangeText={e => setSearch(e)}
          onSubmitEditing={Buscar}
        />
      </View>
      {stateSearch.loading && <Activity />}
      <ScrollView style={styles.scrollView}>
        {cantida && SizeRegister === 0 && (
          <Avatar
            titleIcon="emoticon-sad-outline"
            title="No se encontararon Registros con el Carcode Solicitado"
          />
        )}
        {cantida && SizeRegister > 0 && (
          <>
            <List.Subheader>
              Registros Encontrados: {SizeRegister}
            </List.Subheader>
            {map(stateSearch.search, (Encontrado, index) => (
              <List.Section key={index}>
                <List.Item
                  title={Encontrado.CardCode}
                  description={Encontrado.CardName}
                  left={props => <List.Icon {...props} icon="clipboard-file" />}
                  right={props => (
                    <List.Icon {...props} icon="clipboard-arrow-right" />
                  )}
                  onPress={() => {
                    navigation.navigate('RealizarVisita', {
                      CardCode: Encontrado.CardCode,
                      CardName: Encontrado.CardName,
                      FechaProgramada: '',
                      FechaProximaVisita: '',
                      Hora:"",
                      Type: 0,
                    });
                  }}
                />
                <Divider />
              </List.Section>
            ))}
          </>
        )}
        {MensajeData && (
          <SnakMensaje Mensaje={stateSearch.Mensaje} IdTipo={2} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    marginTop: -3,
    backgroundColor: '#15212b',
  },
  container: {
    top: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  scrollView: {
    marginHorizontal: 20,
  },
});
