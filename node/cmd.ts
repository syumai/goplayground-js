import {
  GoPlayground,
  defaultGoPlaygroundHostName,
} from "@syumai/goplayground";

import fs from "fs";

type Command = "run" | "fmt" | "share" | "download";

function loadData(filePath: string): string {
  return fs.readFileSync(filePath, "utf-8");
}

export async function runCmd() {
  const gp = new GoPlayground(defaultGoPlaygroundHostName);

  if (process.argv.length < 4) {
    console.error("arguments must be given");
    return;
  }

  const cmd = process.argv[2] as Command;
  const arg = process.argv[3];

  switch (cmd) {
    case "run": {
      const filePath = arg;
      const result = await gp.compile(loadData(filePath));
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
      const filePath = arg;
      const result = await gp.format(loadData(filePath));
      if (result.Error !== "") {
        process.stderr.write(result.Error);
        break;
      }
      process.stdout.write(result.Body);
      break;
    }

    case "share": {
      const filePath = arg;
      const result = await gp.share(loadData(filePath));
      console.log(`https://play.golang.org/p/${result}`);
      break;
    }

    case "download": {
      const result = await gp.download(arg);
      console.log(`https://play.golang.org/p/${result}`);
      break;
    }
  }
}
