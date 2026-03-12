"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { isLocale, type Locale } from "@/lib/i18n";

export type AdminPostInput = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  locale: Locale;
  published: boolean;
  publishedAt?: string;
  category?: string;
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function parseInput(formData: FormData): AdminPostInput {
  const localeRaw = String(formData.get("locale") ?? "uz");
  const locale = isLocale(localeRaw) ? localeRaw : "uz";
  const title = String(formData.get("title") ?? "").trim();
  const slugRaw = String(formData.get("slug") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const image = String(formData.get("image") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const published = formData.get("published") === "on";
  const publishedAt = String(formData.get("publishedAt") ?? "").trim();

  if (!title || !excerpt || !content || !image) {
    throw new Error("Please fill all required fields.");
  }

  const slug = slugify(slugRaw || title);
  if (!slug) {
    throw new Error("Could not create a valid slug.");
  }

  return {
    title,
    slug,
    excerpt,
    content,
    image,
    locale,
    published,
    publishedAt,
    category,
  };
}

async function resolveCategoryId(name?: string): Promise<number | null> {
  if (!name) return null;
  const category = await prisma.category.upsert({
    where: { name },
    update: {},
    create: { name },
    select: { id: true },
  });
  return category.id;
}

export async function getAdminPosts() {
  return prisma.post.findMany({
    orderBy: { updatedAt: "desc" },
    include: { category: true, author: true },
  });
}

export async function ensureFirstAdminUser() {
  const existingCount = await prisma.user.count();
  if (existingCount > 0) return;

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME ?? "Admin";

  if (!email || !password) return;

  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      email,
      name,
      password: passwordHash,
    },
  });
}

export async function getAdminPostById(id: number) {
  return prisma.post.findUnique({
    where: { id },
    include: { category: true },
  });
}

export async function createPostAction(formData: FormData) {
  const input = parseInput(formData);
  const categoryId = await resolveCategoryId(input.category);

  await prisma.post.create({
    data: {
      title: input.title,
      slug: input.slug,
      excerpt: input.excerpt,
      content: input.content,
      image: input.image,
      locale: input.locale,
      published: input.published,
      publishedAt: input.publishedAt ? new Date(input.publishedAt) : new Date(),
      categoryId,
    },
  });

  revalidatePath("/private-admin-portal/posts");
  revalidatePath(`/uz/news`);
  revalidatePath(`/ru/news`);
  revalidatePath(`/en/news`);
  redirect("/private-admin-portal/posts");
}

export async function updatePostAction(id: number, formData: FormData) {
  const input = parseInput(formData);
  const categoryId = await resolveCategoryId(input.category);

  await prisma.post.update({
    where: { id },
    data: {
      title: input.title,
      slug: input.slug,
      excerpt: input.excerpt,
      content: input.content,
      image: input.image,
      locale: input.locale,
      published: input.published,
      publishedAt: input.publishedAt ? new Date(input.publishedAt) : new Date(),
      categoryId,
    },
  });

  revalidatePath("/private-admin-portal/posts");
  revalidatePath(`/uz/news`);
  revalidatePath(`/ru/news`);
  revalidatePath(`/en/news`);
  redirect("/private-admin-portal/posts");
}

export async function deletePostAction(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!Number.isFinite(id)) throw new Error("Invalid post id.");

  await prisma.post.delete({ where: { id } });

  revalidatePath("/private-admin-portal/posts");
  revalidatePath(`/uz/news`);
  revalidatePath(`/ru/news`);
  revalidatePath(`/en/news`);
}
