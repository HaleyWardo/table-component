import { render, screen } from "@testing-library/react";
import { Checkbox } from "./Checkbox";

test("it renders checkbox", () => {
  render(<Checkbox aria-label="Select all" />);
  const selectAllCheckbox = screen.getByLabelText("Select all");
  expect(selectAllCheckbox).toBeInTheDocument();
  expect(selectAllCheckbox).toBeEnabled();
});

test("it disables checkbox", () => {
  render(<Checkbox aria-label="Select all" disabled />);
  expect(screen.getByLabelText("Select all")).toBeDisabled();
});

test("it renders checkbox label", () => {
  render(<Checkbox label="Select all" />);
  expect(screen.getByText("Select all")).toBeInTheDocument();
});

test("it throws error if no label or aria-label is provided", () => {
  // Mock console.error to suppress error messages
  const consoleErrorMock = jest
    .spyOn(console, "error")
    .mockImplementation(() => {});

  // Expect the component rendering to throw an error
  expect(() => render(<Checkbox disabled />)).toThrowError(
    "Either 'label' or 'aria-label' prop is required.",
  );

  // Restore original console.error after the test
  consoleErrorMock.mockRestore();
});
