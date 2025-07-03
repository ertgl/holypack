import { decodeJSONSync } from "../decodeJSONSync";

describe(
  "decodeJSONSync",
  () =>
  {
    it(
      "should decode raw JSON data from a string",
      () =>
      {
        const data = {
          key: "value",
        };

        const encoded = JSON.stringify(data);
        const decoded = decodeJSONSync<typeof data>(encoded);
        const expected = JSON.parse(encoded) as typeof data;

        expect(decoded).toEqual(expected);
      },
    );

    it(
      "should decode raw JSON data from a `Buffer`",
      () =>
      {
        const data = {
          key: "value",
        };

        const raw = JSON.stringify(data);
        const encoded = Buffer.from(raw);
        const decoded = decodeJSONSync<typeof data>(encoded);
        const expected = JSON.parse(raw) as typeof data;

        expect(decoded).toEqual(expected);
      },
    );
  },
);
