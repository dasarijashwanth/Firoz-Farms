import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ChefHat, Clock, Tag, Users } from "lucide-react";
import { db } from "@/lib/db";
import { SmartImage } from "@/components/shared/SmartImage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface RecipePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const recipes = await db.recipe.findMany({ where: { isPublished: true }, select: { slug: true } });
  return recipes.map((recipe) => ({ slug: recipe.slug }));
}

export async function generateMetadata({
  params,
}: RecipePageProps): Promise<Metadata> {
  const { slug } = await params;
  const recipe = await db.recipe.findUnique({ where: { slug } });

  if (!recipe) {
    return { title: "Recipe Not Found | Firoz Farms" };
  }

  return {
    title: `${recipe.title} | Firoz Farms Recipes`,
    description: recipe.description ?? undefined,
  };
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { slug } = await params;

  const recipe = await db.recipe.findUnique({
    where: { slug },
  });

  if (!recipe || !recipe.isPublished) {
    notFound();
  }

  const relatedRecipes = await db.recipe.findMany({
    where: { isPublished: true, slug: { not: slug } },
    orderBy: { publishedAt: "desc" },
    take: 3,
  });

  return (
    <>
      <section className="relative aspect-[16/7] w-full overflow-hidden bg-beige sm:aspect-[16/6]">
        <SmartImage
          src={recipe.coverImageUrl}
          alt={recipe.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-4xl px-4 pb-8 sm:px-6 lg:px-8">
          <h1 className="font-heading text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {recipe.title}
          </h1>
        </div>
      </section>

      <section className="bg-cream py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {recipe.description && (
            <p className="font-sans text-lg leading-relaxed text-muted-foreground">
              {recipe.description}
            </p>
          )}

          {/* Meta strip */}
          <div className="mt-6 flex flex-wrap gap-4 rounded-2xl border border-border bg-card p-6">
            {recipe.prepTimeMins != null && (
              <div className="flex items-center gap-2 font-sans text-sm text-foreground">
                <Clock className="size-4 text-organic-green" />
                <span>
                  <span className="font-semibold">Prep:</span> {recipe.prepTimeMins} mins
                </span>
              </div>
            )}
            {recipe.cookTimeMins != null && (
              <div className="flex items-center gap-2 font-sans text-sm text-foreground">
                <ChefHat className="size-4 text-organic-green" />
                <span>
                  <span className="font-semibold">Cook:</span> {recipe.cookTimeMins} mins
                </span>
              </div>
            )}
            {recipe.servings != null && (
              <div className="flex items-center gap-2 font-sans text-sm text-foreground">
                <Users className="size-4 text-organic-green" />
                <span>
                  <span className="font-semibold">Serves:</span> {recipe.servings}
                </span>
              </div>
            )}
            {recipe.tags.length > 0 && (
              <div className="flex items-center gap-2">
                <Tag className="size-4 text-organic-green" />
                <div className="flex flex-wrap gap-1.5">
                  {recipe.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-earth-brown">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-12 grid gap-12 sm:grid-cols-5">
            {/* Ingredients */}
            <div className="sm:col-span-2">
              <h2 className="font-heading text-2xl font-bold text-organic-green-dark">
                Ingredients
              </h2>
              <ul className="mt-5 space-y-3">
                {recipe.ingredients.map((ingredient, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 font-sans text-sm leading-relaxed text-foreground"
                  >
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-organic-green" />
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>

            {/* Steps */}
            <div className="sm:col-span-3">
              <h2 className="font-heading text-2xl font-bold text-organic-green-dark">
                Steps
              </h2>
              <ol className="mt-5 space-y-6">
                {recipe.steps.map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-organic-green font-heading text-base font-semibold text-white">
                      {i + 1}
                    </div>
                    <p className="mt-1 font-sans text-sm leading-relaxed text-foreground">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="mt-12">
            <Button render={<Link href="/recipes" />} variant="outline" className="font-button">
              <ArrowLeft className="mr-1 size-4" /> Back to Recipes
            </Button>
          </div>
        </div>
      </section>

      {relatedRecipes.length > 0 && (
        <section className="bg-beige py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl font-bold text-organic-green-dark sm:text-3xl">
              More Recipes to Try
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedRecipes.map((related) => (
                <Link
                  key={related.id}
                  href={`/recipes/${related.slug}`}
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
                    {related.description && (
                      <p className="line-clamp-2 font-sans text-sm text-muted-foreground">
                        {related.description}
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
