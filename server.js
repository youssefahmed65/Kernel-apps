const express = require("express");
const { createServer } = require("node:http");
const path = require("node:path");
const { ExpressPeerServer } = require("peer");

const app = express();
const server = createServer(app);
const port = Number(process.env.PORT) || 3000;
const gameFile = path.join(__dirname, "index.html");
const downloadsPageFile = path.join(__dirname, "downloads.html");
const phoneAppFile = path.join(__dirname, "phone app.apk");
const kernelInstallerFile = path.join(__dirname, "kernel.msi");
const musicFile = path.join(__dirname, "music.mp3");

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("PORT must be a valid TCP port.");
}

app.disable("x-powered-by");
app.get("/healthz", (_request, response) => {
  response.json({ status: "ok", peerServer: true });
});

const peerServer = ExpressPeerServer(server, {
  path: "/peerjs",
  allow_discovery: false,
  proxied: process.env.PEERJS_PROXIED === "true",
});
app.use(peerServer);

app.get("/", (_request, response, next) => {
  response.sendFile(gameFile, (error) => {
    if (error) next(error);
  });
});
app.get("/music.mp3", (_request, response, next) => {
  response.sendFile(musicFile, (error) => {
    if (error) next(error);
  });
});
app.get("/downloads", (_request, response, next) => {
  response.sendFile(downloadsPageFile, (error) => {
    if (error) next(error);
  });
});
app.get("/download.html", (_request, response, next) => {
  response.sendFile(downloadsPageFile, (error) => {
    if (error) next(error);
  });
});
app.get("/downloads.html", (_request, response, next) => {
  response.sendFile(downloadsPageFile, (error) => {
    if (error) next(error);
  });
});
app.get("/downloads/phone-app", (_request, response, next) => {
  response.download(phoneAppFile, "phone app.apk", (error) => {
    if (error) next(error);
  });
});
app.get("/downloads/kernel", (_request, response, next) => {
  response.download(kernelInstallerFile, "kernel.msi", (error) => {
    if (error) next(error);
  });
});
app.get("/phone%20app.apk", (_request, response, next) => {
  response.download(phoneAppFile, "phone app.apk", (error) => {
    if (error) next(error);
  });
});
app.get("/kernel.msi", (_request, response, next) => {
  response.download(kernelInstallerFile, "kernel.msi", (error) => {
    if (error) next(error);
  });
});

server.listen(port, "0.0.0.0", () => {
  console.log(`KERNEL game server listening on port ${port}`);
});
