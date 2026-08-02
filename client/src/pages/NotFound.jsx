import { PageStatus } from "../components/PageStatus";

function NotFound(){
    return (
        <PageStatus
            label="404"
            title="Page not found"
            message="That page isn't on the shelf. It may have been moved or removed."
            action={{ to: "/", label: "Back to books" }}
        />
    );
}
export default NotFound;
