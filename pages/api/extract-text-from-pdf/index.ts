import {
  pdfExtractor,
  NextApiRequestWithFile,
} from "@/server/PDFTextExtractor";
import type { NextApiResponse } from "next";

export const config = pdfExtractor.config;

export default async function handler(
  req: NextApiRequestWithFile,
  res: NextApiResponse
) {
  try {
    await pdfExtractor.uploadPDFTemp(req, res);
    const data = await pdfExtractor.parsePDFFile(req.file);
    return res.status(200).json({ message: "ok", result: data });
  } catch (e: any) {
    return res.status(500).json({ data: null, error: e.message });
  }
}
