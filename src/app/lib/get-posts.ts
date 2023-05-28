import path from 'path';
import fs from 'fs/promises';
import matter from 'gray-matter';
import { cache } from 'react';
import { PostType } from '~/types';

const loadPosts = cache(async () => {
  const posts = await fs.readdir(path.join(process.cwd(), 'src/posts'));

  return Promise.all(
    posts
      .filter((file) => path.extname(file) === '.md')
      .map(async (file) => {
        const filePath = path.join(process.cwd(), `src/posts/${file}`);
        const postContent = await fs.readFile(filePath, 'utf8');
        const { data, content } = matter(postContent);

        if (data.published === false) {
          return null;
        }

        return { ...data, body: content } as PostType;
      })
  );
});

async function getPosts() {
  const posts = await loadPosts();
  return posts
    .filter((post): post is PostType => post !== null && post !== undefined)
    .sort((a, b) => ((a?.date || 0) < (b?.date || 0) ? 1 : -1));
}

async function getPost(slug: string) {
  const posts = await getPosts();
  return posts.find((post) => post?.slug === slug);
}

export { getPosts, getPost };
