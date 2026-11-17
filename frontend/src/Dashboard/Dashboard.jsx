import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Archive,
  ArrowDownToLine,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  FileText,
  LayoutDashboard,
  LogOut,
  MessageSquareText,
  Pencil,
  RefreshCw,
  RotateCcw,
  Search,
  Trash2,
  UsersRound,
  X,
} from "lucide-react";
import toast from "react-hot-toast";
import adminApi from "../Admin/adminApi";
import useAdminAuth from "../Admin/useAdminAuth";
import "./Dashboard.css";

const SECTIONS = {
  overview: {
    label: "Overview",
    icon: LayoutDashboard,
    title: "Dashboard overview",
  },
  contacts: {
    label: "Contact requests",
    icon: MessageSquareText,
    title: "Contact requests",
    statusOptions: ["Pending", "In Progress", "Resolved", "Closed"],
  },
  committees: {
    label: "Committee forms",
    icon: UsersRound,
    title: "Committee applications",
    statusOptions: ["Pending", "In Review", "Accepted", "Rejected"],
  },
  papers: {
    label: "Paper submissions",
    icon: FileText,
    title: "Paper submissions",
    statusOptions: ["Submitted", "In Review", "Accepted", "Rejected"],
  },
  registrations: {
    label: "Registrations",
    icon: CreditCard,
    title: "Registration payments",
    statusOptions: [
      "created",
      "pending",
      "success",
      "failed",
      "cancelled",
      "Pending",
      "Paid",
    ],
  },
};

