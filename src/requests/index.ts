export { axiosService } from "./axios";

export { loginByGitHubCode } from "./api/auth/github";
export { loginByUsername, signupByUsername } from "./api/auth/username";
export { getUserInfo } from "./api/user";

export {
  useGetNotesRequest,
  useCreateNoteRequest,
  useUpdateNoteRequest,
  useDeleteNoteRequest,
  useArchiveNoteRequest,
} from "./api/notes";

export {
  useGetArchiveNotesRequest,
  useUnarchiveNoteRequest,
} from "./api/archive";

export {
  useGetTrashNotesRequest,
  useRestoreTrashNoteRequest,
  useDeleteTrashNoteRequest,
} from "./api/trash";

export { NOTES_KEY, ARCHIVE_KEY, TRASH_KEY } from "./keys";
