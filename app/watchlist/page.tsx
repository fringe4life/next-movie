import Link from "next/link";
import Header from "../components/Header";
import StyledLink from "../components/StyledLink";
import Client from "../components/Client";
import Footer from "../components/Footer";

export default function Watchlist(){
    return (
        <>
            <Header title="My Watchlist">
                <Link href='/'><StyledLink text="Home"/></Link>
            </Header>

            <Client />

            <Footer />
        </>
    )
}