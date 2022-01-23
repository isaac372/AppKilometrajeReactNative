import * as React from 'react';
import { Avatar } from 'react-native-paper';

const MyComponent = ({image}) => (

  <Avatar.Image size={100} source={{ uri:`https://www.disdelsa.com/filemanager/file1007/imagenes/profile/${image}` }} />
);
export default MyComponent

