import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { db } from "@/lib/db";
import { SmartImage } from "@/components/shared/SmartImage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await db.blogPost.findMany({ where: { isPublished: true }, select: { slug: true } });
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await db.blogPost.findUnique({ where: { slug } });

  if (!post) {
    return { title: "Post Not Found | Firoz Farms" };
  }

  return {
    title: `${post.title} | Firoz Farms Blog`,
    description: post.excerpt ?? undefined,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  const post = await db.blogPost.findUnique({
    where: { slug },
  });

  if (!post || !post.isPublished) {
    notFound();
  }

  const relatedPosts = await db.blogPost.findMany({
    where: { isPublished: true, slug: { not: slug } },
    orderBy: { publishedAt: "desc" },
    take: 3,
  });

  const paragraphs = post.content
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <>
      <section className="relative aspect-[16/7] w-full overflow-hidden bg-beige sm:aspect-[16/6]">
        <SmartImage
          src={post.coverImageUrl}
          alt={post.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-4xl px-4 pb-8 sm:px-6 lg:px-8">
          <h1 className="font-heading text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>
        </div>
      </section>

      <article className="bg-cream py-12 sm:py-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-3 font-sans text-sm text-muted-foreground">
            <span className="font-semibold text-organic-green-dark">{post.author}</span>
            <span aria-hidden>&middot;</span>
            <span>{format(post.publishedAt, "MMMM d, yyyy")}</span>
          </div>

          {post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-earth-brown">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <div className="mt-8 space-y-4 font-sans text-base leading-relaxed text-foreground">
            {paragraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-10">
            <Button render={<Link href="/blog" />} variant="outline" className="font-button">
              <ArrowLeft className="mr-1 size-4" /> Back to Blog
            </Button>
          </div>
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section className="bg-beige py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl font-bold text-organic-green-dark sm:text-3xl">
              More From the Blog
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((related) => (
                <Link
                  key={related.id}
                  href={`/blog/${related.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-beige">
                    <SmartImage
                      src={related.coverImageUrl}
                      alt={related.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-5">
                    <h3 className="font-heading text-base font-semibold text-organic-green-dark">
                      {related.title}
                    </h3>
                    {related.excerpt && (
                      <p className="line-clamp-2 font-sans text-sm text-muted-foreground">
                        {related.excerpt}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
