import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  useWindowDimensions,
  TextInput,
  StyleSheet,
  BackHandler,
} from 'react-native';
import Icon from 'react-native-remix-icon';
import HomeListItem from '../../components/homeListItem';
import HomeListPortrait from '../../components/homeListPortrait';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import screenNames from 'App/constants/screenNames';
import {connect} from 'react-redux';
import {showShortSnackBar} from '../../components/snackBar';
import strings from 'App/constants/strings';

const dayViewEdit = ({route, navigation, userDetails}) => {
  const item = route.params.params;

  const [docId, setDocId] = useState('');
  const [thought, setThought] = useState('');

  useEffect(() => {
    upload();
  }, []);

  const backAction = () => {
    navigation.navigate(screenNames.home);
    return true;
  };

  BackHandler.addEventListener('hardwareBackPress', backAction);

  const updateThought = () => {
    firestore().collection('daysDetails').doc(docId).update({
      thoughts: thought,
    });
  };

  const upload = async () => {
    try {
      const uploadUri = item.image.replace('file://', '');
      const reference = storage().ref(item.location + userDetails.email);
      await reference.putFile(uploadUri);

      const url = await storage()
        .ref(`${item.location}userName`)
        .getDownloadURL();

      const uploadData = await firestore().collection('daysDetails').add({
        date: item.date,
        image: url,
        location: item.location,
        temperature: item.temperature,
        thoughts: '',
        uid: userDetails.uid,
      });
      setDocId(uploadData._documentPath._parts[1]);
    } catch (error) {
      showShortSnackBar(strings.WRONG_ALERT);
    }
  };

  const {height, width} = useWindowDimensions();
  return (
    <View style={styles.parent}>
      {width > height ? (
        <View style={styles.landParent}>
          <HomeListPortrait {...item} />

          <TextInput
            placeholder="Type your thoughts..."
            style={styles.landInput}
          />
        </View>
      ) : (
        <View style={styles.portParent}>
          <HomeListItem {...item} />

          <TextInput
            placeholder="Type your thoughts..."
            style={styles.portInput}
            autoCapitalize="none"
            autoCorrect={false}
            value={thought}
            onChangeText={newText => setThought(newText)}
            onSubmitEditing={updateThought}
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

const mapStateToProps = state => {
  return {userDetails: state.userDetails};
};

export default connect(mapStateToProps)(dayViewEdit);
