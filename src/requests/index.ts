export { axiosService } from "./axios";

export { loginByGitHubCode } from "./api/auth/github";
export { loginByUsername, signupByUsername } from "./api/auth/username";
export { getUserInfo } from "./api/user";

export {
  useGetNotesRequest,
  useCreateNoteRequest,
  useUpdateNoteRequest,
  useDeleteNoteRequest,
} from "./api/notes";

export {
  useGetTrashNotesRequest,
  useRestoreTrashNoteRequest,
  useDeleteTrashNoteRequest,
} from "./api/trash";
