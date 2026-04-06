import Image from "next/image";
import { Link } from "@/core/configs/i18n/routing";
import { APP_INFO } from "@/shared/constants/app-info";

export function HeaderLogo() {
    return (
        <Link href="/" className="flex items-center gap-4 group">
            <Image
                src={APP_INFO.logo}
                alt={APP_INFO.shortName}
                width={40}
                height={40}
                priority
                className="object-contain transition-transform duration-300 group-hover:rotate-90"
            />
            <p className="font-bold text-inherit text-[30px] leading-none tracking-tight">
                {APP_INFO.shortName}
            </p>
        </Link>
    );
}
