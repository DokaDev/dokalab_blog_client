import { useEffect } from "react";
import { siteConfig } from "../config/site";

export const usePageTitle = (pageTitle) => {
    useEffect(() => {
        const title = pageTitle ? `${siteConfig.title} | ${pageTitle}` : siteConfig.title;

        document.title = title;
    }, [pageTitle]);
};
