import App from "./App";
import AuthorDetail from "./pages/AuthorDetail";
import AuthorList from "./pages/AuthorList";
import BookDetail from "./pages/BookDetail";
import BookList from "./pages/BookList";
import NotFound from "./pages/NotFound";
import ErrorPage from "./pages/ErrorPage";
import BookForm from "./pages/BookForm";
import AuthorForm from "./pages/AuthorForm";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <BookList /> },
      { path: "books", element: <BookList /> },
      { path: "books/new", element: <BookForm /> },
      { path: "books/:id", element: <BookDetail /> },
      { path: "books/:id/edit", element: <BookForm /> },
      { path: "authors", element: <AuthorList /> },
      { path: "authors/new", element: <AuthorForm /> },
      { path: "authors/:id", element: <AuthorDetail /> },
      { path: "authors/:id/edit", element: <AuthorForm /> },
      { path: "*", element: <NotFound /> },
    ],
  },
];
export default routes;