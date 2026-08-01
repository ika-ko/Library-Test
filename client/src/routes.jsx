import App from "./App";
import AuthorDetail from "./pages/AuthorDetail";
import AuthorList from "./pages/AuthorList";
import BookDetail from "./pages/BookDetail";
import BookList from "./pages/BookList";
import NotFound from "./pages/NotFound";
import BookForm from "./pages/BookForm";
import AuthorForm from "./pages/AuthorForm";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <BookList /> },
      { path: "books/:id", element: <BookDetail /> },
      { path: "authors", element: <AuthorList /> },
      { path: "authors/:id", element: <AuthorDetail /> },
      { path: "*", element: <NotFound /> },
      { path: "books/new", element: <BookForm /> },
      { path: "books/:id/edit", element: <BookForm /> },
      { path: "authors/new", element: <AuthorForm /> },
      { path: "authors/:id/edit", element: <AuthorForm /> },  
    ],
  },
];
export default routes;