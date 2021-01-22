
const test = require("tape-async")
const { search } = require("../src/search.js")

test("Integration - search", async (assert) => {
  assert.plan(10)
  let response = await search("JavaScript")
  assert.equal(response.exitCode, 0, "Valid spelling exit code verified")
  assert.equal(response.message, "JavaScript 👍", "Valid spelling message verified")
  response = await search("JavaScriptz")
  // eslint-disable-next-line max-len
  assert.equal(response.exitCode, 1, "\"Showing results for\" invalid spelling search exit code verified")
  // eslint-disable-next-line max-len
  assert.equal(response.message, "JavaScriptz👎 JavaScript 👍", "\"Showing results for\" invalid spelling search message verified")
  response = await search("tomoto")
  assert.equal(response.exitCode, 1, "\"Did you Mean\" invalid spelling search exit code verified")
  // eslint-disable-next-line max-len
  assert.equal(response.message, "tomoto👎 tomato 👍", "\"Did you Mean\" invalid spelling search message verified")
  response = await search("sfhshjfshdfjhsdiufh")
  assert.equal(response.exitCode, 1, "No results found exit code verified")
  // eslint-disable-next-line max-len
  assert.equal(response.message, "No results for sfhshjfshdfjhsdiufh 🤔", "No results found message verified")
  response = await search("")
  assert.equal(response.exitCode, 1, "Empty search exit code verified")
  // eslint-disable-next-line max-len
  assert.equal(response.message, "No word(s) given to spellcheck 🙃\n\nspellcheck --help", "Empty search message verified")
})
