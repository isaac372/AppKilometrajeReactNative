import * as React from 'react';
import {Button} from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {RealizadosByfecha} from '../../../actions/PendienteActions';
import {useDispatch} from 'react-redux';

const Search = ({IdRelacion}) => {
  const dispatch = useDispatch();
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
  const onChangeSearch = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = dates => {
    const searchdate = new Date(dates);
    const year = new Date(searchdate).getFullYear();
    const month = new Date(searchdate).getMonth() + 1;
    const dia = new Date(searchdate).getDate();

    const filtermes = month < 10 ? '0' + month : month;
    const filterDia = dia < 10 ? '0' + dia : dia;

    const fechaActual = year + '-' + filtermes + '-' + filterDia;

    dispatch(RealizadosByfecha(IdRelacion, fechaActual));
    hideDatePicker();
  };

  return (
    <>
      <Button
        icon="file-search-outline"
        mode="text"
        uppercase={false}
        onPress={() => onChangeSearch()}>
        buscar por fecha
      </Button>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        locale="es"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </>
  );
};

export default Search;
