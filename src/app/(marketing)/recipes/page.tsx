import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Users } from "lucide-react";
import { db } from "@/lib/db";
import { SmartImage } from "@/components/shared/SmartImage";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Recipes | Firoz Farms",
  description:
    "Simple, wholesome recipes built around Firoz Farms' organic milk, curd, ghee, and paneer.",
};

export default async function RecipesPage() {
  const recipes = await db.recipe.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <>
      <section className="bg-organic-green-dark py-20 text-white sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <span className="font-button text-sm font-semibold uppercase tracking-widest text-gold">
            Farm to Table
          </span>
          <h1 className="mt-4 font-heading text-4xl font-bold leading-tight sm:text-5xl">
            Recipes From Our Kitchen
          </h1>
          <p className="mt-5 font-sans text-lg text-white/85">
            Simple, wholesome recipes built around our organic milk, curd, ghee, and
            paneer — made the way real food should be.
          </p>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {recipes.length === 0 ? (
            <p className="text-center font-sans text-muted-foreground">
              No recipes published yet — check back soon.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recipes.map((recipe) => {
                const totalMins =
                  (recipe.prepTimeMins ?? 0) + (recipe.cookTimeMins ?? 0);

                return (
                  <Link
                    key={recipe.id}
                    href={`/recipes/${recipe.slug}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-beige">
                      <SmartImage
                        src={recipe.coverImageUrl}
                        alt={recipe.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-2 p-6">
                      <h2 className="font-heading text-lg font-semibold text-organic-green-dark">
                        {recipe.title}
                      </h2>
                      {recipe.description && (
                        <p className="line-clamp-2 font-sans text-sm text-muted-foreground">
                          {recipe.description}
                        </p>
                      )}
                      <div className="mt-1 flex flex-wrap items-center gap-4 font-sans text-xs text-muted-foreground">
                        {totalMins > 0 && (
                          <span className="flex items-center gap-1">
                            <Clock className="size-3.5 text-organic-green" />
                            {totalMins} mins
                          </span>
                        )}
                        {recipe.servings && (
                          <span className="flex items-center gap-1">
                            <Users className="size-3.5 text-organic-green" />
                            Serves {recipe.servings}
                          </span>
                        )}
                      </div>
                      {recipe.tags.length > 0 && (
                        <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
                          {recipe.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-earth-brown">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
