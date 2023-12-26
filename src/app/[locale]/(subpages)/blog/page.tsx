import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageProps } from "~/@types";
import { BlogPaginator, BlogPostPreview } from "~/components";
import { query } from "~/utils";

export const metadata: Metadata = {
  title: "Blog",
};

async function getData({ params: { locale }, searchParams: { page, size } }: PageProps) {
  const { items, currentPage, pageSize, totalItems, totalPages } = await query.paginatedPosts(locale, page, size);

  return {
    posts: items.filter((post) => !post.hidden),
    currentPage,
    pageSize,
    totalItems,
    totalPages,
  };
}

export default async function Page(props: PageProps) {
  const { posts, currentPage, totalPages } = await getData(props);

  if (posts.length === 0) {
    return notFound();
  }

  return (
    <div className="flex w-full max-w-3xl grow flex-col gap-8 self-center p-4">
      {posts.map((post) => {
        return <BlogPostPreview key={post.slug} data={post} />;
      })}
      <BlogPaginator currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
