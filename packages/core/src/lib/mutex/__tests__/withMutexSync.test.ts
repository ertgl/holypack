import { availableParallelism } from "node:os";

import { createMutex } from "../createMutex";
import { withMutexSync } from "../withMutexSync";

describe(
  "withMutexSync",
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
            new Promise(
              (resolve) =>
              {
                withMutexSync(
                  mutex,
                  () =>
                  {
                    value = i;
                  },
                  5000,
                );

                resolve();
              },
            ),
          );
        }

        await Promise.all(promises);

        expect(value).toBe(numberOfProcesses - 1);
      },
    );
  },
);
