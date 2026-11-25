import { useState } from "react";
import "./RegistrationFee.css";
import data from "./registrationFees.json";
import View from "./View/View";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const MEMBERSHIP_FEE_CENTS = 2000;
const MEMBERSHIP_DISCOUNT_RATE = 0.05;
const CONVENIENCE_FEE_RATE = 0.06;
const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: data.currency,
});

const formatCurrency = (cents) => currencyFormatter.format(cents / 100);

const loadRazorpayCheckout = () => {
  if (window.Razorpay) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = resolve;
    script.onerror = () => {
      script.remove();
      reject(new Error("Could not load Razorpay Checkout."));
    };
    document.body.appendChild(script);
  });
};

const publicationSupport = [
  {
    id: "q1",
    journal: "Q1 Indexed Journal",
    badge: "Exclusive Offer",
    offerPrice: 3000,
    regularPrice: 3500,
    save: 500,
  },
  {
    id: "q2",
    journal: "Q2 Indexed Journal",
    badge: "Exclusive Offer",
    offerPrice: 2000,
    regularPrice: 2500,
    save: 500,
  },
  {
    id: "q3",
    journal: "Q3 Indexed Journal",
    badge: "Exclusive Offer",
    offerPrice: 1600,
    regularPrice: 2000,
    save: 400,
  },
  {
    id: "q4",
    journal: "Q4 Indexed Journal",
    badge: "Exclusive Offer",
    offerPrice: 1000,
    regularPrice: 1500,
    save: 500,
  },
];

const addons = [
  {
    id: "tour",
    title: "Post Conference Tour",
    description: "Physical Participants Only",
    price: 100,
    currency: "USD",
  },
  {
    id: "abstract-cover",
    title: "Graphical Abstract & Cover Letter",
    description: "Professional design",
    price: 50,
    currency: "USD",
  },
  {
    id: "format-research",
    title: "Journal Formatting",
    description: "Research Paper",
    price: 100,
    currency: "USD",
  },
  {
    id: "format-review",
    title: "Journal Formatting",
    description: "Review Paper",
    price: 200,
    currency: "USD",
  },
  {
    id: "ppt",
    title: "PPT Formatting & Illustration",
    description: "Conference presentation",
    price: 75,
    currency: "USD",
  },
];

