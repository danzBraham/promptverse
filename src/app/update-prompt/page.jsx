"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@/components/Form";

const EditPrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const [isSubmit, setIsSubmit] = useState(false);
  const [post, setPost] = useState({
    post: "",
    tag: "",
  });

  useEffect(() => {
    try {
      const getPromptDetails = async () => {
        const response = await fetch(`/api/prompt/${promptId}`);
        const data = await response.json();

        setPost({
          prompt: data.data.prompt,
          tag: data.data.tag,
        });
      };

      if (promptId) getPromptDetails();
    } catch (error) {
      console.error(error);
    }
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setIsSubmit(true);

    if (!promptId) return alert("Prompt ID not found");

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
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
      type="Edit"
      post={post}
      setPost={setPost}
      isSubmit={isSubmit}
      handleSubmit={updatePrompt}
    />
  );
};

export default EditPrompt;
