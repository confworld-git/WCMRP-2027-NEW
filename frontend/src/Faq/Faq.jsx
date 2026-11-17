import "./Faq.css";
import { Link } from "react-router-dom";
import {
  Sparkles,
  UserCheck,
  PenTool,
  Wallet,
  Clock,
  Newspaper,
  Search,
  Gift,
  XCircle,
  Phone,
  Lightbulb,
  Upload,
  CheckCircle,
  DollarSign,
} from "lucide-react";

const Faq = () => {
  const faqData = [
    {
      question: "What is WCMRP-2027?",
      answer:
        "The World Conference on Multidisciplinary Research & Practices (WCMRP-2027) is a premier event designed to bring together researchers, professionals, students and scholars from diverse fields.",
      icon: <Sparkles className="w-5 h-5" />,
      color: "blue",
    },
    {
      question: "Who can attend the conference?",
      answer:
        "The conference is open to faculty members, academic scholars, students, industry professionals, and anyone interested in the fields of science, technology, engineering, education and social sciences.",
      icon: <UserCheck className="w-5 h-5" />,
      color: "orange",
    },
    {
      question: "How do I register for the conference?",
      answer:
        "You can register for WCMRP-2027 through our online registration portal. Choose your category, fill out the registration form, select your sessions and complete the payment process.",
      icon: <PenTool className="w-5 h-5" />,
      color: "blue",
    },
    {
      question: "What are the registration fees?",
      answer:
        "The registration fees vary based on the category and registration period. Detailed fee information is available on the Registration Page.",
      icon: <Wallet className="w-5 h-5" />,
      color: "orange",
    },
    {
      question: "Can I submit my paper for presentation?",
      answer:
        "Yes, you can submit your abstract or full paper through our submission portal. All submissions will be reviewed, and accepted papers will be presented at the conference.",
      icon: <Upload className="w-5 h-5" />,
      color: "blue",
    },
    {
      question: "Will my paper be published?",
      answer:
        "High-quality papers presented at the conference will be considered for publication in various Web of Science, Scopus and other internationally indexed journals. Submit now",
      icon: <Newspaper className="w-5 h-5" />,
      color: "orange",
    },
    {
      question: "What is the review process for submitted papers?",
      answer:
        "All submitted papers will undergo a rigorous peer-review process conducted by experts in the respective fields. Reviewers will assess the originality, significance, and technical quality of the papers. Authors will be notified of the review results and any required revisions.",
      icon: <Search className="w-5 h-5" />,
      color: "blue",
    },
    {
      question: "What is included in the registration fee?",
      answer:
        "The registration fee includes access to all sessions and workshops, conference materials, refreshments and lunch during conference days, a certificate of participation and networking opportunities.",
      icon: <Gift className="w-5 h-5" />,
      color: "orange",
    },
    {
      question: "Is there a cancellation policy?",
      answer:
        "Yes, cancellations made 50 Days Before Conference: 40% refundable. 30-40 Days Before Conference: 35% refundable. Less Than 30 Days Before Conference: No refunds will be issued.",
      icon: <XCircle className="w-5 h-5" />,
      color: "blue",
    },
    {
      question: "How do I contact the conference organizers?",
      answer:
        "For general inquiries, please email info@confworld.org. For registration-related queries, email wcmrp.cerada@gmail.com. For sponsorship opportunities, reach out to collaboration@confworld.org",
      icon: <Phone className="w-5 h-5" />,
      color: "orange",
    },
    {
      question: "Will my presented paper be published?",
      answer:
        "Yes, high-quality papers presented at the conference will be considered for publication in various Web of Science, Scopus and other internationally indexed journals.",
      icon: <Lightbulb className="w-5 h-5" />,
      color: "blue",
    },
    {
      question: "How do I submit my paper for publication?",
      answer:
        "After presenting at the conference, you will receive detailed instructions on how to submit your paper for publication consideration in the indexed journals.",
      icon: <Upload className="w-5 h-5" />,
      color: "orange",
    },
    {
      question: "What is the review process for publication?",
      answer:
        "All submitted papers undergo a rigorous peer-review process by experts in the relevant field to ensure the quality and relevance of the research.",
      icon: <CheckCircle className="w-5 h-5" />,
      color: "blue",
    },
    {
      question: "Are there any additional fees for publication?",
      answer:
        "There may be additional fees for publication in certain journals. Detailed information will be provided after your paper is accepted for presentation at the conference.",
      icon: <DollarSign className="w-5 h-5" />,
      color: "orange",
    },
    {
      question: "When will I know if my paper is accepted for publication?",
      answer:
        "You will be notified about the acceptance of your paper for publication after the review process is complete, typically within 5 months post-conference.",
      icon: <Clock className="w-5 h-5" />,
      color: "blue",
    },
  ];
  return (
    <section className="faq">
      <div className="faq-page">
        <div className="speaker_head faq_img">
          <div>
            <span>
              <Link to="/">Home</Link> » Frequently Asked Questions
            </span>
            <h1>
              Frequently Asked<span> Questions</span>
            </h1>
            <p>
              Everything you need to know before, during, and after WCMRP-2027.
            </p>
          </div>
        </div>

        <div
          className="faq-grid"
          data-aos="fade-up"
          data-aos-anchor-placement="top-bottom"
        >
          {faqData.map(({ question, answer, icon, color }) => (
            <article key={question} className={`faq-item ${color}`}>
              <div className="faq-icon">{icon}</div>
              <h3>{question}</h3>
              <p>{answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