function FeeTable({
  title,
  columns,
  rows,
  presentationType,
  selectedFee,
  setFee,
  setPresentationType,
}) {
  return (
    <section className="fee-section">
      <h2>{title}</h2>
      <div className="fee-table-wrap">
        <table className="fee-table">
          <thead>
            <tr>
              <th scope="col">Categories</th>
              {columns.map((col) => (
                <th scope="col" key={col}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.category}>
                <th scope="row">{row.category}</th>
                {row.fees.map((fee, i) => (
                  <td key={i}>
                    <label className="fee-option">
                      <input
                        type="radio"
                        name="registration_fee"
                        value={`${row.category}|${columns[i]}|${fee}`}
                        checked={
                          selectedFee?.presentationType === presentationType &&
                          selectedFee.category === row.category &&
                          selectedFee.column === columns[i]
                        }
                        onChange={() => {
                          setFee({
                            id: i,
                            category: row.category,
                            column: columns[i],
                            amount: fee,
                            presentationType,
                          });
                          setPresentationType(presentationType);
                        }}
                      />
                      <span>${fee}</span>
                    </label>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

const FeeForm = () => {
  const navigate = useNavigate();
  const [fee, setFee] = useState(null);
  const [presentationType, setPresentationType] = useState("");
  const [selectedJournalId, setSelectedJournalId] = useState(null);
  const [selectedAddonIds, setSelectedAddonIds] = useState([]);
  const [discount, setDiscount] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const selectedJournal = publicationSupport.find(
    (offer) => offer.id === selectedJournalId,
  );
  const selectedAddons = addons.filter((item) =>
    selectedAddonIds.includes(item.id),
  );
  const registrationFeeCents = Math.round((fee?.amount ?? 0) * 100);
  const journalSupportCents = Math.round(
    (selectedJournal?.offerPrice ?? 0) * 100,
  );
  const addonsCents = selectedAddons.reduce(
    (total, item) => total + Math.round(item.price * 100),
    0,
  );
  const combinedSubtotalCents =
    registrationFeeCents + journalSupportCents + addonsCents;
  const membershipDiscountCents = discount
    ? Math.round(registrationFeeCents * MEMBERSHIP_DISCOUNT_RATE)
    : 0;
  const membershipFeeCents = discount ? MEMBERSHIP_FEE_CENTS : 0;
  const subtotalCents =
    combinedSubtotalCents - membershipDiscountCents + membershipFeeCents;
  const convenienceCents = Math.round(subtotalCents * CONVENIENCE_FEE_RATE);
  const totalCents = subtotalCents + convenienceCents;

  const handleCheckout = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!fee) {
      toast.error("Please select a registration fee.");
      return;
    }

    const formData = new FormData(form);
    const registration = {
      title: formData.get("Title"),
      firstName: formData.get("first_name"),
      lastName: formData.get("last_name"),
      certificateName: formData.get("certificate_name"),
      dateOfBirth: formData.get("DOB"),
      nationality: formData.get("nationality"),
      department: formData.get("department"),
      institution: formData.get("institution"),
      mobile: formData.get("number"),
      email: formData.get("email"),
      participantCategory: formData.get("participant_category"),
      presentationCategory:
        formData.get("presentation_Category") === "oral" ? "Oral" : "Poster",
      presentationType: formData.get("presentation_Type"),
      termsAccepted: formData.get("termsAccepted") === "true",
    };
    const selection = {
      presentationType: fee.presentationType,
      feeCategory: fee.category,
      feePeriod: fee.column === "Standard (USD)" ? "Final (USD)" : fee.column,
      journalId: selectedJournalId,
      addonIds: selectedAddonIds,
      membership: discount,
    };
    setIsCheckingOut(true);

    try {
      const { data: order } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/registration-payments/orders`,
        {
          registration,
          selection,
        },
      );

      await loadRazorpayCheckout();
      if (!window.Razorpay) {
        throw new Error("Razorpay Checkout did not initialize.");
      }
      if (
        order.success !== true ||
        typeof order.keyId !== "string" ||
        typeof order.orderId !== "string" ||
        !Number.isSafeInteger(order.amount) ||
        order.amount <= 0 ||
        order.currency !== data.currency
      ) {
        throw new Error("The payment order response was invalid.");
      }
      console.log(order);
      let isVerifyingPayment = false;
      let hasPaymentFailed = false;
      let paymentStateUpdates = Promise.resolve();
      const queuePaymentStateUpdate = (update) => {
        const nextUpdate = paymentStateUpdates.then(update);
        paymentStateUpdates = nextUpdate.catch(() => {});
        return nextUpdate;
      };
      const checkout = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: "WCMRP",
        description: "Conference registration",
        order_id: order.orderId,
        prefill: {
          name: `${formData.get("first_name")} ${formData.get("last_name")}`,
          email: formData.get("email"),
          contact: formData.get("number"),
        },
        theme: { color: "#010ba8" },
        modal: {
          ondismiss: () => {
            if (isVerifyingPayment) {
              return;
            }
            setIsCheckingOut(false);
            if (hasPaymentFailed) {
              return;
            }
            queuePaymentStateUpdate(() =>
              axios.post(
                `${import.meta.env.VITE_API_URL}/api/registration-payments/orders/${encodeURIComponent(order.orderId)}/cancel`,
              ),
            )
              .then(() => toast("Checkout cancelled. You can try again."))
              .catch((error) => {
                console.error(
                  "Checkout cancellation could not be recorded:",
                  error,
                );
                toast.error(
                  "Checkout closed, but its status could not be recorded. Contact support if you may have been charged.",
                );
              });
          },
        },
        handler: async (paymentResponse) => {
          isVerifyingPayment = true;
          try {
            const { data: verification } = await axios.post(
              `${import.meta.env.VITE_API_URL}/api/registration-payments/verify`,
              paymentResponse,
            );
            if (verification.success !== true) {
              throw new Error(
                verification.message || "Payment verification failed.",
              );
            }

            // ── GA4 / GTM purchase push ──────────────────────────────
            const items = [
              {
                item_id: `${fee.presentationType}_${fee.category}`,
                item_name: `Registration - ${fee.category}`,
                item_category: "Registration",
                item_variant: `${fee.presentationType} / ${fee.column}`,
                price: registrationFeeCents / 100,
                discount: membershipDiscountCents / 100,
                quantity: 1,
              },
              ...(selectedJournal
                ? [
                    {
                      item_id: `journal_${selectedJournal.id}`,
                      item_name: selectedJournal.journal,
                      item_category: "Journal Support",
                      price: selectedJournal.offerPrice,
                      quantity: 1,
                    },
                  ]
                : []),
              ...selectedAddons.map((a) => ({
                item_id: a.id,
                item_name: `${a.title} - ${a.description}`,
                item_category: "Add-on",
                price: a.price,
                quantity: 1,
              })),
              ...(discount
                ? [
                    {
                      item_id: "premium_membership",
                      item_name: "Premium Membership",
                      item_category: "Membership",
                      price: membershipFeeCents / 100,
                      quantity: 1,
                    },
                  ]
                : []),
            ];

            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({ ecommerce: null });
            window.dataLayer.push({
              event: "Registration",
              conference_name: "WCMRP-2027",
              ecommerce: {
                transaction_id: paymentResponse.razorpay_payment_id,
                value: Number((order.amount / 100).toFixed(2)),
                currency: order.currency,
                items,
              },
            });
            // ─────────────────────────────────────────────────────────
            toast.success(
              verification.message || "Registration payment successful.",
            );
            navigate("/Payment-success-page", {
              state: {
                receipt: {
                  orderId: order.orderId,
                  paymentId: paymentResponse.razorpay_payment_id,
                  amount: order.amount,
                  currency: order.currency,
                  paidAt: new Date().toISOString(),
                  registration,
                  selection: {
                    ...selection,
                    feePeriod: fee.column,
                    journal: selectedJournal?.journal ?? null,
                    addons: selectedAddons.map(
                      (addon) => `${addon.title} - ${addon.description}`,
                    ),
                  },
                },
              },
            });
            form.reset();
            setFee(null);
            setPresentationType("");
            setSelectedJournalId(null);
            setSelectedAddonIds([]);
            setDiscount(false);
          } catch (error) {
            console.error("Registration payment verification failed:", error);
            toast.error(
              error.response?.data?.message ||
                error.message ||
                "Payment was received, but verification failed. Please contact support.",
            );
          } finally {
            isVerifyingPayment = false;
            setIsCheckingOut(false);
          }
        },
      });

      await queuePaymentStateUpdate(() =>
        axios.post(
          `${import.meta.env.VITE_API_URL}/api/registration-payments/orders/${encodeURIComponent(order.orderId)}/start`,
        ),
      );

      checkout.on("payment.submit", () => {
        hasPaymentFailed = false;
        queuePaymentStateUpdate(() =>
          axios.post(
            `${import.meta.env.VITE_API_URL}/api/registration-payments/orders/${encodeURIComponent(order.orderId)}/start`,
          ),
        ).catch((error) => {
          console.error(
            "Registration payment status could not be updated:",
            error,
          );
        });
      });

      checkout.on("payment.failed", (paymentError) => {
        hasPaymentFailed = true;
        toast.error(
          paymentError.error?.description ||
            "Payment attempt failed. You can retry checkout.",
        );

        const metadata = paymentError.error?.metadata;
        if (metadata?.order_id && metadata?.payment_id) {
          queuePaymentStateUpdate(() =>
            axios.post(
              `${import.meta.env.VITE_API_URL}/api/registration-payments/attempts/failed`,
              {
                orderId: metadata.order_id,
                paymentId: metadata.payment_id,
              },
            ),
          ).catch((error) => {
            console.error(
              "Failed payment attempt could not be recorded:",
              error,
            );
          });
        }
      });
      checkout.open();
    } catch (error) {
      console.error("Registration checkout could not be started:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Could not start checkout. Please try again.",
      );
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="registration_fees_Form">
      <h1
        className="main_head"
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
      >
        Registration Fees
      </h1>
      <p
        className="fee_ptag"
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
      >
        *Note: Additional charges applicable for Scopus publication (T&C Apply)
      </p>
      <section
        className="registration_fee_table"
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
      >
        <FeeTable
          {...data.physical}
          presentationType="Physical"
          selectedFee={fee}
          setFee={setFee}
          setPresentationType={setPresentationType}
        />
        <FeeTable
          {...data.virtual}
          presentationType="Virtual"
          selectedFee={fee}
          setFee={setFee}
          setPresentationType={setPresentationType}
        />
      </section>
      <span
        className="warning"
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
      >
        *Indicates - UG/PG students only (You have to submit a soft copy of your
        university/college identity card as a proof)
      </span>
      <h1
        className="main_head"
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
      >
        Research Publication Support
      </h1>
      <p
        className="fee_ptag"
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
      >
        Increase the impact of your research with structured support for
        publication in Q1, Q2, Q3, Q4 Scopus indexed journals.
      </p>
      <View />
      <section
        className="offer-grid"
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
      >
        {publicationSupport.map((offer) => (
          <div
            className="offer-card"
            key={offer.id}
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
          >
            <h3>{offer.journal}</h3>
            <p className="offer-badge">⚡ {offer.badge}</p>
            <p className="offer-price">${offer.offerPrice.toLocaleString()}</p>
            <p className="offer-regular">
              Regular: <s>${offer.regularPrice.toLocaleString()} USD</s>
            </p>
            <p className="offer-save">Save ${offer.save.toLocaleString()}</p>
            <button
              type="button"
              className={selectedJournalId === offer.id ? "added" : ""}
              aria-pressed={selectedJournalId === offer.id}
              onClick={() =>
                setSelectedJournalId((currentId) =>
                  currentId === offer.id ? null : offer.id,
                )
              }
            >
              {selectedJournalId === offer.id ? "Added" : "Add"}
            </button>
          </div>
        ))}
      </section>
      <h2
        className="addons"
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
      >
        Addons
      </h2>
      <section
        className="service-grid"
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
      >
        {addons.map((item) => {
          const isSelected = selectedAddonIds.includes(item.id);

          return (
            <div
              className="service-card"
              key={item.id}
              data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
            >
              <h3>{item.title}</h3>
              <p className="service-desc">{item.description}</p>
              <p className="service-price">
                ${item.price}
                <span>{item.currency}</span>
              </p>
              <button
                type="button"
                className={isSelected ? "added" : ""}
                aria-pressed={isSelected}
                onClick={() =>
                  setSelectedAddonIds((currentIds) =>
                    isSelected
                      ? currentIds.filter((id) => id !== item.id)
                      : [...currentIds, item.id],
                  )
                }
              >
                {isSelected ? "Added" : "Add"}
              </button>
            </div>
          );
        })}
      </section>
      <h1
        className="main_head"
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
      >
        Registration Form
      </h1>
      <p
        className="fee_ptag"
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
      >
        "1st International Conference on Applied Science, Engineering,
        Education, Business, Management and Social Science & Humanities
        (ICAEBMS-2027)"
      </p>
      <section
        className="conference_registration_form"
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
      >
        <form
          id="registration-form"
          className="conf-form"
          onSubmit={handleCheckout}
        >
          <section
            className="conf-form__grid"
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
          >
            <div className="conf-form__group">
              <label className="conf-form__label" htmlFor="title">
                Title
              </label>
              <select
                className="conf-form__control"
                id="title"
                name="Title"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Select Title
                </option>
                <option>Mr</option>
                <option>Ms</option>
                <option>Mrs</option>
                <option>Dr</option>
                <option>Prof</option>
              </select>
            </div>

            <div className="conf-form__group">
              <label className="conf-form__label" htmlFor="first_name">
                First Name
              </label>
              <input
                className="conf-form__control"
                id="first_name"
                type="text"
                name="first_name"
                placeholder="First Name"
                required
              />
            </div>

            <div className="conf-form__group">
              <label className="conf-form__label" htmlFor="last_name">
                Last Name
              </label>
              <input
                className="conf-form__control"
                id="last_name"
                type="text"
                name="last_name"
                placeholder="Last Name"
                required
              />
            </div>

            <div className="conf-form__group">
              <label className="conf-form__label" htmlFor="certificate_name">
                Certificate Name
              </label>
              <input
                className="conf-form__control"
                id="certificate_name"
                type="text"
                name="certificate_name"
                placeholder="Certificate Name"
                required
              />
            </div>

            <div className="conf-form__group">
              <label className="conf-form__label" htmlFor="dateofbirth">
                Date of Birth
              </label>
              <input
                className="conf-form__control"
                id="dateofbirth"
                type="date"
                name="DOB"
                max="2020-01-01"
                required
              />
            </div>

            <div className="conf-form__group">
              <label className="conf-form__label" htmlFor="nationality">
                Nationality
              </label>
              <input
                className="conf-form__control"
                id="nationality"
                type="text"
                name="nationality"
                placeholder="Nationality"
                required
              />
            </div>

            <div className="conf-form__group">
              <label className="conf-form__label" htmlFor="department">
                Department
              </label>
              <input
                className="conf-form__control"
                id="department"
                type="text"
                name="department"
                placeholder="Department"
                required
              />
            </div>

            <div className="conf-form__group">
              <label className="conf-form__label" htmlFor="institution">
                Institution
              </label>
              <input
                className="conf-form__control"
                id="institution"
                type="text"
                name="institution"
                placeholder="Institution"
                required
              />
            </div>

            <div className="conf-form__group">
              <label className="conf-form__label" htmlFor="number">
                Mobile Number
              </label>
              <input
                className="conf-form__control"
                id="number"
                type="tel"
                name="number"
                placeholder="Mobile Number with Country Code"
                required
              />
            </div>

            <div className="conf-form__group">
              <label className="conf-form__label" htmlFor="email">
                E-mail
              </label>
              <input
                className="conf-form__control"
                id="email"
                type="email"
                name="email"
                placeholder="E-mail"
                required
              />
            </div>

            <div className="conf-form__group conf-form__group--full">
              <label
                className="conf-form__label"
                htmlFor="participant_category"
              >
                Participant Category
              </label>
              <select
                className="conf-form__control"
                id="participant_category"
                name="participant_category"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Select Participant Category
                </option>
                <option>Academicians</option>
                <option>Delegates</option>
                <option>Research scholars</option>
                <option>Student</option>
              </select>
            </div>

            <fieldset className="conf-form__group conf-form__fieldset">
              <legend className="conf-form__label">
                Presentation Category
              </legend>
              <div className="conf-form__choices">
                <label className="conf-form__choice">
                  <input
                    type="radio"
                    name="presentation_Category"
                    value="oral"
                    required
                  />
                  <span>Oral</span>
                </label>
                <label className="conf-form__choice">
                  <input
                    type="radio"
                    name="presentation_Category"
                    value="poster"
                  />
                  <span>Poster</span>
                </label>
              </div>
            </fieldset>

            <fieldset className="conf-form__group conf-form__fieldset">
              <legend className="conf-form__label">Presentation Type</legend>
              <div className="conf-form__choices">
                <label className="conf-form__choice">
                  <input
                    type="radio"
                    name="presentation_Type"
                    value="Virtual"
                    required
                    checked={presentationType === "Virtual"}
                    onChange={() => {
                      setPresentationType("Virtual");
                      setFee((currentFee) =>
                        currentFee?.presentationType === "Virtual"
                          ? currentFee
                          : null,
                      );
                    }}
                  />
                  <span>Virtual</span>
                </label>
                <label className="conf-form__choice">
                  <input
                    type="radio"
                    name="presentation_Type"
                    value="Physical"
                    checked={presentationType === "Physical"}
                    onChange={() => {
                      setPresentationType("Physical");
                      setFee((currentFee) =>
                        currentFee?.presentationType === "Physical"
                          ? currentFee
                          : null,
                      );
                    }}
                  />
                  <span>Physical</span>
                </label>
              </div>
            </fieldset>
          </section>
        </form>
        <div
          className="checkout"
          data-aos="fade-up"
          data-aos-anchor-placement="top-bottom"
        >
          <div className="discount">
            <div>
              <h1>Premium Membership (20 USD)</h1>
              <p>Get 5% discount on registration fee</p>
              <span>Fee: $20</span>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={discount}
                onChange={(event) => setDiscount(event.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>
          <div className="price-breakdown">
            <h1>Price Breakdown</h1>
            <div className="price-breakdown__rows">
              <p className="price-breakdown__row">
                <span>Base Registration Fee:</span>
                <strong>
                  {fee ? formatCurrency(registrationFeeCents) : "Not selected"}
                </strong>
              </p>
              {selectedJournal && (
                <p className="price-breakdown__row">
                  <span>Journal Support ({selectedJournal.journal}):</span>
                  <strong>+ {formatCurrency(journalSupportCents)}</strong>
                </p>
              )}
              {selectedAddons.length > 0 && (
                <p className="price-breakdown__row">
                  <span>Add-ons ({selectedAddons.length} selected):</span>
                  <strong>+ {formatCurrency(addonsCents)}</strong>
                </p>
              )}
              <p className="price-breakdown__row price-breakdown__row--emphasis">
                <span>Combined Subtotal:</span>
                <strong>{formatCurrency(combinedSubtotalCents)}</strong>
              </p>
              <p className="price-breakdown__row">
                <span>Membership Discount (5%):</span>
                <strong>- {formatCurrency(membershipDiscountCents)}</strong>
              </p>
              <p className="price-breakdown__row">
                <span>Membership Fee:</span>
                <strong>+ {formatCurrency(membershipFeeCents)}</strong>
              </p>
              <p className="price-breakdown__row price-breakdown__row--emphasis">
                <span>Subtotal:</span>
                <strong>{formatCurrency(subtotalCents)}</strong>
              </p>
              <p className="price-breakdown__row">
                <span>Bank Convenience Charge (6%):</span>
                <strong>{formatCurrency(convenienceCents)}</strong>
              </p>
              <p className="price-breakdown__row price-breakdown__row--total">
                <span>Total Amount:</span>
                <strong>{formatCurrency(totalCents)}</strong>
              </p>
              <span className="t-c">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  value="true"
                  form="registration-form"
                  required
                />
                I agree to the Terms and Conditions
              </span>
            </div>
            <button
              type="submit"
              form="registration-form"
              disabled={isCheckingOut}
            >
              {isCheckingOut ? "Opening Checkout..." : "Checkout"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeeForm;
