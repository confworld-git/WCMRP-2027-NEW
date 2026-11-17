import { FiMail, FiMapPin, FiPhone, FiSend } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./Contact.css";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import countryList from "react-select-country-list";
import { useMemo, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const contactInfo = [
  {
    icon: <FiPhone size={22} />,
    title: "Call Us",
    detail: "Support & Conference Assistance",
    value: "+91 8072381719",
    href: "tel:+918072381719",
    accentClass: "phone-card",
  },
  {
    icon: <FiMail size={22} />,
    title: "Email Us",
    detail: "General & Registration Inquiries",
    value: "wcmrp.cerada@gmail.com",
    href: "mailto:wcmrp.cerada@gmail.com",
    accentClass: "mail-card",
  },
];

const Contact = () => {
  const countries = useMemo(() => countryList().getData(), []);
  const [phone, setPhone] = useState();
  const [country, setCountry] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    try {
      const formData = new FormData(form);

      const contactData = {
        fullName: formData.get("fullName"),
        email: formData.get("email"),
        phone: phone || "",
        country: country,
        serviceRequired: formData.get("serviceRequired") || "General Query",
        message: formData.get("message"),
      };

      await toast.promise(
        axios.post(`${import.meta.env.VITE_API_URL}/api/contact/`, contactData),
        {
          loading: "Submitting your enquiry...",
          success: (response) =>
            response.data?.message || "Contact enquiry submitted.",
          error: (error) =>
            error.response?.data?.message ||
            "Something went wrong. Please try again.",
        },
      );

      form.reset();
      setPhone(undefined);
      setCountry(null);
    } catch (error) {
      console.error("Contact Submission Error:", error);
      if (error.response?.data?.saved) {
        form.reset();
        setPhone(undefined);
        setCountry(null);
      }
    }
  };

  return (
    <div className="contact-page">
      <div className="speaker_head contact_img">
        <div>
          <span>
            <Link to="/">Home</Link> » Contact Us
          </span>
          <h1>
            Get in <span>touch</span>
          </h1>
          <p>
            We’d love to hear from you! Reach out to us for any questions,
            <br />
            and our team will be happy to assist you.
          </p>
        </div>
      </div>
      <div className="contact-shell">
        <section className="contact-grid">
          <div
            className="contact-card contact-info-card"
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
          >
            <h2>Contact Information</h2>

            {contactInfo.map(
              ({ icon, title, detail, value, href, accentClass }) => (
                <div key={title} className="contact-item">
                  <div className={`contact-icon ${accentClass}`}>{icon}</div>
                  <div className="contact-copy">
                    <h3>{title}</h3>
                    <p>{detail}</p>
                    <a href={href}>{value}</a>
                  </div>
                </div>
              ),
            )}

            <div className="contact-item contact-location">
              <div className="contact-icon location-card">
                <FiMapPin size={22} />
              </div>
              <div className="contact-copy">
                <h3>Location</h3>
                <p>Conference Venue</p>
                <a
                  href="https://maps.google.com/?q=Kuala+Lumpur+Malaysia"
                  target="_blank"
                  rel="noreferrer"
                >
                  Kuala Lumpur, Malaysia
                </a>
              </div>
            </div>
          </div>

          <div
            className="contact-card form-card"
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
          >
            <div className="form-header">
              <h2>General Enquiry Form</h2>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="field-row">
                <div className="field-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="field-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <div className="field-row">
                <div className="field-group">
                  <label htmlFor="phone">Phone Number</label>
                  <PhoneInput
                    international
                    defaultCountry="IN"
                    value={phone}
                    onChange={setPhone}
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="field-group">
                  <label htmlFor="country">Country</label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                  >
                    <option value="">Select Country</option>
                    {countries.map((c) => (
                      <option key={c.value} value={c.label}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="field-row single">
                <div className="field-group">
                  <label htmlFor="service">Service Required</label>
                  <select name="serviceRequired" id="service">
                    <option value="">Select a service</option>
                    <option value="Paper Submission">Paper Submission</option>
                    <option value="Academic Partnership">
                      Academic Partnership
                    </option>
                    <option value="Sponsorship &amp; Exhibition">
                      Sponsorship &amp; Exhibition
                    </option>
                    <option value="Conference Registration">
                      Conference Registration
                    </option>
                    <option value="Speaker Nomination">
                      Speaker Nomination
                    </option>
                    <option value="General Query">General Query</option>
                  </select>
                </div>
              </div>

              <div className="field-row single">
                <div className="field-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    placeholder="Tell us about your query..."
                    required
                  />
                </div>
              </div>

              <button type="submit" className="submit-btn">
                <FiSend size={18} />
                Send Message
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;
