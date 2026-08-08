import "./globals.css";

export const metadata = {
  title: "ColorStack UTA | Black & Latinx CS Community at UT Arlington",
  description:
    "ColorStack at UT Arlington supports Black and Latinx students in Computer Science and Technology through community, mentorship, career resources, and internship pipelines with partner companies.",
  metadataBase: new URL("https://colorstackuta.dev"),
  openGraph: {
    title: "ColorStack UTA",
    description:
      "Empowering the next generation of Black and Latinx technical leaders at UT Arlington.",
    url: "https://colorstackuta.dev",
    siteName: "ColorStack UTA",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
