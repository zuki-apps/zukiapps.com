import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <title>Zuki Apps - Mobile App Developer from Israel</title>
        <meta name="description" content="Zuki Apps - Mobile App Developer from Israel. Creating smart and intuitive mobile applications. ZuList - Smart shopping list app." />
      </head>
      <body>{children}</body>
    </html>
  );
}

