import Dashboard from "@/components/mainPage";
import Head from "next/head";
// import styles from "@/styles/Home.module.css";


export default function Home() {
  return (
    <>
      <Head>
        <title>Financial Managment App</title>
        <meta name="description" content="Financial Managment App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <main>
          <Dashboard/>
        </main>
    </>
  );
}
