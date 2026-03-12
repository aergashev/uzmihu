import { notFound } from "next/navigation";
import { PostForm } from "@/components/admin/PostForm";
import { getAdminPostById, updatePostAction } from "@/lib/admin/actions";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numericId = Number(id);

  if (!Number.isFinite(numericId)) {
    notFound();
  }

  const post = await getAdminPostById(numericId);
  if (!post) notFound();

  const updateAction = updatePostAction.bind(null, numericId);

  return (
    <PostForm
      title="Edit Post"
      action={updateAction}
      submitLabel="Save changes"
      post={post}
    />
  );
}
