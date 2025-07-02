import { decodeTOMLAsync } from "../decodeTOMLAsync";

describe(
  "decodeTOMLAsync",
  () =>
  {
    it(
      "should decode raw TOML data from a string",
      async () =>
      {
        const data = {
          key: "value",
        };

        const encoded = "key = \"value\"";
        const decoded = await decodeTOMLAsync<typeof data>(encoded);

        expect(decoded).toEqual(data);
      },
    );

    it(
      "should decode raw TOML data from a `Buffer`",
      async () =>
      {
        const data = {
          key: "value",
        };

        const raw = "key = \"value\"";
        const encoded = Buffer.from(raw);
        const decoded = await decodeTOMLAsync<typeof data>(encoded);

        expect(decoded).toEqual(data);
      },
    );
  },
);
