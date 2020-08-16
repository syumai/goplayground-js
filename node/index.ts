#!/usr/bin/env node

import {
  GoPlayground,
  defaultGoPlaygroundHostName,
} from "@syumai/goplayground";
export * from "@syumai/goplayground";
import fetch from "node-fetch";
import FormData from "form-data";
import fs from "fs";

// Apply polyfills
// @ts-ignore
globalThis.fetch = fetch;
// @ts-ignore
globalThis.FormData = FormData;

type Command = "run" | "fmt" | "share";

(async () => {
  const gp = new GoPlayground(defaultGoPlaygroundHostName);

  if (process.argv.length < 4) {
    console.error("arguments must be given");
    return;
  }

  const cmd = process.argv[2] as Command;
  const filePath = process.argv[3];
  const data = fs.readFileSync(filePath, "utf-8");

  switch (cmd) {
    case "run": {
      const result = await gp.compile(data);
      if (result.Errors !== "") {
        process.stderr.write(result.Errors);
        break;
      }
      for (const event of result.Events) {
        switch (event.Kind) {
          case "stdout":
            process.stdout.write(event.Message);
            break;
          case "stderr":
            process.stderr.write(event.Message);
            break;
        }
      }
      break;
    }

    case "fmt": {
      const result = await gp.format(data);
      if (result.Error !== "") {
        process.stderr.write(result.Error);
        break;
      }
      process.stdout.write(result.Body);
      break;
    }

    case "share": {
      const result = await gp.share(data);
      console.log(`https://play.golang.org/p/${result}`);
      break;
    }
  }
})();
