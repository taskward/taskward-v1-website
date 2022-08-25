import { TASKWARD_GITHUB_REPO_URL } from "@constants";

import github from "@assets/icon/github.png";

export default function GitHubIcon(): JSX.Element {
  return (
    <div className="flex cursor-pointer items-center justify-center">
      <a
        href={TASKWARD_GITHUB_REPO_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full bg-gray-50 p-1 shadow-xl shadow-emerald-600 transition-colors hover:bg-gray-200"
        title="GitHub"
      >
        <img src={github} width="28" height="28" loading="eager" />
      </a>
    </div>
  );
}
