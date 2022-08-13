import github from "@assets/icon/github.png";
import { TASKWARD_GITHUB_REPO_URL } from "@utils";

export default function GitHubIcon(): JSX.Element {
  return (
    <div className="flex justify-center items-center cursor-pointer">
      <a
        href={TASKWARD_GITHUB_REPO_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="p-1 bg-gray-50 hover:bg-gray-200 rounded-full shadow-xl shadow-emerald-600 transition-colors"
        title="GitHub"
      >
        <img src={github} width="28" height="28" loading="eager" />
      </a>
    </div>
  );
}