const FIELD_SETS = {
  contacts: [
    { name: "fullName", label: "Full name", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "phone", label: "Phone" },
    { name: "country", label: "Country", required: true },
    {
      name: "serviceRequired",
      label: "Service",
      type: "select",
      options: [
        "Paper Submission",
        "Academic Partnership",
        "Sponsorship & Exhibition",
        "Conference Registration",
        "Speaker Nomination",
        "General Query",
      ],
    },
    {
      name: "message",
      label: "Message",
      type: "textarea",
      required: true,
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: SECTIONS.contacts.statusOptions,
      required: true,
    },
  ],
  committees: [
    {
      name: "title",
      label: "Title",
      type: "select",
      options: ["Mr", "Ms", "Dr", "Prof"],
      required: true,
    },
    { name: "fullName", label: "Full name", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "phone", label: "Phone", required: true },
    { name: "country", label: "Country", required: true },
    {
      name: "memberCategory",
      label: "Committee",
      type: "select",
      options: ["Advisory", "Scientific", "Hospitality"],
      required: true,
    },
    { name: "organization", label: "Organization", required: true },
    { name: "department", label: "Department", required: true },
    { name: "qualification", label: "Qualification", required: true },
    {
      name: "professionalExperience",
      label: "Professional experience",
      required: true,
    },
    {
      name: "industryExperience",
      label: "Industry experience",
      required: true,
    },
    { name: "specialization", label: "Specialization", required: true },
    {
      name: "ceradaAssociated",
      label: "CERADA associated",
      type: "select",
      options: ["Yes", "No"],
      required: true,
    },
    {
      name: "hIndex",
      label: "h-index",
      type: "number",
      min: 0,
      required: true,
    },
    {
      name: "scopusPublications",
      label: "Scopus publications",
      type: "number",
      min: 0,
      required: true,
    },
    {
      name: "sciPublications",
      label: "SCI publications",
      type: "number",
      min: 0,
      required: true,
    },
    {
      name: "editorReviewer",
      label: "Editor / reviewer experience",
      type: "textarea",
      required: true,
    },
    {
      name: "foundEventVia",
      label: "How they found the event",
      type: "textarea",
      required: true,
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: SECTIONS.committees.statusOptions,
      required: true,
    },
  ],
  papers: [
    { name: "paperTitle", label: "Paper title", required: true },
    { name: "authorName", label: "Author name", required: true },
    { name: "coauthors", label: "Co-authors" },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "mobile", label: "Mobile", required: true },
    { name: "country", label: "Country", required: true },
    { name: "whatsapp", label: "WhatsApp" },
    { name: "linkedin", label: "LinkedIn URL", type: "url" },
    { name: "facebook", label: "Facebook URL", type: "url" },
    { name: "institution", label: "Institution", required: true },
    { name: "department", label: "Department" },
    { name: "designation", label: "Designation" },
    {
      name: "submissionType",
      label: "Submission type",
      type: "select",
      options: ["Abstract", "Full paper"],
      required: true,
    },
    {
      name: "presentationCategory",
      label: "Presentation category",
      type: "select",
      options: ["Oral", "Poster"],
      required: true,
    },
    {
      name: "presentationType",
      label: "Presentation type",
      type: "select",
      options: ["Virtual", "Physical"],
      required: true,
    },
    {
      name: "publicationRequired",
      label: "Publication required",
      type: "select",
      options: ["Yes", "No"],
      required: true,
    },
    {
      name: "conferenceSource",
      label: "How they found the conference",
      type: "textarea",
    },
    { name: "message", label: "Message", type: "textarea" },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: SECTIONS.papers.statusOptions,
      required: true,
    },
  ],
  registrations: [
    {
      name: "registration.title",
      label: "Title",
      type: "select",
      options: ["Mr", "Ms", "Mrs", "Dr", "Prof"],
      required: true,
    },
    {
      name: "registration.firstName",
      label: "First name",
      required: true,
    },
    { name: "registration.lastName", label: "Last name", required: true },
    {
      name: "registration.certificateName",
      label: "Certificate name",
      required: true,
    },
    {
      name: "registration.dateOfBirth",
      label: "Date of birth",
      type: "date",
      required: true,
    },
    {
      name: "registration.nationality",
      label: "Nationality",
      required: true,
    },
    {
      name: "registration.department",
      label: "Department",
      required: true,
    },
    {
      name: "registration.institution",
      label: "Institution",
      required: true,
    },
    { name: "registration.mobile", label: "Mobile", required: true },
    {
      name: "registration.email",
      label: "Email",
      type: "email",
      required: true,
    },
    {
      name: "registration.participantCategory",
      label: "Participant category",
      type: "select",
      options: ["Academicians", "Delegates", "Research scholars", "Student"],
      required: true,
    },
    {
      name: "registration.presentationCategory",
      label: "Presentation category",
      type: "select",
      options: ["Oral", "Poster"],
      required: true,
    },
    {
      name: "registration.presentationType",
      label: "Presentation type",
      type: "select",
      options: ["Virtual", "Physical"],
      required: true,
    },
    {
      name: "selection.feeCategory",
      label: "Fee category",
      type: "select",
      options: [
        "Academicians / Delegates / Research Scholars / PhD Candidates",
        "UG / PG Students",
        "Non-Presenter / Attendee / Listener",
      ],
      required: true,
    },
    {
      name: "selection.feePeriod",
      label: "Fee period",
      type: "select",
      options: ["Early Bird (USD)", "Final (USD)", "On Spot (USD)"],
      required: true,
    },
    {
      name: "selection.journalId",
      label: "Journal option",
      type: "select",
      options: ["", "q1", "q2", "q3", "q4"],
    },
    {
      name: "selection.addonIds",
      label: "Add-ons (comma separated IDs)",
    },
    {
      name: "selection.membership",
      label: "Membership",
      type: "select",
      options: [
        { value: "true", label: "Yes" },
        { value: "false", label: "No" },
      ],
      required: true,
    },
    {
      name: "amount",
      label: "Amount (USD)",
      type: "number",
      min: 0.01,
      step: 0.01,
      required: true,
    },
    {
      name: "status",
      label: "Payment status",
      type: "select",
      options: SECTIONS.registrations.statusOptions,
      required: true,
    },
    { name: "paidAt", label: "Paid date", type: "date" },
  ],
};

const getValue = (record, path) => {
  const value = path
    .split(".")
    .reduce((current, part) => current?.[part], record);
  if (path === "amount") {
    return value == null ? "" : (value / 100).toFixed(2);
  }
  if (path === "selection.addonIds") {
    return Array.isArray(value) ? value.join(", ") : "";
  }
  if (path === "selection.membership") {
    return value ? "true" : "false";
  }
  if (path === "paidAt") {
    return value ? new Date(value).toISOString().slice(0, 10) : "";
  }
  return value ?? "";
};

const setPath = (object, path, value) => {
  const parts = path.split(".");
  let current = object;
  for (const part of parts.slice(0, -1)) {
    current[part] ??= {};
    current = current[part];
  }
  current[parts[parts.length - 1]] = value;
};

const getPrimary = (type, record) => {
  if (type === "contacts") return record.fullName;
  if (type === "committees") return record.fullName;
  if (type === "papers") return record.paperTitle;
  return `${record.registration?.firstName || ""} ${record.registration?.lastName || ""}`.trim();
};

