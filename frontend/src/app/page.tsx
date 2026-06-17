
import Hero from "@/components/Hero/Hero"
import Navbar from "@/components/Navbar/Navbar"
import Portfolio from "@/components/Portfolio/Portfolio"
import Services from "@/components/Service/Services"
import Stats from "@/components/Stats/Stats"



export default function Home() {
  return (
    <>
    <Navbar />
    <Hero />
    <Services />
    <Portfolio />
    <Stats />
    </>
  )
}