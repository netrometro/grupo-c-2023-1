import * as React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Drawer } from 'react-native-drawer-layout';
import { Entypo } from '@expo/vector-icons';

export function DrawerExample() {
  const [open, setOpen] = React.useState(false);

  return (
    <Drawer
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      renderDrawerContent={() => {
        return <Text>Drawer content</Text>;
      }}
    >
        <TouchableOpacity onPress={() => { setOpen(state => !state) }}>
            <Entypo name="menu" size={36} color="black" style={{ width: 30 }} />
        </TouchableOpacity>
    </Drawer>
  );
}
