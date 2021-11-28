export const getInput = async () => {
  const argInput = process.argv.slice(2).join(" ")

  const pipedInputPromise = new Promise((resolve) => {
    let data = ""
    process.stdin.setEncoding("utf8")
    process.stdin.resume()
    const timeout = setTimeout(() => {
      process.stdin.pause()
      resolve(data)
    }, 10)
    process.stdin.on("readable", () => {
      let chunk
      while ((chunk = process.stdin.read())) {
        data += chunk
      }
    }).on("end", () => {
      clearTimeout(timeout)
      resolve(data.replace("\n", ""))
    })
  })

  const pipedInput = await pipedInputPromise

  return pipedInput || argInput
}
