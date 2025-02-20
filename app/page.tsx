import Link from "next/link";
import Header from "./components/Header";
import StyledLink from "./components/StyledLink";

import Client from "./components/Client";
export default async function Home() {
  return (
  <>
    <Header title="Find your film" >
      <Link href='/watchlist'><StyledLink text="My Watchlist"/></Link>
    </Header>
    
    
    <Client />
    <footer className="w-full text-center"><a rel="noreferrer" target="_blank" href="https://icons8.com/icon/24391/film-reel">Film Reel</a> icon by <a rel="noreferrer" target="_blank" href="https://icons8.com">Icons8</a></footer>
  </>
  );
}
