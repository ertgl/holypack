import { availableParallelism } from "node:os";

import { sleepAsync } from "../../time/__tests__/utils/sleepAsync";
import { createMutex } from "../createMutex";
import { withMutexAsync } from "../withMutexAsync";

describe(
  "withMutexAsync",
  () =>
  {
    it(
      "should synchronize multiple processes for a specific code block",
      async () =>
      {
        const mutex = createMutex();

        const promises: Promise<void>[] = [];

        let value = 0;

        const numberOfProcesses = 10 * availableParallelism();

        for (let i = 0; i < numberOfProcesses; i++)
        {
          promises.push(
            withMutexAsync(
              mutex,
              async () =>
              {
                await sleepAsync(Math.random());
                value = i;
              },
              5000,
            ),
          );
        }

        await Promise.all(promises);

        expect(value).toBe(numberOfProcesses - 1);
      },
    );
  },
);
