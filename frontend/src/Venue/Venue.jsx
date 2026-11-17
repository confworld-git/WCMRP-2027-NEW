import "./Venue.css";

const Venue = () => {
  const images = Object.values(
    import.meta.glob("/src/assets/venue/*", {
      eager: true,
      query: "?url",
      import: "default",
    }),
  );

  return (
    <div className="venue_main">
      <div
        className="venue_head"
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
      >
        {/* <span className="Hybrid">Conference Location</span> */}
        <h1 className="main_head">Kuala Lumpur, Malaysia</h1>
        <p className="bottom_bar">
          Experience the vibrant culture, modern marvels, and natural beauty of
          Kuala Lumpur during the conference.
        </p>
      </div>

      <div
        className="venue_scroll"
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
      >
        <section className="venue_sticky">
          <div className="venue_strip">
            {images.map((url, i) => (
              <img src={url} key={i} alt="" />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Venue;
