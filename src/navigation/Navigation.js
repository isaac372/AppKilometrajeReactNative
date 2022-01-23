import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from './DrawerContent';
import StackNavigation from './StackNavigation';
import { useSelector } from 'react-redux';

const Drawer = createDrawerNavigator();

export default function Navigation() {
  const statess = useSelector(state => state.login);
  return (
    <Drawer.Navigator
      initialRouteName="app"
      drawerContent={props => statess.user.length === 0 ? null : <DrawerContent {...props} />}>
      <Drawer.Screen name="app" component={StackNavigation}
        options={{
          headerShown: false
        }}
      />
    </Drawer.Navigator>
  );
}
