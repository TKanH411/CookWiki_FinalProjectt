import {cn} from "@/lib/utils";
import {useTranslation} from "react-i18next";

function Footer() {
    const {t} = useTranslation();
    return (
        <footer id="footer" className={cn("p-2")}>
            <p className={cn("text-sm text-gray-600 text-center")}>
                {t("footer.sign")}
            </p>
        </footer>
    )
}

export default Footer;