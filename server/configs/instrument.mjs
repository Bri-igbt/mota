import * as Sentry from "@sentry/node"


Sentry.init({
    dsn: "https://9e1fe1569ba63b0aa4b8d77878c3acf2@o4509626797981696.ingest.us.sentry.io/4510894660911104",
    // Setting this option to true will send default PII data to Sentry.
    // For example, automatic IP address collection on events
    sendDefaultPii: true,
});