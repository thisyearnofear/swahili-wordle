import { useRouter } from "next/router";

export const useLocale = () => {
  const { locale = "en", locales } = useRouter();
  return { locale, locales };
};
