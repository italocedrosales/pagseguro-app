import React from 'react';
import { Button, NativeModules } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Container } from './style';

const ToastModules = NativeModules.ToastTest;

function Pay() {
  function handleToast() {
    ToastModules.show('Hello World', ToastModules.SHORT);
  }

  return (
    <Container>
      <Ionicons
        name="rocket"
        size={100}
        color="#7159c1"
        style={{ marginBottom: 50, alignSelf: 'center' }}
      />
      <Button title="Pagar" onPress={handleToast} style={{ flex: 1 }} />
    </Container>
  );
}

export default Pay;
