import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Title, Button, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { GuardarRolSelected } from '../../actions/compañiaActions';

const Rol = ({ navigation }) => {
  const ListaRol = useSelector(state => state.company);
  const dispatch = useDispatch();
  return (
    <View style={styles.genreList}>
      <Card style={styles.Card}>
        <Card.Content>
          {ListaRol.rolList.map(rol => {
            return (
              <View key={rol.EntityID}>
                <Button
                  uppercase={false}
                  onPress={() => {
                    dispatch(GuardarRolSelected(rol));
                    navigation.navigate('Home');
                  }}>
                  <Text >{rol.NombreRol}</Text>
                </Button>
              </View>
            );
          })}
        </Card.Content>
      </Card>
    </View>
  );
};

export default Rol;

const styles = StyleSheet.create({
  genreList: {
    marginTop: 30,
    marginBottom: 15,
    paddingHorizontal: 20,
    padding: 50,
  },
  Card: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomEndRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});