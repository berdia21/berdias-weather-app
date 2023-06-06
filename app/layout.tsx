import "styles/_main.scss";
import { Providers } from "@/redux/provider";

export const metadata = {
  title: "Weather App",
  description: "Berdias weather app with nexy js 13",
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
