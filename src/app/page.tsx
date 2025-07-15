import About from "./components/layout/About";
import ContactUs from "./components/layout/Contact-us";
import Hero from "./components/layout/Hero";
import HomeMenu from "./components/layout/HomeMenu";

export default function Home() {
  return (
    <div className=" max-w-4xl">
      <Hero />
      <HomeMenu />
      <About />
      <ContactUs />
    </div>
  );
}
