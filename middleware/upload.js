import busboy from "busboy";

function upload(req, res, next) {
  console.log(req.headers);
  const bb = busboy({ headers: req.headers });

  bb.on("file", (name, file, info) => {
    const chunks = [];

    const { filename, encoding, mimeType } = info;

    // TODO: validate file type and size

    console.log(
      `File [${name}]: filename: %j, encoding: %j, mimeType: %j`,
      filename,
      encoding,
      mimeType
    );

    file.on("data", (data) => {
      chunks.push(data);
    });

    file.on("close", () => {
      req.file = Buffer.concat(chunks);
    });
  });

  bb.on("field", (name, val) => {
    req.body = JSON.parse(val);
  });

  bb.on("close", () => {
    next();
  });

  req.pipe(bb);
}

export default upload;
