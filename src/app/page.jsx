import Feed from "@/components/Feed";

const Home = () => {
  return (
    <section className="my-24 flex w-full flex-col items-center gap-4 text-center">
      <h1 className="text-4xl font-bold lg:text-6xl">
        Ignite Your Creativity with <br />
        <span className="bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent">
          AI-Powered Prompts
        </span>
      </h1>
      <p className="max-w-2xl text-sm text-slate-500 lg:text-xl">
        Promptverse is your open-source companion for exploring, generating, and
        sharing imaginative prompts. Embrace the power of AI to inspire your
        creative journey.
      </p>

      <Feed />
    </section>
  );
};

export default Home;