const getSecondary = (type, record) => {
  if (type === "contacts") return record.email;
  if (type === "committees") return record.email;
  if (type === "papers") return `${record.authorName} · ${record.paperId}`;
  return record.registration?.email || record.orderId;
};

const getDetail = (type, record) => {
  if (type === "contacts") return record.serviceRequired || "General query";
  if (type === "committees") {
    return `${record.memberCategory} committee · ${record.organization}`;
  }
  if (type === "papers") {
    return `${record.submissionType} · ${record.presentationType} presentation`;
  }
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: record.currency || "USD",
  }).format((record.amount || 0) / 100);
};

const getStatusClass = (status = "") =>
  `admin-status admin-status--${status.toLowerCase().replace(/[^a-z]+/g, "-")}`;

const Dashboard = () => {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("overview");
  const [summary, setSummary] = useState(null);
  const [records, setRecords] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showArchived, setShowArchived] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const loadSummary = useCallback(async () => {
    try {
      const { data } = await adminApi.get("/api/admin/dashboard");
      setSummary(data.summary);
      setLoadError("");
    } catch (error) {
      setLoadError(
        error.response?.data?.message || "Could not load dashboard details.",
      );
    }
  }, []);

  const loadRecords = useCallback(
    async (signal) => {
      if (activeSection === "overview") return;
      setIsLoading(true);
      setLoadError("");
      try {
        const { data } = await adminApi.get(
          `/api/admin/records/${activeSection}`,
          {
            params: {
              page: pagination.page,
              limit: 25,
              search: debouncedSearch,
              status: statusFilter,
              archived: showArchived,
            },
            signal,
          },
        );
        if (signal?.aborted) return;
        setRecords(data.data);
        setPagination({
          ...data.pagination,
          page: Math.min(
            data.pagination.page,
            Math.max(data.pagination.pages, 1),
          ),
        });
      } catch (error) {
        if (signal?.aborted) return;
        setLoadError(
          error.response?.data?.message || "Could not load these records.",
        );
      } finally {
        if (!signal?.aborted) setIsLoading(false);
      }
    },
    [
      activeSection,
      debouncedSearch,
      pagination.page,
      showArchived,
      statusFilter,
    ],
  );

  useEffect(() => {
    const timer = window.setTimeout(loadSummary, 0);
    return () => window.clearTimeout(timer);
  }, [loadSummary]);

  useEffect(() => {
    const timer = window.setTimeout(
      () => setDebouncedSearch(search.trim()),
      250,
    );
    return () => window.clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const controller = new AbortController();
    const timer = window.setTimeout(() => loadRecords(controller.signal), 0);
    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [loadRecords]);

  const activeSectionInfo = SECTIONS[activeSection];
  const EmptySectionIcon = activeSectionInfo.icon;
  const activeMetrics = useMemo(
    () => [
      {
        key: "paperSubmissions",
        label: "Paper submissions",
        icon: FileText,
        section: "papers",
        accent: "violet",
      },
      {
        key: "contactRequests",
        label: "Contact requests",
        icon: MessageSquareText,
        section: "contacts",
        accent: "blue",
      },
      {
        key: "committeeApplications",
        label: "Committee applications",
        icon: UsersRound,
        section: "committees",
        accent: "orange",
      },
      {
        key: "registrationPayments",
        label: "Registration payments",
        icon: CreditCard,
        section: "registrations",
        accent: "green",
      },
    ],
    [],
  );

  const changeSection = (section) => {
    setActiveSection(section);
    setPagination((current) => ({ ...current, page: 1 }));
    setSearch("");
    setDebouncedSearch("");
    setStatusFilter("");
    setShowArchived(false);
    setEditingRecord(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/", { replace: true });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSaveRecord = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = {};

    for (const field of FIELD_SETS[activeSection]) {
      const rawValue = formData.get(field.name);
      if (rawValue === null) continue;

      let value = rawValue;
      if (field.type === "number")
        value = rawValue === "" ? null : Number(rawValue);
      if (field.name === "amount") value = Math.round(Number(rawValue) * 100);
      if (field.name === "selection.journalId" && !rawValue) value = null;
      if (field.name === "selection.membership") value = rawValue === "true";
      if (field.name === "selection.addonIds") {
        value = rawValue
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean);
      }
      if (field.name === "paidAt" && rawValue) {
        value = new Date(`${rawValue}T00:00:00.000Z`).toISOString();
      }
      if (field.name === "paidAt" && !rawValue) value = null;
      setPath(payload, field.name, value);
    }

    setIsSaving(true);
    try {
      await adminApi.patch(
        `/api/admin/records/${activeSection}/${editingRecord._id}`,
        payload,
      );
      toast.success("Record updated.");
      setEditingRecord(null);
      await Promise.all([loadRecords(), loadSummary()]);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Could not update this record.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleArchive = async (record) => {
    const archived = !record.archivedAt;
    const action = archived ? "archive" : "restore";
    if (
      !window.confirm(
        `${archived ? "Archive" : "Restore"} ${getPrimary(activeSection, record)}?`,
      )
    ) {
      return;
    }
    try {
      await adminApi.patch(
        `/api/admin/records/${activeSection}/${record._id}/archive`,
        { archived },
      );
      toast.success(`Record ${archived ? "archived" : "restored"}.`);
      await Promise.all([loadRecords(), loadSummary()]);
    } catch (error) {
      toast.error(
        error.response?.data?.message || `Could not ${action} this record.`,
      );
    }
  };

  const handleDeleteRegistration = async (record) => {
    if (
      !window.confirm(
        `Permanently delete the registration for ${getPrimary(activeSection, record)}? This cannot be undone.`,
      )
    ) {
      return;
    }
    try {
      await adminApi.delete(`/api/admin/records/registrations/${record._id}`);
      toast.success("Registration record deleted.");
      await Promise.all([loadRecords(), loadSummary()]);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Could not delete this registration.",
      );
    }
  };

  const handleDownload = async (record) => {
    try {
      const { data } = await adminApi.get(
        `/api/admin/records/${activeSection}/${record._id}/file`,
        { responseType: "blob" },
      );
      const url = URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = url;
      link.download =
        activeSection === "papers"
          ? record.paperFile?.originalName || `${record.paperId}-paper`
          : record.cvFile?.originalName || `${record.fullName}-cv`;
      document.body.append(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch {
      toast.error("Could not download the uploaded file.");
    }
  };

  const renderField = (field) => {
    const value = getValue(editingRecord, field.name);
    const fieldId = `record-field-${field.name.replaceAll(".", "-")}`;
    return (
      <label className="admin-form-field" htmlFor={fieldId} key={field.name}>
        <span>{field.label}</span>
        {field.type === "textarea" ? (
          <textarea
            id={fieldId}
            name={field.name}
            defaultValue={value}
            required={field.required}
            rows={3}
          />
        ) : field.type === "select" ? (
          <select
            id={fieldId}
            name={field.name}
            defaultValue={value}
            required={field.required}
          >
            {!field.required && !field.options.includes?.(value) && (
              <option value="">—</option>
            )}
            {field.options.map((option) => {
              const optionValue =
                typeof option === "string" ? option : option.value;
              const optionLabel =
                typeof option === "string" ? option : option.label;
              return (
                <option key={optionValue} value={optionValue}>
                  {optionLabel || (optionValue === "" ? "None" : optionValue)}
                </option>
              );
            })}
          </select>
        ) : (
          <input
            id={fieldId}
            name={field.name}
            type={field.type || "text"}
            defaultValue={value}
            required={field.required}
            min={field.min}
            step={field.step}
          />
        )}
      </label>
    );
  };

  return (
    <main className="admin-dashboard">
      <aside className="admin-sidebar">
        <a
          className="admin-brand"
          href="/dashboard"
          onClick={(event) => {
            event.preventDefault();
            changeSection("overview");
          }}
        >
          <span>
            <strong>WCMRP</strong>
            <small>ADMIN CONSOLE</small>
          </span>
        </a>

        <p className="admin-sidebar__label">WORKSPACE</p>
        <nav className="admin-navigation" aria-label="Admin sections">
          {Object.entries(SECTIONS).map(([key, section]) => {
            const Icon = section.icon;
            return (
              <button
                className={`admin-navigation__item ${
                  activeSection === key ? "is-active" : ""
                }`}
                key={key}
                type="button"
                onClick={() => changeSection(key)}
                aria-current={activeSection === key ? "page" : undefined}
              >
                <Icon size={18} strokeWidth={1.8} />
                <span>{section.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="admin-sidebar__bottom">
          <button
            className="admin-signout"
            type="button"
            onClick={handleLogout}
          >
            <LogOut size={17} />
            Sign out
          </button>
        </div>
      </aside>

      <section className="admin-main">
        <header className="admin-topbar">
          <div className="admin-topbar__crumb">
            <span>Workspace</span>
            <ChevronRight size={15} />
            <strong>{activeSectionInfo.label}</strong>
          </div>
          <div className="admin-topbar__right">
            <button
              className="admin-icon-button"
              type="button"
              aria-label="Refresh current view"
              onClick={() =>
                activeSection === "overview"
                  ? loadSummary()
                  : Promise.all([loadRecords(), loadSummary()])
              }
            >
              <RefreshCw size={17} />
            </button>
          </div>
        </header>

        <div className="admin-content">
          <div className="admin-page-heading">
            <div>
              <p className="admin-eyebrow">WCMRP 2027 · ADMINISTRATION</p>
              <h1>{activeSectionInfo.title}</h1>
            </div>
          </div>

          {loadError && (
            <div className="admin-alert" role="alert">
              <span>{loadError}</span>
              <button
                type="button"
                onClick={() =>
                  activeSection === "overview" ? loadSummary() : loadRecords()
                }
              >
                Try again
              </button>
            </div>
          )}

          {activeSection === "overview" ? (
            <section className="admin-overview">
              <div className="admin-section-heading">
                <div>
                  <h2>Activity overview</h2>
                  <p>Active records currently in your workspace</p>
                </div>
              </div>
              <div className="admin-metrics">
                {activeMetrics.map((metric) => {
                  const Icon = metric.icon;
                  return (
                    <button
                      className={`admin-metric-card admin-metric-card--${metric.accent}`}
                      key={metric.key}
                      type="button"
                      onClick={() => changeSection(metric.section)}
                    >
                      <span className="admin-metric-card__icon">
                        <Icon size={20} />
                      </span>
                      <span className="admin-metric-card__label">
                        {metric.label}
                      </span>
                      <strong>{summary?.[metric.key] ?? "—"}</strong>
                      <span className="admin-metric-card__link">
                        Manage records <ChevronRight size={15} />
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>
          ) : (
            <section className="admin-records-panel">
              <div className="admin-toolbar">
                <label className="admin-search">
                  <Search size={18} />
                  <input
                    type="search"
                    value={search}
                    onChange={(event) => {
                      setSearch(event.target.value);
                      setPagination((current) => ({ ...current, page: 1 }));
                    }}
                    placeholder={`Search ${activeSectionInfo.label.toLowerCase()}...`}
                    aria-label={`Search ${activeSectionInfo.label}`}
                  />
                </label>
                <div className="admin-toolbar__filters">
                  <select
                    aria-label="Filter by status"
                    value={statusFilter}
                    onChange={(event) => {
                      setStatusFilter(event.target.value);
                      setPagination((current) => ({ ...current, page: 1 }));
                    }}
                  >
                    <option value="">All statuses</option>
                    {activeSectionInfo.statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                  {activeSection !== "registrations" && (
                    <label className="admin-archive-toggle">
                      <input
                        type="checkbox"
                        checked={showArchived}
                        onChange={(event) => {
                          setShowArchived(event.target.checked);
                          setPagination((current) => ({ ...current, page: 1 }));
                        }}
                      />
                      <span>Archived</span>
                    </label>
                  )}
                </div>
              </div>

              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Record</th>
                      <th>Details</th>
                      <th>Status</th>
                      <th>Received</th>
                      <th className="admin-table__actions-heading">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      <tr>
                        <td colSpan="5" className="admin-table__empty">
                          Loading records…
                        </td>
                      </tr>
                    ) : records.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="admin-table__empty">
                          <span className="admin-empty-icon">
                            <EmptySectionIcon size={22} />
                          </span>
                          <strong>No records found</strong>
                          <span>Try changing your search or filters.</span>
                        </td>
                      </tr>
                    ) : (
                      records.map((record) => (
                        <tr key={record._id}>
                          <td>
                            <div className="admin-record-primary">
                              <strong>
                                {getPrimary(activeSection, record)}
                              </strong>
                              <span>{getSecondary(activeSection, record)}</span>
                            </div>
                          </td>
                          <td>
                            <div className="admin-record-detail">
                              <span>{getDetail(activeSection, record)}</span>
                              {activeSection === "registrations" && (
                                <small>Order {record.orderId}</small>
                              )}
                            </div>
                          </td>
                          <td>
                            <span className={getStatusClass(record.status)}>
                              {record.status}
                            </span>
                          </td>
                          <td className="admin-record-date">
                            {record.createdAt
                              ? new Date(record.createdAt).toLocaleDateString()
                              : "—"}
                          </td>
                          <td>
                            <div className="admin-row-actions">
                              {(activeSection === "papers" ||
                                activeSection === "committees") && (
                                <button
                                  className="admin-row-action admin-row-action--download"
                                  type="button"
                                  title="Download uploaded file"
                                  aria-label="Download uploaded file"
                                  onClick={() => handleDownload(record)}
                                >
                                  <ArrowDownToLine size={16} />
                                </button>
                              )}
                              <button
                                className="admin-row-action"
                                type="button"
                                title="Edit record"
                                aria-label="Edit record"
                                onClick={() => setEditingRecord(record)}
                              >
                                <Pencil size={16} />
                              </button>
                              {activeSection === "registrations" ? (
                                <button
                                  className="admin-row-action admin-row-action--danger"
                                  type="button"
                                  title="Permanently delete registration"
                                  aria-label="Permanently delete registration"
                                  onClick={() =>
                                    handleDeleteRegistration(record)
                                  }
                                >
                                  <Trash2 size={16} />
                                </button>
                              ) : (
                                <button
                                  className="admin-row-action"
                                  type="button"
                                  title={
                                    record.archivedAt ? "Restore" : "Archive"
                                  }
                                  aria-label={
                                    record.archivedAt ? "Restore" : "Archive"
                                  }
                                  onClick={() => handleArchive(record)}
                                >
                                  {record.archivedAt ? (
                                    <RotateCcw size={16} />
                                  ) : (
                                    <Archive size={16} />
                                  )}
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <footer className="admin-pagination">
                <span>
                  {pagination.total
                    ? `Showing ${(pagination.page - 1) * 25 + 1}–${Math.min(
                        pagination.page * 25,
                        pagination.total,
                      )} of ${pagination.total}`
                    : "0 records"}
                </span>
                <div>
                  <button
                    type="button"
                    aria-label="Previous page"
                    disabled={pagination.page <= 1 || isLoading}
                    onClick={() =>
                      setPagination((current) => ({
                        ...current,
                        page: current.page - 1,
                      }))
                    }
                  >
                    <ChevronLeft size={17} />
                  </button>
                  <span>
                    Page {pagination.page} of {Math.max(pagination.pages, 1)}
                  </span>
                  <button
                    type="button"
                    aria-label="Next page"
                    disabled={pagination.page >= pagination.pages || isLoading}
                    onClick={() =>
                      setPagination((current) => ({
                        ...current,
                        page: current.page + 1,
                      }))
                    }
                  >
                    <ChevronRight size={17} />
                  </button>
                </div>
              </footer>
            </section>
          )}
        </div>
      </section>

      {editingRecord && (
        <div
          className="admin-modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !isSaving) {
              setEditingRecord(null);
            }
          }}
        >
          <section
            className="admin-edit-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-edit-title"
          >
            <header className="admin-edit-modal__header">
              <div>
                <p className="admin-eyebrow">RECORD MANAGEMENT</p>
                <h2 id="admin-edit-title">Edit {activeSectionInfo.label}</h2>
                <p>Changes are saved to the conference record.</p>
              </div>
              <button
                className="admin-icon-button"
                type="button"
                aria-label="Close edit form"
                disabled={isSaving}
                onClick={() => setEditingRecord(null)}
              >
                <X size={19} />
              </button>
            </header>
            {activeSection === "registrations" && (
              <div className="admin-payment-warning">
                Payment status and amount are editable here. Provider order IDs
                and payment attempt history are kept unchanged.
              </div>
            )}
            <form className="admin-edit-form" onSubmit={handleSaveRecord}>
              <div className="admin-edit-form__grid">
                {FIELD_SETS[activeSection].map(renderField)}
              </div>
              <footer className="admin-edit-form__footer">
                <button
                  className="admin-button admin-button--secondary"
                  type="button"
                  disabled={isSaving}
                  onClick={() => setEditingRecord(null)}
                >
                  Cancel
                </button>
                <button
                  className="admin-button admin-button--primary"
                  type="submit"
                  disabled={isSaving}
                >
                  {isSaving ? "Saving…" : "Save changes"}
                </button>
              </footer>
            </form>
          </section>
        </div>
      )}
    </main>
  );
};

export default Dashboard;
