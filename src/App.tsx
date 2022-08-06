import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Layout } from "@components";
import { Note, Archive, Trash } from "@pages";

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Note />} />
          <Route path="archive" element={<Archive />} />
          <Route path="trash" element={<Trash />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
