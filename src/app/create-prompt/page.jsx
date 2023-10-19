"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@/components/Form";

const CreatePrompt = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [isSubmit, setIsSubmit] = useState(false);
  const [post, setPost] = useState({
    post: "",
    tag: "",
  });

  const createPrompt = async (e) => {
    e.preventDefault();
    setIsSubmit(true);

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          userId: session?.user.id,
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmit(false);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      isSubmit={isSubmit}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
