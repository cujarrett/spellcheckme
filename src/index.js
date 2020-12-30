#!/usr/bin/env node
const chalk = require("chalk")
const { getInput } = require("./read-input.js")
const { search } = require("./search.js")
const { version } = require("../package")

const red = "f44336"
const green = "00c853"
const orange = "ff9800"

const yargs = require("yargs")
  .alias("v", "version")
  .version(version)
  .describe("v", "show version information")
  .alias("h", "help")
  .help("help")
  .showHelpOnFail(true)
  .demandCommand(1, "")
  .usage("\nusage: spellcheckme [parameters]")
  .usage("To see help text, you can run:")
  .usage("\n  spellcheck --help")
  .example("spellcheckme junior", chalk.hex(green)("junior 👍"))
  // eslint-disable-next-line max-len
  .example("spellcheckme definately", `${chalk.hex(red)("definately 👎")} ${chalk.hex(green)("definitely 👍")}`)

yargs.getOptions().boolean.splice(-2)
yargs.argv

const app = async () => {
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
