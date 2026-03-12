import { deletePostAction, getAdminPosts } from "@/lib/admin/actions";
import { PostsTable } from "@/components/admin/PostsTable";

export default async function AdminPostsPage() {
  const posts = await getAdminPosts();

  return <PostsTable posts={posts} onDelete={deletePostAction} />;
}
