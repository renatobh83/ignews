import Prismic from "@prismicio/client";

export function getPrimiscClient(req?: unknown) {
  const primisc = Prismic.client(process.env.PRIMISC_ENDPOINT, {
    req,
    accessToken: process.env.PRIMISC_SECRET,
  });

  return primisc;
}
