import { StyleSheet } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import PickerComponent from '../../components/PickerComponent';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <PickerComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
