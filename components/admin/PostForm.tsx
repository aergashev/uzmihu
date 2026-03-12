import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Locale } from "@/lib/i18n";

type EditablePost = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  locale: string;
  published: boolean;
  publishedAt: Date;
  category: { name: string } | null;
};

interface PostFormProps {
  title: string;
  action: (formData: FormData) => Promise<void>;
  submitLabel: string;
  post?: EditablePost;
}

const locales: Locale[] = ["uz", "ru", "en"];

export function PostForm({ title, action, submitLabel, post }: PostFormProps) {
  const publishedAtValue = post?.publishedAt
    ? new Date(post.publishedAt).toISOString().slice(0, 10)
    : "";

  return (
    <form action={action} className="space-y-5 rounded-xl border bg-white p-6">
      <h1 className="text-2xl font-semibold text-[#1E4FA3]">{title}</h1>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            name="title"
            defaultValue={post?.title ?? ""}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            name="slug"
            defaultValue={post?.slug ?? ""}
            placeholder="auto-from-title"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Excerpt *</Label>
        <Textarea
          id="excerpt"
          name="excerpt"
          defaultValue={post?.excerpt ?? ""}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content *</Label>
        <Textarea
          id="content"
          name="content"
          defaultValue={post?.content ?? ""}
          required
          className="min-h-[220px]"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="image">Image URL *</Label>
          <Input
            id="image"
            name="image"
            defaultValue={post?.image ?? ""}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            name="category"
            defaultValue={post?.category?.name ?? ""}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="locale">Locale</Label>
          <select
            id="locale"
            name="locale"
            defaultValue={post?.locale ?? "uz"}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-2.5 py-1 text-sm"
          >
            {locales.map((locale) => (
              <option key={locale} value={locale}>
                {locale.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="publishedAt">Published Date</Label>
          <Input
            id="publishedAt"
            name="publishedAt"
            type="date"
            defaultValue={publishedAtValue}
          />
        </div>

        <div className="flex items-end pb-1">
          <label className="flex items-center gap-2 text-sm font-medium">
            <input
              type="checkbox"
              name="published"
              defaultChecked={post?.published ?? true}
              className="h-4 w-4 rounded border-gray-300"
            />
            Published
          </label>
        </div>
      </div>

      <div className="flex gap-3">
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
}
