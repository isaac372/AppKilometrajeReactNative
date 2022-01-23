import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Title, Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import {
  SeleccionDeRol,
  GuardarCompanySelected,
} from '../../actions/compañiaActions';

const Company = ({ navigation }) => {
  const ListaCompañia = useSelector(state => state.company);
  const dispatch = useDispatch();
  return (
    <View style={styles.genreList}>
      <Card style={styles.Card}>
        <Card.Content>
          {ListaCompañia.company.map(item => {
            return (
              <View key={item.Compania.EntityID}>
                <Button
                  uppercase={false}
                  onPress={() => {
                    dispatch(GuardarCompanySelected(item));
                    dispatch(SeleccionDeRol(item.ListaRol));
                    navigation.navigate('Rol');
                  }}>
                  <Title>{item.Compania.NombreCompañia}</Title>
                </Button>
              </View>
            );
          })}
        </Card.Content>
      </Card>
    </View>

  );
};

export default Company;


const styles = StyleSheet.create({
  genreList: {
    marginTop: 30,
    marginBottom: 15,
    paddingHorizontal: 20,
    padding: 50
  },
  Card: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomEndRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});