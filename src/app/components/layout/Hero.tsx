import { ArrowRightCircleIcon, ShoppingCart } from "lucide-react";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="grid  grid-cols-[350px_1fr] gap-8 pt-5 pb-1">
      <div className="pt-12 pb-3">
        <h1 className="text-black text-5xl font-extrabold">
          Every food <span className="text-primary">taste better</span> with us
        </h1>
        <p className="text-gray-400 my-6 text-base">
          We&apos;ve got the missing piece with our tasty meals
        </p>
        <div className="flex gap-4 text-sm pt-8">
          <button className="bg-primary px-4 py-2 text-white rounded-full flex gap-2 uppercase items-center cursor-pointer font-semibold hover:bg-[#ff5047e2] ">
            Order Now
            <ShoppingCart className="text-xs hover:translate-x-0.5" />
          </button>
          <button className="bg-primary px-4 py-2 text-white flex gap-2 rounded-full items-center cursor-pointer font-semibold hover:bg-[#ff5047e2]">
            Learn More
            <ArrowRightCircleIcon className="hover:translate-x-0.5" />
          </button>
        </div>
      </div>
      <div className="  relative rounded-full ">
        <Image
          src={"/images/fd-1.jpg"}
          alt={"jellof"}
          fill
          objectFit="cover"
          className="rounded-full"
        />
      </div>
    </section>
  );
};

export default Hero;
