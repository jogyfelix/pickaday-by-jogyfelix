import React from 'react';
import {View, Text, Image, useWindowDimensions, StyleSheet} from 'react-native';
import {theme} from 'App/theme';
import Icon from 'react-native-remix-icon';
import {format} from 'date-fns';
import {BackButton} from 'App/styles/backButton';

const dayView = ({route, navigation}) => {
  const item = route.params;
  const {height, width} = useWindowDimensions();
  const splitDate = () => {
    const dateVal = format(
      new Date(item.item.date.toDate()),
      'EEEE, MMM dd yyyy',
    ).split('/');
    return dateVal;
  };

  return (
    <View style={styles.parent}>
      <Image
        resizeMode="cover"
        style={
          width > height
            ? styles.imageLand
            : // eslint-disable-next-line react-native/no-inline-styles
              {
                width: '100%',
                height: height / 4,
                alignSelf: 'center',
                position: 'absolute',
              }
        }
        source={{uri: item.item.image}}
      />

      <View style={styles.detailsParent}>
        <Text style={styles.dateText}>{splitDate()}</Text>
        <View
          style={
            width > height
              ? // eslint-disable-next-line react-native/no-inline-styles
                {
                  flexDirection: 'row',
                  flex: 1,
                  marginTop: 4,
                  width: width / 2.5,
                }
              : styles.portSubParent
          }>
          <Icon name="ri-map-pin-3-line" size="18" color="white"></Icon>
          <Text style={styles.locationText}>{item.item.location}</Text>
          <View style={styles.temperatureParent}>
            <Text style={{color: theme.colors.white}}>
              {item.item.temperature}°
            </Text>
            <Icon name="ri-sun-line" size="18" color="white"></Icon>
          </View>
        </View>
        <Text
          style={
            width > height
              ? // eslint-disable-next-line react-native/no-inline-styles
                {
                  marginVertical: 10,
                  fontSize: 16,
                  color: theme.colors.white,
                  width: width / 2.5,
                }
              : styles.thoughtsParentPort
          }>
          {item.item.thoughts}
        </Text>
      </View>
      <BackButton
        landScapeMode={height > width ? false : true}
        editView={false}
        onPress={() => navigation.goBack()}>
        <Icon name="ri-arrow-left-s-line" size="20" color="white" />
      </BackButton>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    backgroundColor: theme.colors.darkBackground,
    flex: 1,
    flexDirection: 'row',
  },
  imageLand: {width: '100%', height: '100%', position: 'absolute'},
  detailsParent: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 16,
  },
  dateText: {color: theme.colors.white, fontSize: 18, fontWeight: 'bold'},
  portSubParent: {flexDirection: 'row', flex: 1, marginTop: 4},
  locationText: {color: theme.colors.white},
  temperatureParent: {flexDirection: 'row', position: 'absolute', right: 0},
  thoughtsParentPort: {
    marginVertical: 10,
    fontSize: 16,
    color: theme.colors.white,
  },
});

export default dayView;
