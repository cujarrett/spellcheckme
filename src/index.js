#!/usr/bin/env node
import chalk from "chalk"
import yargs from "yargs"
import { hideBin } from "yargs/helpers"
import { getInput } from "./read-input.js"
import { search } from "./search.js"
import { readPackageUp } from "read-pkg-up"
import updateNotifier from "update-notifier"

const app = async () => {
  const red = "f44336"
  const green = "00c853"
  const orange = "ff9800"
  const { packageJson } = await readPackageUp()

  yargs(hideBin(process.argv))
    .wrap(null)
    .version(packageJson.version)
    .alias("v", "version")
    .alias("h", "help")
    .showHelpOnFail(true)
    .usage("\nusage: spellcheckme [word(s)]")
    .usage("To see help text, you can run:")
    .usage("\n  spellcheckme --help")
    .example("spellcheckme javascript", chalk.hex(green)("javascript 👍"))
    // eslint-disable-next-line max-len
    .example("spellcheckme jjavascript", `${chalk.hex(red)("jjavascript 👎")} ${chalk.hex(green)("javascript 👍")}`)
    .parse()

  // check if a new version of spellcheckme is available and print an update notification
  const notifier = updateNotifier({ pkg: packageJson })
  if (notifier.update && notifier.update.latest !== packageJson.version) {
    notifier.notify({ isGlobal: true })
  }

  const input = await getInput()
  const { exitCode, message } = await search(input)

  if (exitCode === 0) {
    // eslint-disable-next-line no-console
    console.log(chalk.hex(green)(message))
  } else if (message.includes("👎")) {
    const bad = message.indexOf("👎")
    // eslint-disable-next-line no-console
    console.log(chalk.hex(red)(message.substring(0, bad)), chalk.hex(green)(message.substring(bad)))
  } else {
    // eslint-disable-next-line no-console
    console.log(chalk.hex(orange)(message))
  }
  process.exit(exitCode)
}

app()
