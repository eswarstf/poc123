var express = require("express");
var router = express.Router();
const fs = require("fs");
const http = require("http");
const db = require("../config/db");

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});
/* 
router.get("/all",async function(req, res, next) {
  db.query("Select * from video", function(err, result) {
    if (err) res.send(err);
    else {
      res.send(result);
      // console.log(result);
      let datafilter = result.filter((data, index) => {
        console.log(data.videoUrl)

         const video_path = data.videoUrl;
        const path = video_path;
      const stat = fs.statSync(path);
      const fileSize = stat.size;
      const range = req.headers.range;
      if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunksize = end - start + 1;
        const file = fs.createReadStream(path, { start, end });
        const head = {
          "Content-Range": `bytes ${start}-${end}/${fileSize}`,
          "Accept-Ranges": "bytes",
          "Content-Length": chunksize,
          "Content-Type": "video/mp4"
        };
        res.writeHead(206, head);
        file.pipe(res);
      } else {
        const head = {
          "Content-Length": fileSize,
          "Content-Type": "video/mp4"
        };
        res.writeHead(200, head);
        fs.createReadStream(path).pipe(res);
      }
    });
    }
  });
}); */


// video stream by id and title
router.get("/videos", function (req, res) {
  let query, param;
  if (req.query.id) {
     query = "Select * from videos WHERE id = ?";
     param = req.query.id;
  } else if (req.query.title) {
    query = "Select * from videos WHERE title = ?";
     param = req.query.title;
  }
  db.query(query,param, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      // console.log(result);
      let datafilter = result.filter((data, index) => {
        const video_path = data.videoUrl;
        const path = video_path;
      const stat = fs.statSync(path);
      const fileSize = stat.size;
      const range = req.headers.range;
      if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunksize = end - start + 1;
        const file = fs.createReadStream(path, { start, end });
        const head = {
          "Content-Range": `bytes ${start}-${end}/${fileSize}`,
          "Accept-Ranges": "bytes",
          "Content-Length": chunksize,
          "Content-Type": "video/mp4"
        };
        res.writeHead(206, head);
        file.pipe(res);
      } else {
        const head = {
          "Content-Length": fileSize,
          "Content-Type": "video/mp4"
        };
        res.writeHead(200, head);
        fs.createReadStream(path).pipe(res);
      }
    });
    }
  });
});

module.exports = router;
