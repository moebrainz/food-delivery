import SectionHeaders from "../menu/SectionHeaders";

const About = () => {
  return (
    <section className="text-center my-16" id="about">
      <SectionHeaders subHeader="Our Story" mainHeader="About us" />
      <div className="text-gray-800 max-w-md mx-auto  mt-4 space-y-4">
        <p className="">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat quis
          voluptatum ex assumenda voluptatibus reprehenderit at sit obcaecati.
          Culpa error explicabo minima accusantium rerum unde sint placeat,
          nostrum dicta cumque!
        </p>
        <p className="">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat quis
          voluptatum ex assumenda voluptatibus reprehenderit at sit obcaecati.
          Culpa error explicabo minima accusantium rerum unde sint placeat,
          nostrum dicta cumque!
        </p>
      </div>
    </section>
  );
};

export default About;
