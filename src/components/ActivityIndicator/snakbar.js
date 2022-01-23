import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { CancelarSnackMesajeRutas } from '../../../actions/CancelarSnackRutas';

const MyComponent = ({ loadingButtonfab, IdTipo }) => {
    const dispatch = useDispatch();
    const onDismissSnackBar = () => dispatch(CancelarSnackMesajeRutas(IdTipo));

    return (
        <View style={styles.container}>
            <Snackbar
                duration={1000}
                visible={loadingButtonfab}
                onDismiss={onDismissSnackBar}
                action={{
                    label: 'Cerrar',
                    onPress: () => {
                        // Do something
                    },
                }}>
                Actualizando ...
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