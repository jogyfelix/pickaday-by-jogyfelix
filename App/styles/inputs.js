import styled from 'styled-components';

export const LoginInput = styled.TextInput.attrs(props => ({
  secureTextEntry: props.password ? true : false,
}))`
  border-width: 1.5px;
  border-color: ${props =>
    props.password ? props.theme.colors.border : props.theme.colors.appPrimary};
  margin-top: 16px;
  height: 42px;
  width: ${props => (props.landscapeMode ? '400px' : '100%')};
  padding: 10px;
  font-size: 16px;
  border-radius: 8px;
  background-color: ${props => props.theme.colors.lightGray};
`;
