import express from "express";
import { exec } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.post("/match-images", (req, res) => {
  const scriptPath = path.join(
    __dirname,
    "../scripts/upload_and_link_images.py"
  );

  exec(`python "${scriptPath}"`, (error, stdout, stderr) => {
    if (error) {
      console.error("Error:", error);
      return res.status(500).json({ message: "Image upload failed", error });
    }
    // console.log("Output:", stdout);
    res
      .status(200)
      .json({ message: "Images uploaded & linked", output: stdout });
  });
});

export default router;
