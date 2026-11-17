import { useState } from "react";
import "./Essential.css";
import axios from "axios";
import toast from "react-hot-toast";
import abstractTemplate from "../assets/Downloads/abstract.docx?url";
import conferencePoster from "../assets/Downloads/conference_poster.jpg";
import fullPaperTemplate from "../assets/Downloads/full_paper.doc?url";
import presentationTemplate from "../assets/Downloads/PPT Model.ppt?url";
import registrationForm from "../assets/Downloads/Registration form.pdf";
import conferenceBrochure from "../assets/Downloads/wcmrp_Brochure.pdf";
import {
  FileImage,
  SquareBookmark,
  SquareDashedKanban,
  NotepadTextDashed,
  Presentation,
  Shredder,
} from "lucide-react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const Essential = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [phone, setPhone] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const downloadFile = (fileUrl, fileName) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const finishBrochureRequest = (form) => {
    setShowPopup(false);
    form.reset();
    setPhone(undefined);
    downloadFile(conferenceBrochure, "wcmrp_Brochure.pdf");
  };

  const handleBrochureSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setIsSubmitting(true);

    try {
      await toast.promise(
        axios.post(`${import.meta.env.VITE_API_URL}/api/brochure/`, {
          fullName: formData.get("fullName"),
          email: formData.get("email"),
          socialMediaLink: formData.get("socialMediaLink"),
          phone,
          discoverySource: formData.get("discoverySource"),
        }),
        {
          loading: "Submitting your brochure request...",
          success: (response) =>
            response.data?.message || "Brochure request submitted.",
          error: (error) =>
            error.response?.data?.message ||
            "We could not submit your request. Please try again.",
        },
      );
      finishBrochureRequest(form);
    } catch (error) {
      console.error("Brochure request submission failed:", error);
      if (error.response?.data?.saved) {
        finishBrochureRequest(form);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="Essential-downloads">
      <div
        className="ess_head"
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
      >
        <span className="Hybrid">Resource Center</span>
        <h1 className="main_head">Conference Documents & Templates</h1>
        <p className="bottom_bar">
          Access abstract guidelines, paper templates, slide presentation
          models, and official event brochures.
        </p>
      </div>
      <section
        className="ess_icons"
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
      >
        <div data-aos="fade-up" data-aos-anchor-placement="top-bottom">
          <div>
            <FileImage />
          </div>
          <h1>Conference Poster</h1>
          <button
            type="button"
            onClick={() =>
              downloadFile(conferencePoster, "conference_poster.jpg")
            }
          >
            Download Poster
          </button>
        </div>
        <div data-aos="fade-up" data-aos-anchor-placement="top-bottom">
          <div>
            <SquareBookmark />
          </div>
          <h1>Conference Brochure</h1>
          <button onClick={() => setShowPopup(true)}>Download Brochure</button>
        </div>
        <div>
          <div>
            <SquareDashedKanban />
          </div>
          <h1>Abstract Template</h1>
          <button
            type="button"
            onClick={() => downloadFile(abstractTemplate, "abstract.docx")}
          >
            Download Abstract
          </button>
        </div>
        <div data-aos="fade-up" data-aos-anchor-placement="top-bottom">
          <div>
            <NotepadTextDashed />
          </div>
          <h1>Full Paper Template</h1>
          <button
            type="button"
            onClick={() => downloadFile(fullPaperTemplate, "full_paper.doc")}
          >
            Download Full Paper
          </button>
        </div>
        <div data-aos="fade-up" data-aos-anchor-placement="top-bottom">
          <div>
            <Presentation />
          </div>
          <h1>Presentation Template</h1>
          <button
            type="button"
            onClick={() => downloadFile(presentationTemplate, "PPT Model.ppt")}
          >
            Download Presentation
          </button>
        </div>
        <div data-aos="fade-up" data-aos-anchor-placement="top-bottom">
          <div>
            <Shredder />
          </div>
          <h1>Registration Form</h1>
          <button
            type="button"
            onClick={() =>
              downloadFile(registrationForm, "Registration form.pdf")
            }
          >
            Download Registration
          </button>
        </div>
      </section>
      {showPopup && (
        <section
          className="broucher_form"
          role="dialog"
          aria-modal="true"
          aria-labelledby="broucher_form_title"
          onClick={(event) => {
            if (event.target === event.currentTarget) setShowPopup(false);
          }}
        >
          <div className="broucher_form__panel">
            <button
              className="broucher_form__close"
              type="button"
              aria-label="Close brochure form"
              onClick={() => setShowPopup(false)}
            >
              &times;
            </button>
            <h2 id="broucher_form_title">Download the brochure</h2>
            <p>Share your details to access the conference brochure.</p>
            <form onSubmit={handleBrochureSubmit}>
              <div>
                <label htmlFor="brochure-name">Name*</label>
                <input
                  id="brochure-name"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label htmlFor="brochure-email">Email*</label>
                <input
                  id="brochure-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label htmlFor="brochure-social-link">Social Media Link*</label>
                <input
                  id="brochure-social-link"
                  name="socialMediaLink"
                  type="url"
                  placeholder="https://..."
                  required
                />
              </div>
              <div>
                <label htmlFor="brochure-phone">Phone*</label>
                <PhoneInput
                  id="brochure-phone"
                  name="phone"
                  international
                  defaultCountry="IN"
                  value={phone}
                  onChange={setPhone}
                  autoComplete="tel"
                  placeholder="Enter your mobile number"
                  required
                />
              </div>
              <div>
                <label htmlFor="brochure-discovery-source">
                  How did you find us?*
                </label>
                <input
                  id="brochure-discovery-source"
                  name="discoverySource"
                  type="text"
                  placeholder="How did you hear about the conference?"
                  required
                />
              </div>
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </section>
      )}
    </div>
  );
};

export default Essential;
