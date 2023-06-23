const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api", (req, res) => {
  res.json({
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
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
