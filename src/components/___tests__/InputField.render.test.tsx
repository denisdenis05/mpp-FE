import { render, screen, fireEvent } from "@testing-library/react";
import InputField from "../input-field";

describe("InputField Component", () => {
  test("calls onChange when input value changes (text input)", () => {
    const mockOnChange = jest.fn();
    render(<InputField title="Test Input" value="" onChange={mockOnChange} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "hello" } });

    expect(mockOnChange).toHaveBeenCalledWith("hello");
  });

  test("calls onChange when input value changes (number input)", () => {
    const mockOnChange = jest.fn();
    render(
      <InputField title="Test Input" value="42" onChange={mockOnChange} />
    );

    const input = screen.getByRole("spinbutton");
    fireEvent.change(input, { target: { value: "99" } });

    expect(mockOnChange).toHaveBeenCalledWith("99");
  });
});
