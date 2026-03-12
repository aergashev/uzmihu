import { PostForm } from "@/components/admin/PostForm";
import { createPostAction } from "@/lib/admin/actions";

export default async function NewPostPage() {
  return (
    <PostForm
      title="Create New Post"
      action={createPostAction}
      submitLabel="Create post"
    />
  );
}
