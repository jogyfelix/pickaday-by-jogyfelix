import React from 'react';
import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-remix-icon';
import propTypes from 'prop-types';
import {format} from 'date-fns';

const HomeListPortrait = ({image, location, temperature, date}) => {
  const splitDate = date => {
    const [day, month] = format(new Date(date.toDate()), 'dd/MMM/yyyy').split(
      '/',
    );
    return `${day}\n${month}`;
  };
  return (
    <View style={styles.parent}>
      <ImageBackground
        style={styles.imageStyle}
        resizeMode="cover"
        source={{uri: image}}>
        <LinearGradient
          locations={[0, 1.0]}
          colors={['rgba(0,0,0,0.00)', 'rgba(0,0,0,0.80)']}
          style={styles.gradientStyle}
        />
        <View style={styles.locationView}>
          <Icon name="ri-map-pin-3-line" size="18" color="white"></Icon>
          <Text style={styles.locationText}>{location}</Text>
        </View>
        <View style={styles.tempView}>
          <Text style={styles.tempText}>{temperature}°</Text>
          <Icon name="ri-sun-line" size="18" color="white"></Icon>
        </View>
        <Text style={styles.dateText}>{splitDate(date)}</Text>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {width: '50%'},
  imageStyle: {
    width: '100%',
    height: '100%',
  },
  gradientStyle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  locationView: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 8,
    left: 8,
  },
  locationText: {color: 'white', marginLeft: 4},
  tempView: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 8,
    right: 8,
  },
  tempText: {color: 'white', marginRight: 4, fontWeight: 'bold'},
  dateText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    position: 'absolute',
    right: 16,
    top: 8,
  },
});

HomeListPortrait.propTypes = {
  image: propTypes.string.isRequired,
  location: propTypes.string.isRequired,
  temperature: propTypes.number.isRequired,
  date: propTypes.object.isRequired,
};

export default HomeListPortrait;
