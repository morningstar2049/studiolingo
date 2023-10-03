import Header from "@/components/Header";
import Head from "next/head";
import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "@/components/Navbar";
import { MobileMenuContextProvider } from "@/Context/MobileMenuContext";
import MobileNavMenu from "@/components/MobileNavMenu";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Studio Lingo",
  description: "შეაბიჯე ახალ სამყაროში",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    images: ["https://i.ibb.co/f8s59ww/page-Thumbnail.png"],
  },
};

const firago = localFont({
  src: [
    {
      path: "../../public/fonts/FiraGO-Regular.ttf",
      weight: "400",
    },
    {
      path: "../../public/fonts/FiraGO-Bold.ttf",
      weight: "700",
    },
    {
      path: "../../public/fonts/FiraGO-Medium.ttf",
      weight: "500",
    },
    {
      path: "../../public/fonts/FiraGO-Light.ttf",
      weight: "300",
    },
  ],
  variable: "--font-firago",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en" className={`${firago.variable} font-sans scroll-smooth`}>
        <body>
          <div id="fb-root" />

          <div id="fb-customer-chat" className="fb-customerchat" />
          <MobileMenuContextProvider>
            <div className="sticky top-[-2px] z-10">
              <Header />
              <Navbar />
            </div>
            <MobileNavMenu />
            {children}
          </MobileMenuContextProvider>
          <Script id="my-script">
            {`var chatbox = document.getElementById('fb-customer-chat')
       chatbox.setAttribute("page_id", "115967843863544")
      chatbox.setAttribute("attribution", "biz_inbox")`}
          </Script>
          <Script id="my-script-2">
            {` window.fbAsyncInit = function() {
        FB.init({
           xfbml            : true,
           version          : 'v18.0'
         });
       };

       (function(d, s, id) {
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) return;
         js = d.createElement(s); js.id = id;
         js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
         fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));`}
          </Script>
        </body>
      </html>
    </>
  );
}

// <!-- Messenger Chat Plugin Code -->
//     <div id="fb-root"></div>

//     <!-- Your Chat Plugin code -->
//     <div id="fb-customer-chat" class="fb-customerchat">
//     </div>

//     <script>
//       var chatbox = document.getElementById('fb-customer-chat');
//       chatbox.setAttribute("page_id", "115967843863544");
//       chatbox.setAttribute("attribution", "biz_inbox");
//     </script>

//     <!-- Your SDK code -->
//     <script>
//       window.fbAsyncInit = function() {
//         FB.init({
//           xfbml            : true,
//           version          : 'v18.0'
//         });
//       };

//       (function(d, s, id) {
//         var js, fjs = d.getElementsByTagName(s)[0];
//         if (d.getElementById(id)) return;
//         js = d.createElement(s); js.id = id;
//         js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
//         fjs.parentNode.insertBefore(js, fjs);
//       }(document, 'script', 'facebook-jssdk'));
//     </script>
