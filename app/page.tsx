import Link from "next/link";
import Header from "./components/Header";
import StyledLink from "./components/StyledLink";

import Client from "./components/Main";
import Footer from "./components/Footer";
export default async function Home() {
  return (
    <>
      <Header title="Find your film" >
        <Link href='/watchlist'><StyledLink text="My Watchlist"/></Link>
      </Header>
      
      
      <Client />
      
      <Footer />
    </>
  );
}
