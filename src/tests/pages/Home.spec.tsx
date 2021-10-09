import { render, screen } from "@testing-library/react";
import { mocked } from "ts-jest/utils";
import Home, { getStaticProps } from "../../pages";
import { stripe } from "../../services/stripe";
jest.mock("next/router");
jest.mock("next-auth/client", () => {
  return {
    useSession: () => [null, false],
  };
});

jest.mock("../../services/stripe");

describe("Home page", () => {
  it("renders correctly", () => {
    render(<Home product={{ priceId: "123", amount: "343" }} />);
    expect(screen.getByText("for 343 month")).toBeInTheDocument();
  });

  it("loads initial data", async () => {
    const stripeMocked = mocked(stripe.prices.retrieve);
    stripeMocked.mockResolvedValueOnce({
      id: "11",
      unit_amount: 1000,
    } as any);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          product: {
            priceId: "11",
            amount: "$10.00",
          },
        },
      })
    );
  });
});
