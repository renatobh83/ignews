import { render, screen } from "@testing-library/react";
import { getSession, useSession } from "next-auth/client";
import { mocked } from "ts-jest/utils";
import Post, { getStaticProps } from "../../pages/posts/preview/[slug]";
import { getPrimiscClient } from "../../services/prismic";

jest.mock("../../services/prismic");
jest.mock("next-auth/client");
const post = {
  slug: "post",
  title: "My post",
  content: "<p>My post excertp</p>",
  updatedAt: "10 de abril",
};
describe("Posts page", () => {
  it("renders correctly", () => {
    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce([null, false]);
    render(<Post post={post} />);
    expect(screen.getByText("My post")).toBeInTheDocument();
    expect(screen.getByText("My post excertp")).toBeInTheDocument();
  });

  //   it("redirects users if no subscription is found", async () => {
  //     const getSessionsMocked = mocked(getSession);

  //     getSessionsMocked.mockResolvedValueOnce({
  //       activeSubscription: null,
  //     });
  //     const response = await getServerSideProps({
  //       params: {
  //         slug: "post",
  //       },
  //     } as any);

  //     expect(response).toEqual(
  //       expect.objectContaining({
  //         redirect: expect.objectContaining({
  //           destination: "/posts/preview/post",
  //         }),
  //       })
  //     );
  //   });
  //   it("loads initial data", async () => {
  //     const getSessionsMocked = mocked(getSession);
  //     const getPrimiscClientMocked = mocked(getPrimiscClient);

  //     getPrimiscClientMocked.mockReturnValue({
  //       getByUID: jest.fn().mockResolvedValueOnce({
  //         data: {
  //           title: [{ type: "heading", text: "My post" }],
  //           content: [{ type: "paragraph", text: "My post excertp" }],
  //         },
  //         last_publication_date: "04-01-2021",
  //       }),
  //     } as any);
  //     getSessionsMocked.mockResolvedValueOnce({
  //       activeSubscription: "fake-active-sb",
  //     } as any);
  //     const response = await getServerSideProps({
  //       params: {
  //         slug: "post",
  //       },
  //     } as any);

  //     expect(response).toEqual(
  //       expect.objectContaining({
  //         props: {
  //           post: {
  //             slug: "post",
  //             title: "My post",
  //             content: "<p>My post excertp</p>",
  //             updatedAt: "01 de abril de 2021",
  //           },
  //         },
  //       })
  //     );
  //   });
});
