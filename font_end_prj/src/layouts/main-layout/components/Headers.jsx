import {cn} from "@/lib/utils";
import {
    ArrowLeftStartOnRectangleIcon,
    Cog6ToothIcon,
    PencilSquareIcon,
    UserCircleIcon
} from "@heroicons/react/20/solid";
import {Button, Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/react";
import {Link} from "react-router-dom";
import {ROUTES} from "@/routes/routes";
import {useTranslation} from "react-i18next";
import {useAuth} from "@/context/hooks/useAuth";
// const flagLanguages = {
//     vi: vi,
//     en: en,
// }

function Headers() {
    const {user} = useAuth();

    const {t, i18n} = useTranslation();

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang).then(r => r);
    }

    return (
        <header
            id="header"
            className={cn(  "flex justify-end items-center py-1 px-4", "h-[var(--header-height)] space-x-4"
            )}
        >
            <div className={cn("flex justify-end items-center bg-white rounded-lg h-full w-full px-4 gap-5")}>
                <div>
                    <Link
                        type="submit"
                        to={ROUTES.ARTICLE_POST}
                        className={cn(
                            "flex items-center gap-2 bg-white rounded-lg px-2.5 py-1.5",
                            "font-semibold text-gray-800 shadow-inner shadow-white/10 focus:outline-none transition-all",
                            "data-[focus]:outline-1 data-[focus]:outline-white",
                            "bg-[rgb(255,145,0)] data-[open]:bg-[rgb(255,145,0)] border border-solid border-[rgb(255,145,0)]-300",
                            "data-[hover]:text-neutral-200 data-[open]:text-neutral-200 text-[18px] w-[170px] text-white"
                        )}
                    >
                        <PencilSquareIcon className={cn("size-5 fill-white text-[rgb(255,145,0)]")}/>
                        {t("header.write_article")}
                    </Link>
                </div>
                <div>
                {/* <Link
        to={ROUTES.CHAT}
        className={cn(
            "flex items-center justify-center gap-2 rounded-lg px-4 py-2",
            "font-semibold text-white shadow-md transition-all",
            "bg-blue-500 border border-blue-600",
            "hover:bg-blue-600 text-[16px] w-[170px] h-[40px]"
        )}
    >
        <svg className="size-5 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2 12a10 10 0 1018.39 5.56L22 22l-4.44-1.61A10 10 0 102 12zm14 0a8 8 0 11-15.83 1.67A10 10 0 0012 22a10 10 0 004.56-1.05L18 22l-1.05-4.56A10 10 0 0022 12a10 10 0 00-6-9.05A8 8 0 0116 12z"/>
        </svg>
        {t("header.chat")}
    </Link> */}
                </div>
                <Menu>
                    {/* <MenuButton
                        className="rounded-full hover:cursor-pointer">
                        <img
                            src={flagLanguages[i18n.language]}
                            alt={`${i18n.language} logo`}
                            className={cn("size-8")}
                        />
                    </MenuButton> */}

                    <MenuItems
                        transition
                        anchor="bottom end"
                        className={cn(
                            "w-52 max-w-full bg-gray-100 rounded-xl border border-gray-200 shadow-lg z-10",
                            "p-1 mt-1 text-sm/6 text-black transition duration-100 ease-out",
                            "[--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                        )}
                    >
                        {/* <MenuItem>
                            <Button
                                className={cn(
                                    "group flex w-full items-center gap-2 py-1.5 px-3",
                                    "hover:bg-gray-200 w-full rounded-lg hover:cursor-pointer"
                                )}
                                onClick={() => {
                                    changeLanguage("vi")
                                }}
                            >
                                <img
                                    src={flagLanguages.vi}
                                    alt={`${i18n.language} logo`}
                                    className={cn("size-8")}
                                />
                                Vietnamese
                            </Button>
                        </MenuItem> */}
                        {/* <MenuItem>
                            <Button
                                className={cn(
                                    "group flex w-full items-center gap-2 py-1.5 px-3",
                                    "hover:bg-gray-200 w-full rounded-lg hover:cursor-pointer"
                                )}
                                onClick={() => {
                                    changeLanguage("en")
                                }}
                            >
                                <img
                                    src={flagLanguages.en}
                                    alt={`${i18n.language} logo`}
                                    className={cn("size-8")}
                                />
                                English
                            </Button>
                        </MenuItem> */}
                    </MenuItems>
                </Menu>
                <div>
                    <Menu>
                        <MenuButton
                            className="rounded-full p-1 bg-gray-700">
                            <UserCircleIcon className={cn("size-6 fill-white")}/>
                        </MenuButton>

                        <MenuItems
                            transition
                            modal={false}
                            anchor="bottom end"
                            className={cn(
                                "w-52 max-w-full bg-gray-100 rounded-xl border border-gray-200 shadow-2xl z-20",
                                "p-1 text-sm/6 text-black transition duration-100 ease-out",
                                "[--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                            )}
                        >
                            <MenuItem>
                                <Link
                                    to={ROUTES.ACCOUNT_SETTING}
                                    className={cn(
                                        "group flex w-full items-center gap-2 py-1.5 px-3",
                                        "hover:bg-gray-200 w-full rounded-lg"
                                    )}
                                >
                                    <Cog6ToothIcon className="size-4 fill-black"/>
                                    {t("header.account_setting")}
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <Link
                                    to={ROUTES.LOGOUT}
                                    className={cn(
                                        "group flex w-full items-center gap-2 py-1.5 px-3",
                                        "hover:bg-gray-200 w-full rounded-lg"
                                    )}
                                >
                                    <ArrowLeftStartOnRectangleIcon className="size-4 fill-black"/>
                                    {t("header.logout")}
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <p className={cn("text-center bg-gray-300 rounded-lg")}>
                                    {user?.email}
                                </p>
                            </MenuItem>
                        </MenuItems>
                    </Menu>
                </div>
            </div>
        </header>

        /*<div className={cn("z-10 flex justify-end items-center",
            "h-[var(--header-height)] w-[calc(100%-var(--left-toolbar-width))] fixed top-0 right-0")}>


        </div>*/
    );
}

export default Headers;