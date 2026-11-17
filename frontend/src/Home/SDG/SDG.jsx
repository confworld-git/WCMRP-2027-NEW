import "./SDG.css";
import cerada from "../../assets/Logo/clogo.jpeg";
import scopus from "../../assets/Logo/scopus-logo.png";

const SDG = () => {
  const images = Object.values(
    import.meta.glob("/src/assets/sdg/*", {
      eager: true,
      query: "?url",
      import: "default",
    }),
  );
  const institutes = Object.values(
    import.meta.glob("/src/assets/institutes/*", {
      eager: true,
      query: "?url",
      import: "default",
    }),
  );
  return (
    <div
      className="sdg_list"
      data-aos="fade-up"
      data-aos-anchor-placement="top-bottom"
    >
      <h1>#CERADA Supports SDGs</h1>
      <div>
        <img src={cerada} loading="eager" alt="CERADA logo" />
        <img
          src={scopus}
          loading="eager"
          alt="Scopus and Web of science logo"
        />
        {images.map((img, name) => (
          <img src={img} alt={name} key={img} loading="lazy" />
        ))}
      </div>
      <section className="scroll_img">
        <div>
          {[...institutes, ...institutes].map((img, index) => (
            <img
              src={img}
              alt={`Institute ${index + 1}`}
              key={`${img}-${index}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default SDG;
