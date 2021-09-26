import React, {useEffect, useState} from 'react';
import {FlatList, useWindowDimensions, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import HomeListItem from '../../components/homeListItem';
import {showShortSnackBar} from '../../components/snackBar';
import screenNames from 'App/constants/screenNames';
import strings from 'App/constants/strings';
import {useSelector} from 'react-redux';

const home = ({navigation}) => {
  const {height, width} = useWindowDimensions();
  const [dayDetails, setDayDetails] = useState([]);
  const userDetails = useSelector(state => state.userDetails);

  const getData = async () => {
    try {
      setDayDetails([]);
      const data = await firestore()
        .collection('daysDetails')
        .where('uid', '==', userDetails.uid)
        .get();

      data.forEach(querySnapshot => {
        setDayDetails(oldDetails => [...oldDetails, querySnapshot.data()]);
      });
    } catch (error) {
      showShortSnackBar(strings.WRONG_ALERT);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData();
    });
    return unsubscribe;
  }, [navigation]);

  return height > width ? (
    <FlatList
      key={1}
      data={dayDetails}
      keyExtractor={(item, index) => index.toString()}
      numColumns={1}
      renderItem={({item}) => {
        return (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(screenNames.dayView, {
                item: item,
              });
            }}>
            <HomeListItem {...item} />
          </TouchableOpacity>
        );
      }}
    />
  ) : (
    <FlatList
      data={dayDetails}
      key={2}
      keyExtractor={(item, index) => index.toString()}
      numColumns={2}
      renderItem={({item}) => {
        return (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(screenNames.dayView, {
                item: item,
              });
            }}>
            <HomeListItem {...item} />
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default home;
