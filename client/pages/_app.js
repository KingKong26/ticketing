import { cn } from "@/lib/utils";
import buildClient from "../api/build-client";
import Header from "../components/header";
import "./index.css";
import { Inter as FontSans } from "next/font/google";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div
      className={cn(
        "min-h-screen bg-background font-sans antialiased h-full",
        fontSans.variable
      )}
    >
      <Header currentUser={currentUser} />
      <div className="h-[calc(100vh-64px)] mx-auto max-w-[780px] md:max-w-[1080px] ">
        <Component {...pageProps} currentUser={currentUser} />
      </div>
    </div>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get("/api/users/currentuser");
  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      client,
      data.currentUser
    );
  }
  return { pageProps, ...data };
};

export default AppComponent;
