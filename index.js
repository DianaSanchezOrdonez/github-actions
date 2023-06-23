const fs = require("fs");
require("dotenv").config();
const octokit = require("@octokit/core");

const client = new octokit.Octokit({ auth: process.env.GH_TOKEN })

async function updateReadMe() {
  try {
    const res = await client.request(
      `GET /repos/DianaSanchezOrdonez/github-actions/contents/public/.well-known/apple-app-site-association`
    )
    const { path, sha, content, encoding } = res.data
    const rawContent = Buffer.from(content, encoding).toString()
    console.log('rawContent', rawContent)
  } catch (error) {
    console.log(error)
  }
}

updateReadMe()