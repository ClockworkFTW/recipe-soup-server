import busboy from "busboy";
import { v4 as uuidv4 } from "uuid";

function parseRecipe(req, res, next) {
  const bb = busboy({ headers: req.headers });

  bb.on("file", (name, file, info) => {
    const chunks = [];

    const [fileType, fileExtension] = info.mimeType.split("/");

    // TODO: validate file type and size

    file.on("data", (data) => {
      chunks.push(data);
    });

    file.on("close", () => {
      req.image = {
        body: Buffer.concat(chunks),
        key: `${fileType}/${uuidv4()}.${fileExtension}`,
      };
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

export default parseRecipe;
