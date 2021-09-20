import React from 'react';
import {
  View,
  TouchableOpacity,
  useWindowDimensions,
  TextInput,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-remix-icon';
import HomeListItem from '../../components/homeListItem';
import HomeListPortrait from '../../components/homeListPortrait';

const dayViewEdit = ({route, navigation}) => {
  const item = route.params;
  const {height, width} = useWindowDimensions();
  return (
    <View style={styles.parent}>
      {width > height ? (
        <View style={styles.landParent}>
          <HomeListPortrait {...item.item} />

          <TextInput
            placeholder="Type your thoughts..."
            style={styles.landInput}
          />
        </View>
      ) : (
        <View style={styles.portParent}>
          <HomeListItem {...item.item} />

          <TextInput
            placeholder="Type your thoughts..."
            style={styles.portInput}
          />
        </View>
      )}

      <TouchableOpacity
        style={width > height ? styles.backBtnLand : styles.backBtnPort}
        onPress={() => navigation.goBack()}>
        <Icon name="ri-arrow-left-s-line" size="20" color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  landParent: {flexDirection: 'row'},
  landInput: {
    fontSize: 18,
    alignSelf: 'flex-start',
    marginLeft: 16,
  },
  portParent: {
    width: '100%',
    position: 'absolute',
  },
  portInput: {
    marginHorizontal: 16,
    fontSize: 18,
  },
  backBtnLand: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16,
    elevation: 100,
    position: 'absolute',
  },
  backBtnPort: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16,
  },
});

export default dayViewEdit;
