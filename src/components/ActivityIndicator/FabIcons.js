import * as React from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { ActualizarRutasState } from "../../../actions/RutaActions";
import { ActualizarFabEnruta } from '../../../actions/EnRutaActions';
import { ActualizarFinalizarState, RutasEstadoFinalizados } from '../../../actions/FinalizadoActions';


const MyComponent = ({ tipo }) => {
    const dispatch = useDispatch();
    const states = useSelector(state => state.login);
    const { EmpID } = states.user;
    const Ruta = useSelector(state => state.rutas);
    const Enruta = useSelector(state => state.enruta);
    const finalizados = useSelector(state => state.finalizados);
    switch (tipo) {
        case 1: return <FAB
            style={styles.fab}
            icon="refresh"
            onPress={() => dispatch(ActualizarRutasState(Ruta.rutas, EmpID))}
        />
        case 2: return <FAB
            style={styles.fab}
            icon="refresh"
            onPress={() => dispatch(ActualizarFabEnruta(Enruta.enruta, EmpID))}
        />
        case 3: return <>
            <FAB
                style={styles.fab}
                icon="transit-transfer"
                onPress={() => dispatch(RutasEstadoFinalizados(EmpID))}
            />
            <FAB
                style={styles.fab2}
                icon="refresh"
                onPress={() => dispatch(ActualizarFinalizarState(finalizados.finalizadas, EmpID))}
            /></>

    }

}
export default MyComponent;

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    fab2: {
        position: 'absolute',
        margin: 16,
        bottom: 0,
        right: 70,
    }

})
