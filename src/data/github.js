export async function getGitHubData() {
  const [userRes, reposRes] = await Promise.all([
    fetch('https://api.github.com/users/indokudev'),
    fetch('https://api.github.com/users/indokudev/repos?sort=updated&per_page=6')
  ]);

  const user = userRes.ok ? await userRes.json() : null;
  const repos = reposRes.ok ? await reposRes.json() : [];

  return {
    name: user?.name || "IndokuDev",
    handle: user?.login || "indokudev",
    bio: user?.bio || "Building high-performance decentralized protocols, Solana programs, and autonomous AI agents.",
    avatarUrl: user?.avatar_url || "/pfp.jpg",
    location: user?.location || "Indonesia 🇮🇩",
    profileUrl: user?.html_url || "https://github.com/indokudev",
    socials: [
      {
        name: "GitHub",
        url: user?.html_url || "https://github.com/indokudev",
        handle: `@${user?.login || 'indokudev'}`,
        icon: "simple-icons:github"
      },
      {
        name: "X / Twitter",
        url: user?.twitter_username ? `https://x.com/${user.twitter_username}` : "https://x.com/indokudev",
        handle: user?.twitter_username ? `@${user.twitter_username}` : "@indokudev",
        icon: "simple-icons:x"
      },
      {
        name: "Email",
        url: "mailto:contact@indoku.dev",
        handle: "contact@indoku.dev",
        icon: "material-symbols:mail-outline-rounded"
      }
    ],
    projects: repos.map((repo) => ({
      title: repo.name,
      language: repo.language || "Repository",
      description: repo.description || "Experimental repository and open source codebase.",
      stars: repo.stargazers_count,
      link: repo.html_url,
      updatedAt: new Date(repo.updated_at).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric"
      }),
      tags: [
        ...(repo.language ? [{ name: repo.language, icon: getLanguageIcon(repo.language) }] : []),
        { name: "GitHub", icon: "simple-icons:github" }
      ]
    }))
  };
}

function getLanguageIcon(lang) {
  if (!lang) return "simple-icons:git";
  const l = lang.toLowerCase();
  if (l === "rust") return "simple-icons:rust";
  if (l === "typescript") return "simple-icons:typescript";
  if (l === "javascript") return "simple-icons:javascript";
  if (l === "astro") return "simple-icons:astro";
  if (l === "python") return "simple-icons:python";
  if (l === "html") return "simple-icons:html5";
  if (l === "css") return "simple-icons:css3";
  return "simple-icons:git";
}