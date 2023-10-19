"use client";

import { useState, useEffect } from "react";
import PromptCardList from "./PromptCardList";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  // Search States
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResult, setSearchedResult] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data.data);
    };
    fetchPosts();
  }, []);

  const filteredPrompts = (searchText) => {
    const regex = new RegExp(searchText, "i");
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.prompt) ||
        regex.test(item.tag),
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filteredPrompts(searchText);
        setSearchedResult(searchResult);
      }, 500),
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);
    const searchResult = filteredPrompts(tagName);
    setSearchedResult(searchResult);
  };

  return (
    <section className="flex w-full flex-col gap-24">
      <form className="w-full">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="w-full rounded-lg px-4 py-3 text-sm shadow-xl outline-none"
        />
      </form>

      <PromptCardList
        data={searchedResult.length === 0 ? posts : searchedResult}
        handleTagClick={handleTagClick}
      />
    </section>
  );
};

export default Feed;
