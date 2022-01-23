import * as React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Avatar, Text} from 'react-native-paper';

const AvatarIcon = ({title, titleIcon}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Avatar.Icon style={styles.Avatar} size={100} icon={titleIcon} />
      <Text style={styles.Text}>{title}</Text>
    </SafeAreaView>
  );
};

export default AvatarIcon;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  Avatar: {
    alignSelf: 'center',
  },
  Text: {
    alignSelf: 'center',
  },
});
