import styles from "./AccountSetting.module.scss";
import {cn} from "@/lib/utils";
import {ChevronRightIcon} from "@heroicons/react/20/solid";
import {Button} from "@headlessui/react";
import ChangePasswordDialog from "@/pages/account-setting/components/ChangePasswordDialog";
import {useRef} from "react";

function AccountSetting() {
    const dialogRef = useRef(null);

    const openChangePasswordDialog = () => {
        dialogRef.current?.openDialog();
    };

    return (
        <>
            <div className={cn("max-w-[500px] w-full m-auto mt-6")}>
                <h2 className={cn("text-xl font-bold")}>Password</h2>
                <div className={cn("mt-4")}>
                    <Button
                        className={cn(styles.settingItem)}
                        onClick={openChangePasswordDialog}
                    >
                        Đổi mật khẩu
                        <ChevronRightIcon className={cn("size-6")}/>
                    </Button>
                    <Button
                        className={cn(styles.settingItem)}
                    >
                        Two-factor authentication
                        <ChevronRightIcon className={cn("size-6")}/>
                    </Button>
                </div>
            </div>

            <ChangePasswordDialog ref={dialogRef}/>
        </>
    );
}

export default AccountSetting;