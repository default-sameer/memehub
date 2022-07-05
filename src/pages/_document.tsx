import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  
    return (
      <Html lang="en">
        <Head>
            {/* Favicons */}
            <link href="/favicon.ico" rel="shortcut icon" />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="manifest" href="/site.webmanifest" />
            <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
            <meta name="msapplication-TileColor" content="#000000" />
            <meta name="theme-color" content="#ffa31a" />
            {/* Favicons */}
            {/* OpenGraph MetaData*/}
            <meta property="og:image:height" content="401" />
            <meta property="og:image:width" content="767" />
            <meta property="og:title" content="MemeHub" />
            <meta property="og:description" content="One Stop For All of Your Meme Needs" />
            <meta property="og:url" content="https://memehub.vercel.app/" />
            <meta property="og:image" content="https://memehub.vercel.app/og-image.jpg" />
            {/* OpenGraph Metadata */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
}
