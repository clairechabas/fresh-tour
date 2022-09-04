/** @jsx h */
import { h } from "preact";
import Counter from "../islands/Counter.tsx";
import Countdown from "../islands/Countdown.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";

interface Data {
  joke: string;
}

export const handler: Handlers<Data | null> = {
  async GET(_, ctx) {
    const resp = await fetch("http://localhost:8000/api/joke");

    if (resp.status === 404) {
      return ctx.render(null);
    }

    const joke = await resp.json();

    return ctx.render({ joke });
  },
};

export default function Home({ data }: PageProps<Data | null>) {
  const date = new Date();
  date.setHours(date.getHours() + 1);

  if (!data) {
    return <h1>No joke today :(</h1>;
  }

  return (
    <div>
      <img
        src="/logo.svg"
        height="100px"
        alt="the fresh logo: a sliced lemon dripping with juice"
      />
      <h1>Hello Fresh World!</h1>
      <p>
        Welcome to `fresh`. Try updating this message in the ./routes/index.tsx
        file, and refresh.
      </p>
      <Counter start={3} />
      <br />
      <h2>Show must go on</h2>
      <p>
        The show starts in: <Countdown target={date.toISOString()} />
      </p>
      <br />
      <h2>Joke of the day</h2>
      <p>{data.joke}</p>
    </div>
  );
}
