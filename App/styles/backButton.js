import styled from 'styled-components';

export const BackButton = styled.TouchableOpacity`
  height: 40px;
  width: 40px;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.4);
  align-items: center;
  justify-content: center;
  margin: 16px;
  elevation: ${props => (props.landScapeMode ? '100' : '0')};
  position: ${props => (props.editView ? 'absolute' : 'relative')};
`;
