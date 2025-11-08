import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <title>Zuki Apps - מפתח אפליקציות מישראל</title>
        <meta name="description" content="Zuki Apps - מפתח אפליקציות מישראל. ZuList - אפליקציית רשימת קניות חכמה" />
      </head>
      <body>{children}</body>
    </html>
  );
}

