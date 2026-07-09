import type { Metadata } from "next";
import Link from "next/link";
import { format } from "date-fns";
import { db } from "@/lib/db";
import { SmartImage } from "@/components/shared/SmartImage";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Blog | Firoz Farms",
  description:
    "Stories, farming notes, and dairy know-how from Firoz Farms — organic dairy from Khammam District, Telangana.",
};

export default async function BlogPage() {
  const posts = await db.blogPost.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <>
      <section className="bg-organic-green-dark py-20 text-white sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <span className="font-button text-sm font-semibold uppercase tracking-widest text-gold">
            From Our Farm
          </span>
          <h1 className="mt-4 font-heading text-4xl font-bold leading-tight sm:text-5xl">
            Firoz Farms Blog
          </h1>
          <p className="mt-5 font-sans text-lg text-white/85">
            Notes on organic farming, animal welfare, and honest dairy — straight from
            the pastures of Khammam District to your screen.
          </p>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <p className="text-center font-sans text-muted-foreground">
              No posts published yet — check back soon.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-beige">
                    <SmartImage
                      src={post.coverImageUrl}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-6">
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-earth-brown">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                    <h2 className="mt-1 font-heading text-lg font-semibold text-organic-green-dark">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="line-clamp-3 font-sans text-sm text-muted-foreground">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="mt-auto flex items-center gap-2 pt-3 font-sans text-xs text-muted-foreground">
                      <span>{post.author}</span>
                      <span aria-hidden>&middot;</span>
                      <span>{format(post.publishedAt, "MMM d, yyyy")}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
