import { useEffect } from "react";
import { siteConfig } from "../config/site";

/**
 * A custom React hook to dynamically update the favicon of the website
 * 
 * @param favicon - Optional URL path to a custom favicon image
 *                 If not provided, it will use the default favicon from siteConfig
 * 
 * @example
 * // Using default favicon from siteConfig
 * useCustomFavicon();
 * 
 * // Using custom favicon
 * useCustomFavicon("/path/to/custom-favicon.svg");
 */
export const useCustomFavicon = (favicon?: string): void => {
    useEffect(() => {
        const faviconUrl = favicon ?? siteConfig.favicon;
        
        let link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
        if (!link) {
            link = document.createElement("link");
            link.rel = "icon";
            document.head.appendChild(link);
        }
        link.href = faviconUrl;
    }, [favicon]);
}
