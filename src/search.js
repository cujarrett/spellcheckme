const puppeteer = require("puppeteer")

module.exports.search = async (query) => {
  const browser = await puppeteer.launch({ args: ["–no-sandbox", "–disable-setuid-sandbox"] })
  const page = await browser.newPage()
  await page.goto(`https://www.google.com/search?q=${query}`)
  await page.title()

  const noResult = await page.$("#topstuff > div > div > p:nth-child(2)")
  const showingResultsFor = await page.$("#fprsl")
  const didYouMean = await page.$("#taw > div:nth-child(2) > p > a")

  if (showingResultsFor) {
    /* istanbul ignore next */
    const value = await page.evaluate((element) => element.textContent, showingResultsFor)
    await browser.close()
    return {
      exitCode: 1,
      message: `${query} 👎 ${value} 👍`
    }
  } else if (didYouMean) {
    /* istanbul ignore next */
    const value = await page.evaluate((element) => element.textContent, didYouMean)
    await browser.close()
    return {
      exitCode: 1,
      message: `${query} 👎 ${value} 👍`
    }
  } else if (noResult) {
    await browser.close()
    return {
      exitCode: 1,
      message: `No results for ${query} 🤔`
    }
  } else {
    await browser.close()
    return {
      exitCode: 0,
      message: `${query} 👍`
    }
  }
}
