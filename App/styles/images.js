import styled from 'styled-components';

export const LogoImage = styled.Image`
  height: ${props => (props.landscapeMode ? '30px' : '50px')};
  width: 100px;
`;
