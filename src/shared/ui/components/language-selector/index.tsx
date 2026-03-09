import { Select, SelectItem, Avatar } from "@heroui/react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/core/configs/i18n/routing";
import { localeConfigs } from "@/shared/constants/locale";

export default function LanguageSelector() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    if (nextLocale && nextLocale !== locale) {
      router.replace(pathname, { locale: nextLocale });
    }
  };

  return (
    <Select
      variant="bordered"
      aria-label="Select Language"
      className="w-[72px]"
      selectedKeys={[locale]}
      onChange={handleSelectionChange}
      items={localeConfigs}
      classNames={{
        trigger: "h-10 min-h-10 px-2",
        value: "flex justify-center",
        popoverContent: "w-[72px] min-w-[72px]"
      }}
      renderValue={(items) => {
        return items.map((item) => {
          const config = localeConfigs.find((c) => c.key === item.key);
          if (!config) return null;
          return (
            <div key={item.key} className="flex items-center justify-center w-full" title={config.label}>
              <Avatar alt={config.label} className="w-5 h-5 shrink-0" src={config.flag} />
            </div>
          );
        });
      }}
    >
      {(item) => (
        <SelectItem
          key={item.key}
          textValue={item.label}
        >
          <div className="flex items-center justify-center w-full" title={item.label}>
            <Avatar alt={item.label} className="w-5 h-5 shrink-0" src={item.flag} />
          </div>
        </SelectItem>
      )}
    </Select>
  );
}
