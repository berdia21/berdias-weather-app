import "styles/_main.scss";
import { Providers } from "@/redux/provider";

export const metadata = {
  title: "Weather App",
  description: "Berdias weather app for TNET",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
