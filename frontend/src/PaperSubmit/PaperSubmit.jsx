import { useMemo, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import countryList from "react-select-country-list";
import {
  BookOpen,
  Briefcase,
  Building2,
  ClipboardList,
  FileText,
  Globe,
  Link,
  Mail,
  Megaphone,
  MessageCircle,
  MessageSquare,
  Mic,
  Monitor,
  Phone,
  Send,
  Upload,
  User,
  Users,
} from "lucide-react";
import "./PaperSubmit.css";

const PaperSubmit = () => {
  const countries = useMemo(() => countryList().getData(), []);
  const [phone, setPhone] = useState();
  const [country, setCountry] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const base = "WCMRP2027_MY_";
    const randomNumber = Math.floor(Math.random() * 900) + 100;
    const PaperID = `${base}${randomNumber}`;
    const form = event.currentTarget;
    const formData = new FormData(form);
    const submissionType = formData.get("submissionType") || "Research Paper";
    formData.set("paperId", PaperID);
    formData.set("mobile", phone || "");
    setIsSubmitting(true);

    try {
      await toast.promise(
        axios.post(
          `${import.meta.env.VITE_API_URL}/api/paper-submissions/`,
          formData,
        ),
        {
          loading: "Submitting your paper...",
          success: (response) =>
            response.data?.message || "Paper submission received.",
          error: (error) =>
            error.response?.data?.message ||
            "We could not submit your paper. Please try again.",
        },
      );
      if (typeof window !== "undefined") {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "paper_submission",
          conference_name: "WCMRP 2027",
          submissionId: PaperID,
          page_location: window.location.href,
        });
      }
      form.reset();
      setPhone(undefined);
      setCountry("");
    } catch (error) {
      console.error("Paper submission failed:", error);
      if (error.response?.data?.saved) {
        form.reset();
        setPhone(undefined);
        setCountry("");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="paper_submission">
      <div className="speaker_head paper_img">
        <div>
          <span>
            <RouterLink to="/">Home</RouterLink> » Abstract &amp; full paper
            submission
          </span>
          <h1>
            Abstract / Full paper <span>submission</span>
          </h1>
          <p>
            Submit Your Abstract and Full Paper for Review and Consideration.
          </p>
        </div>
      </div>
      <section
        className="paper_submission_section"
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
      >
        <form className="paper_submission_form" onSubmit={handleSubmit}>
          <div className="paper_submission_fields">
            <div className="paper_submission_group paper_submission_full">
              <label htmlFor="paper-title">
                <FileText size={16} aria-hidden="true" />
                Title of the Paper *
              </label>
              <input
                id="paper-title"
                name="paperTitle"
                type="text"
                placeholder="Enter paper title"
                required
              />
            </div>

            <div className="paper_submission_group">
              <label htmlFor="paper-author">
                <User size={16} aria-hidden="true" />
                Author Name *
              </label>
              <input
                id="paper-author"
                name="authorName"
                type="text"
                placeholder="Main author"
                autoComplete="name"
                required
              />
            </div>

            <div className="paper_submission_group">
              <label htmlFor="paper-coauthors">
                <Users size={16} aria-hidden="true" />
                Co-author Names
              </label>
              <input
                id="paper-coauthors"
                name="coauthors"
                type="text"
                placeholder="Separate co-author names with commas"
              />
            </div>

            <div className="paper_submission_group">
              <label htmlFor="paper-email">
                <Mail size={16} aria-hidden="true" />
                Corresponding Email *
              </label>
              <input
                id="paper-email"
                name="email"
                type="email"
                placeholder="email@example.com"
                autoComplete="email"
                required
              />
            </div>

            <div className="paper_submission_group">
              <label htmlFor="paper-mobile">
                <Phone size={16} aria-hidden="true" />
                Mobile Number *
              </label>
              <PhoneInput
                id="paper-mobile"
                name="mobile"
                international
                defaultCountry="IN"
                value={phone}
                onChange={setPhone}
                placeholder="Enter mobile number"
                autoComplete="tel"
                required
              />
            </div>

            <div className="paper_submission_group">
              <label htmlFor="paper-country">
                <Globe size={16} aria-hidden="true" />
                Country *
              </label>
              <select
                id="paper-country"
                name="country"
                value={country}
                onChange={(event) => setCountry(event.target.value)}
                autoComplete="country-name"
                required
              >
                <option value="">Select Country</option>
                {countries.map((item) => (
                  <option key={item.value} value={item.label}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="paper_submission_group">
              <label htmlFor="paper-whatsapp">
                <MessageCircle size={16} aria-hidden="true" />
                WhatsApp / Viber
              </label>
              <input
                id="paper-whatsapp"
                name="whatsapp"
                type="tel"
                placeholder="Number with country code"
                autoComplete="tel"
              />
            </div>

            <div className="paper_submission_group">
              <label htmlFor="paper-linkedin">
                <Link size={16} aria-hidden="true" />
                LinkedIn URL
              </label>
              <input
                id="paper-linkedin"
                name="linkedin"
                type="url"
                placeholder="https://linkedin.com/in/username"
              />
            </div>

            <div className="paper_submission_group">
              <label htmlFor="paper-facebook">
                <Link size={16} aria-hidden="true" />
                Facebook URL
              </label>
              <input
                id="paper-facebook"
                name="facebook"
                type="url"
                placeholder="https://facebook.com/username"
              />
            </div>

            <div className="paper_submission_group paper_submission_full">
              <label htmlFor="paper-institution">
                <Building2 size={16} aria-hidden="true" />
                University / Institution Name *
              </label>
              <input
                id="paper-institution"
                name="institution"
                type="text"
                placeholder="Enter institution name"
                required
              />
            </div>

            <div className="paper_submission_group">
              <label htmlFor="paper-department">
                <BookOpen size={16} aria-hidden="true" />
                Department
              </label>
              <input
                id="paper-department"
                name="department"
                type="text"
                placeholder="e.g. Computer Science"
              />
            </div>

            <div className="paper_submission_group">
              <label htmlFor="paper-designation">
                <Briefcase size={16} aria-hidden="true" />
                Designation
              </label>
              <input
                id="paper-designation"
                name="designation"
                type="text"
                placeholder="e.g. Assistant Professor, Student"
              />
            </div>

            <fieldset className="paper_submission_group paper_submission_choice">
              <legend>
                <ClipboardList size={16} aria-hidden="true" />
                Submission Type *
              </legend>
              <label>
                <input
                  type="radio"
                  name="submissionType"
                  value="Abstract"
                  required
                />
                Abstract
              </label>
              <label>
                <input type="radio" name="submissionType" value="Full paper" />
                Full paper
              </label>
            </fieldset>

            <fieldset className="paper_submission_group paper_submission_choice">
              <legend>
                <Mic size={16} aria-hidden="true" />
                Presentation Category *
              </legend>
              <label>
                <input
                  type="radio"
                  name="presentationCategory"
                  value="Oral"
                  required
                />
                Oral
              </label>
              <label>
                <input
                  type="radio"
                  name="presentationCategory"
                  value="Poster"
                />
                Poster
              </label>
            </fieldset>

            <fieldset className="paper_submission_group paper_submission_choice">
              <legend>
                <Monitor size={16} aria-hidden="true" />
                Presentation Type *
              </legend>
              <label>
                <input
                  type="radio"
                  name="presentationType"
                  value="Virtual"
                  required
                />
                Virtual
              </label>
              <label>
                <input type="radio" name="presentationType" value="Physical" />
                Physical
              </label>
            </fieldset>

            <fieldset className="paper_submission_group paper_submission_choice">
              <legend>
                <BookOpen size={16} aria-hidden="true" />
                Publication Required? *
              </legend>
              <label>
                <input
                  type="radio"
                  name="publicationRequired"
                  value="Yes"
                  required
                />
                Yes
              </label>
              <label>
                <input type="radio" name="publicationRequired" value="No" />
                No
              </label>
            </fieldset>

            <div className="paper_submission_group paper_submission_upload paper_submission_full">
              <label htmlFor="paper-file">
                <Upload size={16} aria-hidden="true" />
                File Upload (.doc / .docx) *
              </label>
              <input
                id="paper-file"
                name="paperFile"
                type="file"
                accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                required
              />
              <small>
                Upload your abstract or full paper as a Word document (max 3
                MB).
              </small>
            </div>

            <div className="paper_submission_group">
              <label htmlFor="paper-source">
                <Megaphone size={16} aria-hidden="true" />
                Conference Source
              </label>
              <textarea
                id="paper-source"
                name="conferenceSource"
                rows="3"
                placeholder="How did you hear about the conference?"
              />
            </div>

            <div className="paper_submission_group">
              <label htmlFor="paper-message">
                <MessageSquare size={16} aria-hidden="true" />
                Message
              </label>
              <textarea
                id="paper-message"
                name="message"
                rows="3"
                placeholder="Any other message for the committee"
              />
            </div>
          </div>

          <button
            className="paper_submission_button"
            type="submit"
            disabled={isSubmitting}
          >
            <FileText size={18} aria-hidden="true" />
            {isSubmitting ? "Submitting..." : "Submit Your Paper"}
            <Send size={16} aria-hidden="true" />
          </button>
        </form>
      </section>
    </div>
  );
};

export default PaperSubmit;
