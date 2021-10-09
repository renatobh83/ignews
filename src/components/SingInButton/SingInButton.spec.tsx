import { render, screen } from "@testing-library/react";
import { mocked } from "ts-jest/utils";
import { useSession } from "next-auth/client";
import { SingInButton } from ".";

jest.mock("next-auth/client");
describe("SingIn Button", () => {
  it("render correcty when user is not login", () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([null, false]);

    render(<SingInButton />);
    expect(screen.getByText("Sign in with Github")).toBeInTheDocument();
  });

  it("render correcty when user is auth", () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([
      {
        user: { name: "Jonh Doe" },
      },
      false,
    ]);
    render(<SingInButton />);
    expect(screen.getByText("Jonh Doe")).toBeInTheDocument();
  });
});
