import styled from 'styled-components';

export const LogoContainer = styled.View`
  align-self: center;
  align-items: center;
  margin-vertical: ${props => (props.landscapeMode ? '20px' : '40px')};
`;

export const LoginInputContainer = styled.View`
  flex: 1;
  margin-horizontal: 16px;
  align-self: ${props => (props.landscapeMode ? 'center' : 'stretch')};
`;
