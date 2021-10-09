import { render, screen } from "@testing-library/react";
import { mocked } from "ts-jest/utils";
import Posts, { getStaticProps } from "../../pages/posts";
import { getPrimiscClient } from "../../services/prismic";

jest.mock("../../services/prismic");
const post = [
  {
    slug: "post",
    title: "My post",
    excerpt: "My post excertp",
    updatedAt: "10 de abril",
  },
];
describe("Posts page", () => {
  it("renders correctly", () => {
    render(<Posts posts={post} />);
    expect(screen.getByText("My post")).toBeInTheDocument();
  });

  it("loads initial data", async () => {
    const getPrismscClientMocked = mocked(getPrimiscClient);

    getPrismscClientMocked.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: "my post",
            data: {
              title: [{ type: "heading", text: "My post" }],
              content: [{ type: "paragraph", text: "My post excertp" }],
            },
            last_publication_date: "04-01-2021",
          },
        ],
      }),
    } as any);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [
            {
              slug: "my post",
              title: "My post",
              excerpt: "My post excertp",
              updatedAt: "01 de abril de 2021",
            },
          ],
        },
      })
    );
  });
});
