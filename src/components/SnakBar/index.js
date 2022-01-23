import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {Snackbar} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {CancelarSnackMessaje} from '../../../actions/CancelacionSnack';

const MyComponent = ({Mensaje, IdTipo}) => {
  const dispatch = useDispatch();
  const onDismissSnackBar = () => dispatch(CancelarSnackMessaje(IdTipo));
  return (
    <View style={styles.container}>
      <Snackbar
        duration={3000}
        visible={Mensaje.Resultado}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Cerrar',
          onPress: () => {
            // Do something
          },
        }}>
        {Mensaje.Mensaje}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default MyComponent;
