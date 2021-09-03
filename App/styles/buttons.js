import React from 'react';
import styled from 'styled-components';
import colors from '../constants/colors';
import propTypes from 'prop-types';

const TouchOpacity = styled.TouchableOpacity`
  margin-top: 30px;
  height: 42px;
  width: ${props => (props.landscapeMode ? '400px' : '100%')};
  border-radius: 8px;
  elevation: 5;
  align-items: center;
  background-color: ${colors.appPrimary};
`;

const LoadingIndicator = styled.ActivityIndicator`
  margin-vertical: ${props => (props.landscapeMode ? '10px' : '12px')}; ;
`;

const ButtonText = styled.Text`
  color: ${colors.white};
  margin-vertical: 12px;
`;

export const LoginButton = ({
  landscapeMode,
  onPress,
  text,
  loadingIndicator,
  size,
  color,
}) => {
  return (
    <TouchOpacity landscapeMode={landscapeMode} onPress={onPress}>
      {loadingIndicator ? (
        <LoadingIndicator
          animating={loadingIndicator}
          size={size}
          color={color}
        />
      ) : (
        <ButtonText>{text}</ButtonText>
      )}
    </TouchOpacity>
  );
};

LoginButton.propTypes = {
  landscapeMode: propTypes.bool.isRequired,
  onPress: propTypes.func.isRequired,
  text: propTypes.string.isRequired,
  loadingIndicator: propTypes.bool.isRequired,
  size: propTypes.string.isRequired,
  color: propTypes.string.isRequired,
};
