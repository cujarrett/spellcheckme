import test from "ava"
import { search } from "../src/search.js"

test("Integration - valid spelling search", async (assert) => {
  const response = await search("JavaScript")
  assert.is(response.exitCode, 0)
  assert.is(response.message, "JavaScript 👍")
})

test("Integration - invalid spelling search", async (assert) => {
  const response = await search("JavaScriptz")
  assert.is(response.exitCode, 1)
  assert.is(response.message, "JavaScriptz👎 JavaScript 👍")
})

test("Integration - no results found search", async (assert) => {
  const response = await search("sfhshjfshdfjhsdiufh")
  assert.is(response.exitCode, 1)
  // eslint-disable-next-line max-len
  assert.is(response.message, "No results for sfhshjfshdfjhsdiufh 🤔")
})

test("Integration - empty search", async (assert) => {
  const response = await search("")
  assert.is(response.exitCode, 1)
  // eslint-disable-next-line max-len
  assert.is(response.message, "No word(s) given to spellcheck 🙃\n\nspellcheckme --help")
})
