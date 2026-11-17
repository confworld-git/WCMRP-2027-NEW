import "./RegistrationSteps.css";
import selecting from "../../assets/reg-steps/Selecting.svg";
import fill from "../../assets/reg-steps/Fill.svg";
import Payment from "../../assets/reg-steps/Payment.svg";
import confirm from "../../assets/reg-steps/confirm.svg";

const steps = [
  {
    id: "01",
    title: "Select Category",
    description: "Choose your preferred admittance category based on your role.",
    image: selecting,
    alt: "Select Category",
  },
  {
    id: "02",
    title: "Fill Details",
    description:
      "Enter your personal and professional details in the registration form.",
    image: fill,
    alt: "Fill Details",
  },
  {
    id: "03",
    title: "Payment",
    description: "Complete your transaction securely via our payment gateway.",
    image: Payment,
    alt: "Payment",
  },
  {
    id: "04",
    title: "Confirmation",
    description: "Receive your official conference invitation letter via email.",
    image: confirm,
    alt: "Confirmation",
  },
];

const RegistrationSteps = () => {
  return (
    <div className="registration-steps" data-aos="fade-up"
     data-aos-anchor-placement="top-bottom">
      <div className="registration-steps__header">
        <p className="eyebrow">How it works</p>
        <h1>Registration Steps</h1>
        <p className="subtitle">
          Follow these simple steps to secure your spot at the conference.
        </p>
      </div>

      <section className="steps-grid" aria-label="Registration steps" data-aos="fade-up"
     data-aos-anchor-placement="top-bottom">
        {steps.map((step, index) => (
          <article className="step-card" key={step.id}>
            <div className="step-card__icon-wrap">
              <div className="step-card__orbit" aria-hidden="true" />
              <img src={step.image} alt={step.alt} className="step-card__image" />
            </div>

            <div className="step-card__content">
              <span className="step-card__index">Step 0{index + 1}</span>
              <h2>{step.title}</h2>
              <p>{step.description}</p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};

export default RegistrationSteps;
