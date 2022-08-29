type NoteResult = {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  priority: number;
  index: number;
  toped: boolean;
};

type NotesResult = {
  notes: NoteResult[];
  count: number;
};

export type { NotesResult };
