import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-remix-icon';
import colors from '../constants/colors';
import propTypes from 'prop-types';

const styles = StyleSheet.create({
  fab: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50,
    borderRadius: 30,
    top: -16,
    backgroundColor: colors.appPrimary,
  },
});

const Fab = ({onPress}) => {
  return (
    <>
      <TouchableOpacity onPress={onPress} style={styles.fab}>
        <Icon name="ri-add-fill" size="28" color="white" />
      </TouchableOpacity>
    </>
  );
};

Fab.propTypes = {
  onPress: propTypes.func.isRequired,
};

export default Fab;
