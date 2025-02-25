import * as fs from "fs";
import * as path from "path";
import { BadRequestError } from "../domain";

export class HelperUtils {
  static htmlTemplateReader(templateName: string): string {
    if (!templateName) {
      throw new BadRequestError({
        message: "Invalid template name",
        logging: true,
        code: 500,
      });
    }

    if (!templateName.endsWith(".html")) {
      templateName += ".html";
    }
    const templatePath = path.join(__dirname, "../../templates", templateName);
    const templateContent = fs.readFileSync(templatePath, "utf-8");
    return templateContent;
  }
}
