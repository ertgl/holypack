import { setTitle } from "../src/head.js";

document.body.innerHTML = `<div data-root="true"></div>`;

test(
  "sets the document title",
  () =>
  {
    const title = "Document 2";
    expect(document.title).not.toBe(title);
    setTitle(title);
    expect(document.title).toBe(title);
  },
);
