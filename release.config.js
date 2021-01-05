const path = require("path")
const { promisify } = require("util")
const dateFormat = require("dateformat")
const readFileAsync = promisify(require("fs").readFile)

// Given a `const` variable `TEMPLATE_DIR` which points to
// "<semantic-release-gitmoji>/lib/assets/templates"
const TEMPLATE_DIR = "node_modules/semantic-release-gitmoji/lib/assets/templates/"
// the *.hbs template and partials should be passed as strings of contents
const template = readFileAsync(path.join(TEMPLATE_DIR, "default-template.hbs"))
const commitTemplate = readFileAsync(path.join(TEMPLATE_DIR, "commit-template.hbs"))

module.exports = {
  branches: ["main"],
  tagFormat: "v${version}",
  plugins: [
    [
      "semantic-release-gitmoji", {
        releaseRules: {
          major: [":boom:"],
          minor: [":sparkles:"],
          patch: [
            ":bug:",
            ":ambulance:",
            ":lock:"
          ]
        },
        releaseNotes: {
          template,
          partials: { commitTemplate },
          helpers: {
            datetime: function (format = "UTC:yyyy-mm-dd") {
              return dateFormat(new Date(), format)
            }
          },
          issueResolution: {
            template: "{baseUrl}/{owner}/{repo}/issues/{ref}",
            baseUrl: "https://github.com",
            source: "github.com"
          }
        }
      }
    ],
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    "@semantic-release/npm",
    "@semantic-release/git",
    "@semantic-release/github",
    ["@semantic-release/exec", {
      verifyReleaseCmd: "echo \"VERSION=${nextRelease.version}\" > RELEASE.env"
    }]
  ],
  debug: true
}
