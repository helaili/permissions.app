"use strict";

const { createProbot } = require("probot");
const app = require("./");

const probot = createProbot();
const loadingApp = probot.load(app);

module.exports.webhooks = async (event, context) => {
  try {
    await loadingApp;

    // Ends function immediately after callback
    context.callbackWaitsForEmptyEventLoop = false;

    // this could will be simpler once we  ship `verifyAndParse()`
    // see https://github.com/octokit/webhooks.js/issues/379
    await probot.webhooks.verifyAndReceive({
      id:
        event.headers["X-GitHub-Delivery"] ||
        event.headers["x-github-delivery"],
      name: event.headers["X-GitHub-Event"] || event.headers["x-github-event"],
      signature:
        event.headers["X-Hub-Signature-256"] ||
        event.headers["x-hub-signature-256"],
      payload: event.body,
    });

    return {
      statusCode: 200,
      body: '{"ok":true}',
    };
  } catch (error) {
    console.log(error);

    return {
      statusCode: error.status || 500,
      error: "ooops",
    };
  }
};
