import {cn} from "@/lib/utils";

function FieldError({error, className}) {
    return error?.message && (
        <div className={cn("text-red-500 text-[12px] italic", className || "")}>
            {error.message}
        </div>
    );
}

export default FieldError;