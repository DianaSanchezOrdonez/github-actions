const fs = require("fs");
const axios = require("axios");
require("dotenv").config();
const octokit = require("@octokit/core");

const client = new octokit.Octokit({ auth: process.env.GH_TOKEN });

const data = {
  applinks: {
    details: [
      {
        appIDs: ["R2SA8LSU5H.co.crmb.ios-cl6vlg26q00680ns6gt2lwh31-dippys"],
        components: [
          {
            "/": "/dippys/*",
            comment: "Matches dippys qr code",
          },
          {
            "/": "/4/*",
            comment: "Matches dippys app clip",
          },
        ],
      },
      {
        appIDs: [
          "R2SA8LSU5H.co.crmb.ios-cl6dx7o1x00290ns65yg3761v-lanis-hawaiian-style-shave-ice",
        ],
        components: [
          {
            "/": "/lanis-hawaiian-style-shave-ice/*",
            comment: "Matches lanis qr code",
          },
          {
            "/": "/2/*",
            comment: "Matches lanis app clip",
          },
        ],
      },
    ],
  },
  webcredentials: {
    apps: [
      "R2SA8LSU5H.co.crmb.ios-cl6vlg26q00680ns6gt2lwh31-dippys",
      "R2SA8LSU5H.co.crmb.app.development",
    ],
  },
  appclips: {
    apps: [
      "R2SA8LSU5H.co.crmb.ios-cl6vlg26q00680ns6gt2lwh31-dippys.Clip",
      "R2SA8LSU5H.co.crmb.app.development.Clip",
    ],
  },
};

async function updateFile() {
  try {
    //const { data } = await axios.get("http://localhost:3000/api");

    const res = await client.request(
      `GET /repos/DianaSanchezOrdonez/github-actions/contents/public/.well-known/apple-app-site-association`
    );
    const { path, sha, content, encoding } = res.data;

    const rawContent = Buffer.from(content, encoding).toString();

    const rawContentFormat = JSON.parse(rawContent);

    // validate the keys
    // const isSameKeys =
    //   Object.keys(data).length === Object.keys(rawContentFormat).length;

    // validate if data has more elements in "applinks.details"
    if (
      data.applinks.details.length > rawContentFormat.applinks.details.length
    ) {
      return commitFile(path, sha, encoding, JSON.stringify(data));
    }

    return;
  } catch (error) {
    console.log(error);
  }
}

async function commitFile(path, sha, encoding, updatedContent) {
  try {
    await client.request(
      `PUT /repos/DianaSanchezOrdonez/github-actions/contents/public/.well-known/apple-app-site-association`,
      {
        message: "Update apple-app file",
        content: Buffer.from(updatedContent, "utf-8").toString(encoding),
        path,
        sha,
      }
    );
  } catch (err) {
    console.log(err);
  }
}

updateFile();
