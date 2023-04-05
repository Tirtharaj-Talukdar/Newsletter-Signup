const mailchimp = require("@mailchimp/mailchimp_marketing");
const express = require("express");
const request = require("request");

const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

mailchimp.setConfig({
  apiKey: "6f4ba0c5c6a0655f5c5de45d49fd9dfa-us8",
  server: "us8",
});

app.post("/", function (req, res) {
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;
  const subscribingUser = {
    firstName: firstName,
    lastName: lastName,
    email: email,
  };
  const run = async () => {
    try {
      const response = await client.lists.addListMember("47d393bc06", {
        email_address: subscribingUser.email,
        status: "subscribed",
        merge_fields: {
          FNAME: subscribingUser.firstName,
          LNAME: subscribingUser.lastName,
        },
      });
      console.log(response.statusCode);
      res.sendFile(__dirname + "/success.html");
    } catch (err) {
      console.log(err);
      res.sendFile(__dirname + "/failure.html");
    }
  };

  run();
});

app.post("/failure", (req, res) => {
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

//API KEY
// 6f4ba0c5c6a0655f5c5de45d49fd9dfa-us8
//LIST ID
//  47d393bc06
