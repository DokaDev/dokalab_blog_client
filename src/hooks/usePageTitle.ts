import { useEffect } from "react";
import { siteConfig } from "../config/site";

export const usePageTitle = (title: string): void => {
    useEffect(() => {
        const newTitle = title ? `${siteConfig.title} | ${title}` : siteConfig.title;
        document.title = newTitle;
    }, [title]);
};
