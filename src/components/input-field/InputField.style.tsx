import styled from "styled-components";

const InputContainer = styled.div`
  height: fit-content;
  width: fit-content;
`;

const InputTitle = styled.p`
  font-size: 20px;
`;

const StyledInput = styled.input`
  height: 30px;
  width: 200px;
  border-radius: 5px;
  border: none;
  outline: none;
  box-shadow: none;
  font-family: inherit;
`;

export { InputTitle, StyledInput, InputContainer };
