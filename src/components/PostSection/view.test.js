import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import PostSection from "../PostSection/view";
import axios from "axios";

// Query DOM case
test("Post Test", () => {
    render(<PostSection />);
    const linkElement = screen.getByText(/Post Data/i);
    expect(linkElement).toBeInTheDocument();
});
test("Clear Test", () => {
    render(<PostSection />);
    const linkElement = screen.getByText(/Clear/i);
    expect(linkElement).toBeInTheDocument();
});

// User Action case
test("Post Test", () => {

    render(<PostSection />)
    userEvent.click(screen.getByText("Post Data"));
    expect(screen.getByTestId("postdata-btn")).toBeCalled
})
test("Clear Test", () => {

    render(<PostSection />)
    userEvent.click(screen.getByText("Clear"));
    expect(screen.getByTestId("clear-btn")).toBeCalled
})

jest.mock("axios");
// API Call case
test("Products Test", async () => {
    await act(async () => {
        await axios.post.mockImplementationOnce(() => Promise.resolve(mockResponse));
        render(<PostSection />);

        const button = screen.getByTestId("postdata-btn");
        userEvent.click(button);
    });

    const response = screen.getByTestId("post-response");
    expect(response).toBeInTheDocument();
});

test("Error Test", async () => {
    await act(async () => {
        await axios.post.mockImplementationOnce(() => Promise.reject(mockError));
        render(<PostSection />);

        const button = screen.getByTestId("postdata-btn");
        userEvent.click(button);
    });
});