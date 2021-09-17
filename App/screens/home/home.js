import React, {useEffect, useState} from 'react';
import {FlatList, useWindowDimensions} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import HomeListItem from '../../components/homeListItem';
import {showShortSnackBar} from '../../components/snackBar';

const home = ({route}) => {
  const {height, width} = useWindowDimensions();
  const [dayDetails, setDayDetails] = useState([]);
  const params = route.params;

  const getData = async () => {
    try {
      setDayDetails([]);
      const data = await firestore()
        .collection('daysDetails')
        .where('uid', '==', params.uid)
        .get();

      data.forEach(querySnapshot => {
        setDayDetails(oldDetails => [...oldDetails, querySnapshot.data()]);
      });
    } catch (error) {
      showShortSnackBar('Something went wrong.Please try again');
    }
  };

  useEffect(() => {
    getData();
   
  }, []);

  return height > width ? (
    <FlatList
      key={1}
      data={dayDetails}
      keyExtractor={(item, index) => index.toString()}
      numColumns={1}
      renderItem={({item}) => {
        return <HomeListItem {...item} />;
      }}
    />
  ) : (
    <FlatList
      data={dayDetails}
      key={2}
      keyExtractor={(item, index) => index.toString()}
      numColumns={2}
      renderItem={({item}) => {
        return <HomeListItem {...item} />;
      }}
    />
  );
};

export default home;
