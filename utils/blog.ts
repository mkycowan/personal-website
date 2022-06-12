import fs from "fs";
import path from "path";

interface getBlogPostsFilterProps {
  skip?: number;
  take?: number;
}

export async function getBlogPosts(params: getBlogPostsFilterProps) {
  const { skip = 0, take } = params;
  const blogDirectory = path.join(process.cwd(), "/pages/blog");
  let blogFilenames = fs.readdirSync(blogDirectory);

  const articleModules = await Promise.all(
    blogFilenames.map(async (path) => import(`../pages/blog/${path}`)),
  );

  let articles = articleModules.map((module) =>
    module.meta ? module.meta : null,
  );

  // Skip & Take
  if (take && take < articles.length - skip) {
    articles = [...articles.slice(skip, take)];
  }

  return articles;
}
