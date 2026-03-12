import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type AdminPostRow = {
  id: number;
  title: string;
  slug: string;
  locale: string;
  published: boolean;
  updatedAt: Date;
};

interface PostsTableProps {
  posts: AdminPostRow[];
  onDelete: (formData: FormData) => Promise<void>;
}

export function PostsTable({ posts, onDelete }: PostsTableProps) {
  return (
    <div className="rounded-xl border bg-white p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold text-[#1E4FA3]">Posts</h1>
        <Button asChild>
          <Link href="/private-admin-portal/posts/new">New Post</Link>
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Locale</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Updated</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell>
                <p className="font-medium">{post.title}</p>
                <p className="text-xs text-muted-foreground">/{post.slug}</p>
              </TableCell>
              <TableCell>{post.locale.toUpperCase()}</TableCell>
              <TableCell>
                <Badge variant={post.published ? "default" : "secondary"}>
                  {post.published ? "Published" : "Draft"}
                </Badge>
              </TableCell>
              <TableCell>
                {new Date(post.updatedAt).toLocaleDateString("en-GB")}
              </TableCell>
              <TableCell className="text-right">
                <div className="inline-flex gap-2">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/private-admin-portal/posts/${post.id}/edit`}>
                      Edit
                    </Link>
                  </Button>

                  <form action={onDelete}>
                    <input type="hidden" name="id" value={post.id} />
                    <Button type="submit" variant="destructive" size="sm">
                      Delete
                    </Button>
                  </form>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {posts.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center text-muted-foreground"
              >
                No posts yet.
              </TableCell>
            </TableRow>
          ) : null}
        </TableBody>
      </Table>
    </div>
  );
}
