import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@components";
import { Note, Archive, Trash, NotFound } from "@pages";

export default function App(): JSX.Element {
  return (
    <div className="font-mono dark:text-white">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Note />} />
            <Route path="note" element={<Note />} />
            <Route path="archive" element={<Archive />} />
            <Route path="trash" element={<Trash />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
