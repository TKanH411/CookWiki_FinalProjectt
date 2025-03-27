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
// function NotFound() {
//     return (
//         <div>
//             <h1>404 Not Found</h1>
//         </div>
//     );
// }

// export default NotFound;

// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// function NotFound()
//  {
//     return (
//         <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
//             <motion.h1 
//                 className="text-6xl font-bold text-red-500"
//                 initial={{ scale: 0.8, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 transition={{ duration: 0.5 }}
//             >
//                 404
//             </motion.h1>
//             <p className="text-xl mt-2">Oops! The page you are looking for does not exist.</p>
//             <Link to="/" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition">
//                 Go Home
//             </Link>
//         </div>
//     );
// }
// export default NotFound;