import { useRouteError } from "react-router-dom";
import { PageStatus } from "../components/PageStatus";

/**
 * The route `errorElement`. Distinct from `NotFound` on purpose: `errorElement` catches
 * thrown errors and crashed renders, which is a different failure from a URL that doesn't
 * match a route. Showing "Page not found" for a crashed render hides a real bug.
 */
function ErrorPage() {
    const error = useRouteError();

    return (
        <PageStatus
            label="Error"
            title="Something went wrong"
            message={error?.message ?? "The page failed to render."}
            action={{ to: "/", label: "Back to books" }}
        />
    );
}
export default ErrorPage;
