/** @jsx h */
import { h } from "preact";
import { PageProps } from "$fresh/server.ts";

export default function GreetPage(props: PageProps) {
  console.log("props", props);
  const { name } = props.params;

  return (
    <main>
      <p>Greetings dear {name}!</p>
    </main>
  );
}
