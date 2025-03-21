import {cn} from "@/lib/utils";

function Footer() {
    return (
        <footer id="footer" className={cn("p-2")}>
            <p className={cn("text-sm text-gray-600 text-center")}>Bản quyền của © Cookpad Inc. All Rights Reserved</p>
        </footer>
    )
}

export default Footer;