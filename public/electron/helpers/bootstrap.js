const {app} = require("electron");
const path = require("path");

const isProd = !require("electron-is-dev");

let restartCount = 0;
module.exports = function bootstrap(serverWindow) {
  function startServer() {
    const childPath = isProd
      ? "build/server/index.js"
      : "server/build/server/index.js";
    const child = require("child_process").fork(
      path.join(app.getAppPath(), childPath),
      [],
      {
        env: {FORK: 1, ...process.env},
        silent: true,
        maxBuffer: 1024 * 1024 * 1024,
      },
    );

    child.stdout.on("data", function(data) {
      serverWindow.webContents.send("info", data);
    });
    child.stderr.on("data", function(data) {
      serverWindow.webContents.send("info", data);
    });
    child.on("close", function(code) {
      if (serverWindow && restartCount < 10) {
        serverWindow.webContents.send(
          "info",
          `Server process closed. Restarting...`,
        );
        startServer();
      } else {
        if (serverWindow) {
          serverWindow.webContents.send(
            "info",
            `Server process closed. Too many restarts. Closing Thorium Server.`,
          );
        }
        app.quit();
      }
      restartCount++;
    });
    child.on("error", function(err) {
      serverWindow.webContents.send(
        "info",
        `Error in server process: ${err.message}`,
      );
      console.log(err);
    });

    app.on("before-quit", () => {
      child.kill();
    });
  }
  startServer();
  return Promise.resolve();
};

setInterval(() => {
  restartCount = Math.max(0, restartCount - 1);
}, 10 * 1000);
