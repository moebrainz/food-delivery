import SectionHeaders from "../menu/SectionHeaders";

const ContactUs = () => {
  return (
    <section className="text-center my-6" id="contact">
      <SectionHeaders subHeader="Don't hesitate" mainHeader="Contact us" />
      <div className="mt-4 space-x-9">
        <a href="tel:+24224242424" className="text-4xl underline text-gray-500">
          +235 235 252
        </a>
        <a href="tel:+24224242424" className="text-4xl underline text-gray-500">
          aphricana@gmail.com
        </a>
      </div>
    </section>
  );
};

export default ContactUs;
