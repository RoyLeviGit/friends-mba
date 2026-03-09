import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content");

export type Locale = "he" | "en";

export function getContent<T = Record<string, unknown>>(
  filePath: string,
  locale: Locale = "he"
): T & { content: string } {
  const fullPath = path.join(contentDir, locale, filePath);
  const raw = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(raw);
  return { ...(data as T), content };
}

export function getContentIfExists<T = Record<string, unknown>>(
  filePath: string,
  locale: Locale = "he"
): (T & { content: string }) | null {
  const fullPath = path.join(contentDir, locale, filePath);
  if (!fs.existsSync(fullPath)) return null;
  return getContent<T>(filePath, locale);
}
