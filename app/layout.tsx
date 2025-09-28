import type { Metadata } from "next";
import { IBM_Plex_Mono }from "next/font/google";
import { ChildrenType } from "./common/type/children";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Doka's Laboratory",
  description: "Doka's IT Archive: A Comprehensive Exploration of Systems, Web Development, and Artificial Intelligence.",
};

export default function RootLayout({ children }: ChildrenType) {
  return (
    <html lang='en' className={ibmPlexMono.variable}>
      <body className={ibmPlexMono.className}>
          {children}
      </body>
    </html>
  )
}