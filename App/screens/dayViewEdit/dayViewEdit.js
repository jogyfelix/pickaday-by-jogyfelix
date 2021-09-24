import React, {useEffect, useState} from 'react';
import {
  View,
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
import {BackButton} from 'App/styles/backButton';

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
    try {
      firestore().collection('daysDetails').doc(docId).update({
        thoughts: thought,
      });
    } catch (error) {
      showShortSnackBar(strings.WRONG_ALERT);
    }
  };

  const upload = async () => {
    try {
      const uploadUri = item.image.replace('file://', '');
      const reference = storage().ref(
        item.location + userDetails.email + Math.round(Math.random() * 1000),
      );
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

      <BackButton
        landScapeMode={height > width ? false : true}
        editView={true}
        onPress={() => navigation.goBack()}>
        <Icon name="ri-arrow-left-s-line" size="20" color="white" />
      </BackButton>
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
});

const mapStateToProps = state => {
  return {userDetails: state.userDetails};
};

export default connect(mapStateToProps)(dayViewEdit);
