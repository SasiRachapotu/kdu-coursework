import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ItemsContainer } from "../components/itemsContainer/ItemsContainer";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { fireEvent } from "vitest-react";

describe("Items Container", () => {
  it("Items-header", async () => {
    render(
      <Provider store={store}>
        <ItemsContainer />
      </Provider>
    );
    const itemsHeader = screen.getByText("Add Items");
    expect(itemsHeader).to.exist;
  });

  it("items-input and button enable", () => {
    render(
      <Provider store={store}>
        <ItemsContainer />
      </Provider>
    );

    const inputElement = screen.getByTestId("items-input") as HTMLInputElement;

    // Simulate user input
    fireEvent.input(inputElement, { target: { value: "Test Value" } });

    // Check if the input value is updated
    expect(inputElement.value).toEqual("Test Value");
    const btn = screen.getByTestId("submit-btn");
    expect(btn.attributes.getNamedItem("disabled")).toBeFalsy();
  });

  it("submit-btn disabled", () => {
    render(
      <Provider store={store}>
        <ItemsContainer />
      </Provider>
    );
    const btn = screen.getByTestId("submit-btn");
    expect(btn.attributes.getNamedItem("disabled")).toBeTruthy();
  });

  it("Add items correctly", () => {
    render(
      <Provider store={store}>
        <ItemsContainer />
      </Provider>
    );

    const inputElement = screen.getByTestId("items-input") as HTMLInputElement;
    const submitButton = screen.getByTestId("submit-btn");

    // Simulate user input
    fireEvent.input(inputElement, { target: { value: "Checking add Item" } });

    // Click the submit button
    fireEvent.click(submitButton);

    // Check if the input value is cleared after submission
    expect(inputElement.value).toEqual("");

    expect(screen.queryByText("Checking add Item")).toBeTruthy();
  });

  it("removes checked items correctly", () => {
    render(
      <Provider store={store}>
        <ItemsContainer />
      </Provider>
    );

    const inputElement = screen.getByTestId("items-input") ;
    const submitButton = screen.getByTestId("submit-btn");
    const removeCheckedButton = screen.getByTestId("remove-checked");

    // Submit an item
    fireEvent.input(inputElement, { target: { value: "Trying delete todo" } });
    fireEvent.click(submitButton);

    // Check the item
    fireEvent.click(
      screen.getAllByTestId("checkbox")[
        screen.getAllByTestId("checkbox").length - 1
      ]
    ); // Assuming you have a checkbox in your Item component

    // Remove checked items
    fireEvent.click(removeCheckedButton);

    // Check if the item is removed
    expect(screen.queryByText("Trying delete todo")).toBeFalsy();
  });

  it("deletes item correctly", async () => {
    render(
      <Provider store={store}>
        <ItemsContainer />
      </Provider>
    );

    const inputElement = screen.getByTestId<HTMLInputElement>("items-input");
    const submitButton = screen.getByTestId("submit-btn");

    // Submit an item
    fireEvent.input(inputElement, {
      target: { value: "Try deleting individual element" },
    });
    fireEvent.click(submitButton);

    // Check if the item is present
    expect(screen.queryByText("Try deleting individual element")).toBeTruthy();
    // Click the delete button
    const deleteButtons = screen.getAllByTestId("Delete-Btn");
      fireEvent.click(deleteButtons[deleteButtons.length-1]);
      screen.debug();
      // Check if the item is removed
      expect(screen.queryByText("Try deleting individual element")).toBeFalsy();
  });
});
