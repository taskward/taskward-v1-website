import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@components";
import { Home, Note, Archive, Trash, NotFound } from "@pages";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

export default function App(): JSX.Element {
  const { i18n } = useTranslation();
  console.log(import.meta.WIKI_API_URL);
  return (
    <div className={clsx("dark:text-white", i18n.language)}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/" element={<Layout />}>
            <Route path="note" element={<Note />} />
            <Route path="archive" element={<Archive />} />
            <Route path="trash" element={<Trash />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
