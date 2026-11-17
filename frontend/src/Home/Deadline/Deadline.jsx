import "./Deadline.css";
import deadlines from "./Deadline.json";

const Deadline = () => {
  // const deadlines = [
  //   {
  //     title: "Early Bird Registration",
  //     day: "31",
  //     suffix: "st",
  //     month: "Dec 2026",
  //   },
  //   {
  //     title: "Abstract Submission",
  //     day: "31",
  //     suffix: "st",
  //     month: "Jan 2027",
  //   },
  //   {
  //     title: "Full Paper Submission",
  //     day: "28",
  //     suffix: "th",
  //     month: "Feb 2027",
  //   },
  //   {
  //     title: "Final Registration",
  //     day: "31",
  //     suffix: "st",
  //     month: "Mar 2027",
  //   },
  // ];

  return (
    <div
      className="deadlines"
      data-aos="fade-up"
      data-aos-anchor-placement="top-bottom"
    >
      <span className="mini_head">Important Dates</span>
      <h1 className="main_head">Submission Deadlines</h1>

      <section
        className="deadlines_calender"
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
      >
        {deadlines.map((deadline, index) => (
          <div key={index}>
            <p>{deadline.title}</p>
            <h1>
              {deadline.day} <sub>{deadline.suffix}</sub>
            </h1>
            <span>{deadline.month}</span>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Deadline;
