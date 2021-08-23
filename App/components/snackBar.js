import Snackbar from 'react-native-snackbar';

export const showShortSnackBar = message => {
  Snackbar.show({
    text: message,
    duration: Snackbar.LENGTH_SHORT,
  });
};
