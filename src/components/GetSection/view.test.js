import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import GetSection from "../GetSection/view";
import axios from "axios";

// Query DOM case
test("Get All Test", () => {
    render(<GetSection />);
    const linkElement = screen.getByText(/Get All/i);
    expect(linkElement).toBeInTheDocument();
});

test("Clear Test", () => {
    render(<GetSection />);
    const linkElement = screen.getByText(/Clear/i);
    expect(linkElement).toBeInTheDocument();
});

// User Action case
test("Get All Test", () => {

    render(<GetSection />)
    userEvent.click(screen.getByText("Get All"));
    expect(screen.getByTestId("getall-btn")).toBeCalled
})
test("Clear Test", () => {

    render(<GetSection />)
    userEvent.click(screen.getByText("Clear"));
    expect(screen.getByTestId("clear-btn")).toBeCalled
})

jest.mock("axios");
// API Call case
test("Products Test", async () => {
    await act(async () => {
        await axios.get.mockImplementationOnce(() => Promise.resolve(mockResponse));
        render(<GetSection />);

        const button = screen.getByTestId("getall-btn");
        userEvent.click(button);
    });

    const response = screen.getByTestId("get-response");
    expect(response).toBeInTheDocument();
});

test("Error Test", async () => {
    await act(async () => {
        await axios.get.mockImplementationOnce(() => Promise.reject(mockError));
        render(<GetSection />);

        const button = screen.getByTestId("getall-btn");
        userEvent.click(button);
    });
});