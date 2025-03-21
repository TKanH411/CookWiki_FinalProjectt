import {Link} from "react-router-dom";
import {ROUTES} from "@/routes/routes";

function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
            <h1 className="text-9xl font-extrabold text-gray-300">404</h1>
            <h2 className="mt-4 text-4xl font-bold text-gray-700">Page does not exists</h2>
            <p className="mt-2 text-lg text-gray-600">
                Unfortunately, the page you are looking for does not exist or has been deleted.
            </p>
            <Link
                to={ROUTES.HOME}
                className="mt-6 inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded transition duration-200"
            >
                Homepage
            </Link>
        </div>
    );
}

export default NotFound;