import styles from "./AccountSetting.module.scss";
import { cn } from "@/lib/utils";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { Button } from "@headlessui/react";
import ChangePasswordDialog from "@/pages/account-setting/components/ChangePasswordDialog";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { toast } from 'react-toastify'; // Thêm vào đây để sử dụng toast

function AccountSetting() {
    const { t } = useTranslation();

    const dialogRef = useRef(null);

    const openChangePasswordDialog = () => {
        dialogRef.current?.openDialog();
    };

    // Hàm gọi khi thay đổi mật khẩu thành công hoặc thất bại
    const onChangePasswordSuccess = () => {
        toast.success(t("change_password.success")); // Hiển thị thông báo thành công
    };

    const onChangePasswordError = (error) => {
        toast.error(t("change_password.error") + ": " + error); // Hiển thị thông báo lỗi
    };

    return (
        <>
            <div className={cn("max-w-[500px] w-full m-auto mt-6")}>
                <h2 className={cn("text-xl font-bold")}>{t("change_password.password")}</h2>
                <div className={cn("mt-4")}>
                    <Button
                        className={cn(styles.settingItem)}
                        onClick={openChangePasswordDialog}
                    >
                        {t("change_password.title")}
                        <ChevronRightIcon className={cn("size-6")} />
                    </Button>
                    <Button
                        className={cn(styles.settingItem)}
                    >
                        {t("change_password.two_factor_authentication")}
                        <ChevronRightIcon className={cn("size-6")} />
                    </Button>
                </div>
            </div>

            {/* Truyền hàm onSuccess và onError cho ChangePasswordDialog */}
            <ChangePasswordDialog 
                ref={dialogRef} 
                onSave={onChangePasswordSuccess} 
                onError={onChangePasswordError} 
            />
        </>
    );
}

export default AccountSetting;
