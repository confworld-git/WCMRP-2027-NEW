import { useState, useEffect } from "react";
import {
  X,
  BookCopy,
  Search,
  Pencil,
  BarChart3,
  Mailbox,
  Lock,
  Target,
  Eye,
} from "lucide-react";
import "./View.css";

const FEATURES = [
  {
    icon: BookCopy,
    title: "Complete Publication Assistance",
    description:
      "We manage the entire process, including submission, journal communication, revisions, final publication and Scopus indexing support.",
  },
  {
    icon: Search,
    title: "Strategic Journal Selection",
    description:
      "Our experts carefully identify journals that align with your research field and scope.",
  },
  {
    icon: Pencil,
    title: "Expert Proofreading & Formatting",
    description:
      "Your manuscript is refined, formatted and prepared according to the target journal's guidelines.",
  },
  {
    icon: BarChart3,
    title: "Progress Updates Throughout",
    description:
      "Receive timely updates at every stage from submission, peer review to revisions, acceptance, publication and Scopus indexing.",
  },
  {
    icon: Mailbox,
    title: "Journal Submission Management",
    description:
      "Our team handles all interactions with journal editors and reviewers.",
  },
  {
    icon: Lock,
    title: "Reliable & Transparent Process",
    description:
      "We ensure clear communication, appropriate journal selection and dedicated support until your paper is successfully published.",
  },
  {
    icon: Target,
    title: "Hassle Free Research Focus",
    description:
      "Focus on your research while we handle the submission and publication.",
  },
];

const View = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div>
      <button
        type="button"
        className="ps-open-btn"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="package-inclusions-dialog"
        onClick={() => setOpen(true)}
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
      >
        <Eye size={18} /> View Package Inclusions
      </button>

      {open && (
        <div className="ps-overlay" onClick={() => setOpen(false)}>
          <div
            className="ps-modal"
            id="package-inclusions-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ps-titles"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="ps-header">
              <h2 id="ps-title" className="ps-titles">
                What's Included in Our Publication Support?
              </h2>
              <p className="ps-subtitle">
                Comprehensive services provided across all journal publication
                support packages.
              </p>
              <button
                type="button"
                className="ps-x"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="ps-body">
              {FEATURES.map(({ icon: Icon, title, description }) => (
                <div className="ps-item" key={title}>
                  <div className="ps-icon">
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3 className="ps-item-title">{title}</h3>
                    <p className="ps-item-desc">{description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="ps-footer">
              <button
                type="button"
                className="ps-close"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default View;
