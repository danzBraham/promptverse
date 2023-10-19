"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState("");

  const handlerProfileClick = () => {
    if (post.creator._id === session?.user.id) {
      return router.push("/profile");
    }
    return router.push(
      `/profile/${post.creator._id}?name=${post.creator.username}`,
    );
  };

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  };

  return (
    <div className="prompt-card">
      <div className="flex items-center justify-between gap-6">
        <div
          className="flex flex-1 cursor-pointer items-center gap-3"
          onClick={handlerProfileClick}
        >
          <Image
            src={post.creator.image}
            alt="user-image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col items-start">
            <h3 className="font-semibold text-slate-900">
              {post.creator.username}
            </h3>
            <p className="text-sm text-slate-500">{post.creator.email}</p>
          </div>
        </div>

        <div className="copy-btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt="copy"
            width={16}
            height={16}
          />
        </div>
      </div>

      <p className="my-4 text-left text-sm text-slate-700">{post.prompt}</p>
      <p
        className="cursor-pointer bg-gradient-to-r from-indigo-500 to-blue-500 bg-clip-text text-left font-inter text-sm text-transparent"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}
      </p>

      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex items-center justify-around gap-4 border-t border-slate-200 pt-3 font-inter text-sm font-medium">
          <p
            className="cursor-pointer bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="cursor-pointer bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
