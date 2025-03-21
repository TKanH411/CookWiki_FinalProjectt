import {cn} from "@/lib/utils";
import {Button, Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/react";
import {ArrowLeftStartOnRectangleIcon, Cog6ToothIcon, UserCircleIcon} from "@heroicons/react/20/solid";
import {Link} from "react-router-dom";
import {ROUTES} from "@/routes/routes";
import {useTranslation} from "react-i18next";
import vi from "@/assets/flag/vi.webp";
import en from "@/assets/flag/en.webp";

const flagLanguages = {
    vi: vi,
    en: en,
}

function Headers() {
    const {i18n} = useTranslation();

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang).then(r => r);
    }

    return (
        <header
            id="header"
            className={cn(
                "flex justify-end items-center py-1 px-4",
                "h-[var(--header-height)] space-x-4"
            )}
        >
            <Menu>
                <MenuButton
                    className="rounded-full hover:cursor-pointer">
                    <img
                        src={flagLanguages[i18n.language]}
                        alt={`${i18n.language} logo`}
                        className={cn("size-8")}
                    />
                </MenuButton>

                <MenuItems
                    transition
                    anchor="bottom end"
                    className={cn(
                        "w-52 max-w-full bg-gray-100 rounded-xl border border-gray-200 shadow-lg z-10",
                        "p-1 mt-1 text-sm/6 text-black transition duration-100 ease-out",
                        "[--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                    )}
                >
                    <MenuItem>
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
                    </MenuItem>
                    <MenuItem>
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
                    </MenuItem>
                </MenuItems>
            </Menu>
            <Menu>
                <MenuButton
                    className="rounded-full p-1 bg-gray-700 hover:cursor-pointer">
                    <UserCircleIcon className={cn("size-6 fill-white")}/>
                </MenuButton>

                <MenuItems
                    transition
                    anchor="bottom end"
                    className={cn(
                        "w-52 max-w-full bg-gray-100 rounded-xl border border-gray-200 shadow-lg z-10",
                        "p-1 mt-1 text-sm/6 text-black transition duration-100 ease-out",
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
                            Account Setting
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
                            Logout
                        </Link>
                    </MenuItem>
                </MenuItems>
            </Menu>
        </header>
    );
}

export default Headers;