const SectionHeaders = ({
  subHeader,
  mainHeader,
}: {
  subHeader?: string;
  mainHeader?: string;
}) => {
  return (
    <>
      <h3 className="text-gray-600 text-base font-semibold  uppercase leading-4 ">
        {subHeader}
      </h3>
      <h2 className="text-primary font-bold text-4xl italic mb-4">
        {mainHeader}
      </h2>
    </>
  );
};

export default SectionHeaders;
