/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";

const NAMES = ["Claire", "Astrid", "Julie", "Johanna", "Alex"];

interface Data {
  results: string[];
  query: string;
}

export const handler: Handlers<Data> = {
  GET(req, ctx) {
    const url = new URL(req.url);
    const query = url.searchParams.get("query") || "";
    const results = NAMES.filter((name) => name.includes(query));

    return ctx.render({ results, query });
  },
};

export default function SearchPage({ data }: PageProps<Data>) {
  const { results, query } = data;

  return (
    <div>
      <form>
        <input type="text" name="query" id="" value={query} />
        <button type="submit">Search</button>
      </form>

      <ul>
        {results.map((name) => <li key={name}>{name}</li>)}
      </ul>
    </div>
  );
}
