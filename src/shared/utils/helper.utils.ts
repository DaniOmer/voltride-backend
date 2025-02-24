import * as fs from "fs";
import * as path from "path";

export class HelperUtils {
  static htmlTemplateReader(templateName: string): string {
    const templatePath = path.join(__dirname, "../templates", templateName);
    const templateContent = fs.readFileSync(templatePath, "utf-8");
    return templateContent;
  }
}
