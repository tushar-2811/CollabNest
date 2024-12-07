import ThemeSwitcher from "@/components/switchers/ThemeSwitcher";
import { useTranslations } from "next-intl"


const Home = () => {
    const t = useTranslations("Index");
    return (
        <>
         <ThemeSwitcher/>
        </>
    )
};

export default Home;