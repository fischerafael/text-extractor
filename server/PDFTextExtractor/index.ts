import multer from "multer";
import pdfParse from "pdf-parse";
import fs from "fs";
import { NextApiRequest } from "next";

export interface NextApiRequestWithFile extends NextApiRequest {
  file: any;
}

class PDFTextExtractor {
  private upload = multer({
    storage: multer.diskStorage({}),
    limits: { fileSize: 20 * 1024 * 1024 },
  });

  public config = {
    api: {
      bodyParser: false,
    },
  };

  uploadPDFTemp = async (req: any, res: any) => {
    await new Promise((resolve, reject) => {
      this.upload.single("file")(req as any, res as any, (err: any) => {
        if (err instanceof multer.MulterError) {
          console.error(err);
          return reject({ status: 400, message: "File upload error" });
        }
        if (err) {
          console.error(err);
          return reject({ status: 500, message: "Internal server error" });
        }
        resolve("");
      });
    });
  };

  parsePDFFile = async (file: any) => {
    const fileBuffer = fs.readFileSync(file.path);
    const data = await pdfParse(fileBuffer);
    return data;
  };
}

export const pdfExtractor = new PDFTextExtractor();
