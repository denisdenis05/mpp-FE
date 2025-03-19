import { Dispatch, SetStateAction } from "react";
import { InputContainer, InputTitle, StyledInput } from "./InputField.style";

const InputField = ({
  title,
  value,
  onChange,
}: {
  title: string;
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <InputContainer>
      <InputTitle>{title}</InputTitle>
      {isNaN(parseInt(value)) && (
        <StyledInput
          value={value}
          type="text"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            onChange(event.target.value);
          }}
        />
      )}
      {!isNaN(parseInt(value)) && (
        <StyledInput
          value={value}
          type="number"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            onChange(event.target.value);
          }}
        />
      )}
    </InputContainer>
  );
};

export default InputField;
