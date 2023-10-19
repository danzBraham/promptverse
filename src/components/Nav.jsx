"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProviders();
  }, []);

  return (
    <header className="w-full py-6">
      <nav className="flex-between flex">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/assets/images/logo.svg"
            alt="promptverse Logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <p className="logo-text">Promptverse</p>
        </Link>

        {/* Desktop */}
        <div className="hidden sm:flex">
          {session?.user ? (
            <div className="flex items-center justify-center gap-3">
              <Link href="/create-prompt" className="black-btn">
                Create Prompt
              </Link>
              <button type="button" onClick={signOut} className="outline-btn">
                Sign Out
              </button>
              <Link href="/profile">
                <Image
                  src={session?.user.image}
                  alt="profile"
                  width={37}
                  height={37}
                  className="rounded-full"
                />
              </Link>
            </div>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider) => (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="black-btn"
                  >
                    Sign In
                  </button>
                ))}
            </>
          )}
        </div>

        {/* Mobile */}
        <div className="relative flex sm:hidden">
          {session?.user ? (
            <div className="flex items-center justify-center">
              <Image
                src={session?.user.image}
                alt="profile"
                width={37}
                height={37}
                className="rounded-full"
                onClick={() => setToggleDropdown((prev) => !prev)}
              />

              {toggleDropdown && (
                <div className="dropdown">
                  <Link
                    href="/profile"
                    className="dropdown-link"
                    onClick={() => setToggleDropdown(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    href="/create-prompt"
                    className="dropdown-link"
                    onClick={() => setToggleDropdown(false)}
                  >
                    Create Prompt
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setToggleDropdown(false);
                      signOut();
                    }}
                    className="black-btn mt-5 w-full"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider) => (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="black-btn"
                  >
                    Sign In
                  </button>
                ))}
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Nav;
