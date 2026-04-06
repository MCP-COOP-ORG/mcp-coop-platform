import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { Avatar, Button } from "@/shared/ui/primitives";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/core/configs/i18n/routing";
import { localeConfigs } from "@/shared/constants/locale";

interface LanguageSelectorProps {
  onAction?: () => void;
}

export default function LanguageSelector({ onAction }: LanguageSelectorProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleSelection = (key: string) => {
    if (key && key !== locale) {
      router.replace(pathname, { locale: key });
      onAction?.();
    }
  };

  const currentConfig = localeConfigs.find((c) => c.key === locale);

  return (
    <Dropdown 
      placement="bottom"
      classNames={{
        content: "min-w-[42px] w-[42px] !p-0 bg-background/95 backdrop-blur-md !border-1 !border-divider/50 shadow-sm",
      }}
    >
      <DropdownTrigger>
        {/* We use our exact icon-only button so it perfectly matches Moon/Sun/LogIn */}
        <Button appVariant="icon-only" aria-label="Select Language">
          {currentConfig ? (
            <Avatar 
              alt={currentConfig.label} 
              className="w-[26px] h-[26px] min-w-[26px] min-h-[26px] border border-default-200" 
              src={currentConfig.flag} 
            />
          ) : null}
        </Button>
      </DropdownTrigger>
      
      <DropdownMenu
        aria-label="Language options"
        onAction={(key) => handleSelection(key as string)}
        className="flex flex-col items-center gap-1 w-full !p-1 m-0"
        itemClasses={{
          base: "flex justify-center items-center !w-8 !h-8 !min-w-[32px] !min-h-[32px] !max-w-[32px] !max-h-[32px] !p-0 m-0 rounded-full data-[hover=true]:bg-default-100",
          title: "flex justify-center items-center shrink-0 w-full h-full"
        }}
      >
        {localeConfigs.map((config) => (
          <DropdownItem key={config.key} textValue={config.label} className="!p-0 flex justify-center items-center">
             <Avatar 
               alt={config.label} 
               className="w-[26px] h-[26px] min-w-[26px] min-h-[26px] max-w-[26px] max-h-[26px] shrink-0 pointer-events-none border border-default-200" 
               src={config.flag} 
             />
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
