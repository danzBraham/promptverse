import Link from "next/link";

const Form = ({ type, post, setPost, isSubmit, handleSubmit }) => {
  return (
    <section className="flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <h1 className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-4xl font-bold text-transparent">
          {type} Post
        </h1>
        <p className="max-w-md text-slate-500">
          Unleash the Power of Imagination with Our AI-Powered Platform. {type}
          and Share Mesmerizing Prompts with the World!
        </p>
      </div>

      <form
        className="glassmorphism flex flex-col gap-6 border"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="prompt" className="text-lg font-bold text-slate-700">
            Your AI Prompt
          </label>
          <textarea
            name="prompt"
            id="prompt"
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Write your prompt here..."
            required
            className="h-[200px] w-full rounded-lg p-3 text-sm"
          ></textarea>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="tag" className="text-lg font-bold text-slate-700">
            Tag (#product, #idea)
          </label>
          <input
            name="tag"
            id="tag"
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="#tag"
            required
            className="w-full rounded-lg p-3 text-sm"
          ></input>
        </div>

        <div className="flex gap-2 self-end text-sm">
          <Link
            href="/"
            className="rounded-full border border-slate-500 px-5 py-2 text-slate-500"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmit}
            className="rounded-full bg-gradient-to-r from-orange-400 to-amber-500 px-5 py-2"
          >
            {isSubmit ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
