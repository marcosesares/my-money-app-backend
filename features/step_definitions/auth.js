const pactum = require("pactum");
const { Before, Given, When, Then } = require("@cucumber/cucumber");

let spec = pactum.spec();
Before(() => {
  spec = pactum.spec();
});


Given(/^I make a (.*) request to (.*)$/, function (method, endpoint) {
  spec[method.toLowerCase()](endpoint);
});

Given(/I set body to/, function (body) {
  try {
    spec.withJson(JSON.parse(body));
  } catch (error) {
    spec.withBody(body);
  }
});

Given(/^I set form to$/, function (json) {
  spec.withForm(JSON.parse(json));
});

When("I receive a response", async function () {
  await spec.toss();
});

Then("I expect response should have a status {int}", function (code) {
  spec.response().should.have.status(code);
});

Then(/^I expect response should have a json like$/, function (json) {
  spec.response().should.have.jsonLike(JSON.parse(json));
});
