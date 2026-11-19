import "./PublicationList.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";

const PublicationList = () => {
  const publicationsList = [
    {
      type: "Research article • Restricted access",
      title:
        "Exploring the Interplay Between Parenting Style, Dark Triad, Cultural Capitaland Internet Addiction Disorders of College Students: A Cross-Cultural CBD Framework Analysis",
      authors:
        "Jing Qiaoqiao, Muzi Li, Chew Fong Peng, Chan Wai Yin and Rusdi Abd Rashid",
      presentedAt: "ICSTEET-2025",
      publication: "Applied Research in Quality of Life",
      quartile: "Q1",
      indexing: "Scopus, SSCI",
      publisher: "Springer",
      year: "2026",
      doi: "https://link.springer.com/article/10.1007/s11482-026-10592-9",
    },
    {
      type: "Research article • Restricted access",
      title:
        "Women’s Economic Empowerment in Dhaka: Overcoming Gender-Based Challenges in Banking and Finance",
      authors: "Rumpa Neogi, Arnab Bhattacharjee, Tanushree Biswas",
      presentedAt: "WCMRP-2025",
      publication: "Human Arenas",
      quartile: "Q1",
      indexing: "Scopus, ESCI",
      publisher: "Springer",
      year: "2026",
      doi: "https://doi.org/10.1007/s42087-026-00573-7",
    },
    {
      type: "Research article • Restricted access",
      title:
        "Beyond Fragmented Leadership Models: A Conceptual Integrated Theory of Leadership Effectiveness in a VUCA World",
      authors: "Millicent Lindiwe Ndaba, S. Sivakumar",
      presentedAt: "ICETMRS-2025",
      publication: "Human Arenas",
      quartile: "Q1",
      indexing: "Scopus, ESCI",
      publisher: "Springer",
      year: "2026",
      doi: "https://link.springer.com/article/10.1007/s42087-026-00615-0",
    },
    {
      type: "Research article • Restricted access",
      title:
        "From trend to strategic practices: a bibliometric analysis of knowledge management in communications and multimedia-related sectors",
      authors:
        "Aidawati Abd Rahman, Norasyikin Shaikh Ibrahim, Rohaizan Daud, Min Hui Leow",
      presentedAt: "WCMRP-2026",
      publication: "Quality & Quantity",
      quartile: "Q1",
      indexing: "Scopus",
      publisher: "Springer",
      year: "2026",
      doi: "https://link.springer.com/article/10.1007/s11135-026-02831-w",
    },
    {
      type: "Research article • Restricted access",
      title:
        "Evaluating the influence of courseware on online learning pedagogy at Pangasinan State University.",
      authors: "Angelou O Ramos",
      publication: "E-Learning and Digital Media",
      quartile: "Q2",
      indexing: "Scopus, ESCI",
      publisher: "SAGE",
      year: "2025",
      doi: "https://journals.sagepub.com/doi/abs/10.1177/20427530251343208",
    },
    {
      type: "Research article • Restricted access",
      title:
        "The assessment SHIFT: Traditional and technology-driven approaches to listening comprehension.",
      authors: "Johnedel Barrota Peralta",
      publication: "E-Learning and Digital Media",
      quartile: "Q2",
      indexing: "Scopus, ESCI",
      publisher: "SAGE",
      year: "2025",
      doi: "https://journals.sagepub.com/doi/10.1177/20427530251348607",
    },
    {
      type: "Research article • Restricted access",
      title:
        "Redefining educational success: Analyzing the impact of closed management systems on student well-being and academic performance in Chinese technical education.",
      authors: "Jingkun Liu, Rovena I Dellova and Zhengxin Yi",
      publication: "E-Learning and Digital Media",
      quartile: "Q2",
      indexing: "Scopus, ESCI",
      publisher: "SAGE",
      year: "2024",
      doi: "https://doi.org/10.1177/20427530241299032",
    },
    {
      type: "Research article • Restricted access",
      title:
        "Mechanism of PI3K-AKT Signaling Pathway Mediating Apoptosis of Periodontal Tissue Cells in Chronic Periodontitis",
      authors:
        "Lan Dazhi, Pimporn Thongmuang, Sarisak Soontornchai, You Jianpeng",
      presentedAt: "WCMRP-2025",
      publication: "International Journal of Environmental Sciences",
      quartile: "Q4",
      indexing: "Scopus",
      publisher: "Elsevier",
      year: "2024",
      doi: "https://doi.org/10.64252/hp3vmy81",
    },
    {
      type: "Research article • Restricted access",
      title:
        "Zeolite X from coal fly ash inhibits proliferation of human breast cancer cell lines (MCF-7) via induction of S phase arrest and apoptosis",
      authors: "S. Subhapriya and P. Gomathipriya",
      publication: "Molecular Biology Reports",
      quartile: "Q2",
      indexing: "Scopus, SCIE",
      publisher: "Springer",
      year: "2018",
      doi: "https://doi.org/10.1007/s11033-018-4363-9",
    },
    {
      type: "Research article • Restricted access",
      title:
        "Induction of apoptotic effects of anti-proliferative zeolite X from coal fly ash on cervical cancer (HeLa) cell lines",
      authors: "S. Subhapriya and P. Gomathipriya",
      publication: "Molecular Biology Reports",
      quartile: "Q2",
      indexing: "Scopus, SCIE",
      publisher: "Springer",
      year: "2018",
      doi: "https://doi.org/10.1007/s11033-018-4363-9",
    },
    {
      type: "Research article • Restricted access",
      title:
        "Green synthesis of titanium dioxide (TiO2) nanoparticles by Trigonella foenum-graecum extract and its antimicrobial properties",
      authors: "S. Subhapriya and P. Gomathipriya",
      publication: "Microbial Pathogenesis",
      quartile: "Q1",
      indexing: "Scopus, SCIE",
      publisher: "Elsevier",
      year: "2018",
      doi: "https://doi.org/10.1016/j.micpath.2018.01.027",
    },
    {
      type: "Research article • Restricted access",
      title:
        "Surfactant-free bio-synthesised TiO2 nanorods from Turbinaria conoides – A study on photocatalytic and anti-bacterial activity",
      authors: "S. Subhapriya and P. Gomathipriya",
      publication: "Materials Research Express",
      quartile: "Q2",
      indexing: "Scopus, SCIE",
      publisher: "IOP",
      year: "2018",
      doi: "https://iopscience.iop.org/article/10.1088/2053-1591/aac3bc",
    },
    {
      type: "Research article • Restricted access",
      title:
        "Synthesis and characterization of zeolite X from coal fly ash: a study on anticancer activity",
      authors: "S. Subhapriya and P. Gomathipriya",
      publication: "Materials Research Express",
      quartile: "Q2",
      indexing: "Scopus, SCIE",
      publisher: "IOP",
      year: "2018",
      doi: "https://iopscience.iop.org/article/10.1088/2053-1591/aad16c",
    },
    {
      type: "Research article • Restricted access",
      title:
        "Design and analysis of high gain and low noise figure CMOS low noise amplifier for Q-band nano-sensor application",
      authors: "K Suganthi and S Malarvizhi",
      publication: "Materials Research Express",
      quartile: "Q2",
      indexing: "Scopus, SCIE",
      publisher: "IOP",
      year: "2018",
      doi: "https://iopscience.iop.org/article/10.1088/2053-1591/aaafea",
    },
    {
      type: "Research article • Restricted access",
      title:
        "Detection and classification of cardiovascular abnormalities using FFT based multi-objective genetic algorithm",
      authors: "B. V. P Prasad and Velusamy Parthasarathy",
      publication: "Biotechnology & Biotechnological Equipment",
      quartile: "Q2",
      indexing: "Scopus, SCIE",
      publisher: "Taylor & Francis",
      year: "2017",
      doi: "https://doi.org/10.1080/13102818.2017.1389303",
    },
  ];
  return (
    <div
      className="Publication_list"
      data-aos="fade-up"
      data-aos-anchor-placement="top-bottom"
    >
      <div className="cover"></div>
      <h1>
        Participate in WCMRP-2027 and Achieve Scopus / SCIE Indexed Publication
      </h1>
      <p>
        WCMRP-2027 offers a valuable opportunity for researchers to present
        their work and achieve publication in reputed Scopus / SCIE indexed
        journals. Selected high-quality papers presented at the conference will
        be recommended and processed for legitimate Scopus / SCIE indexed
        journal publication, ensuring global academic visibility and
        recognition.
      </p>
      <section className="publication_content">
        <h1>Proof of Scopus / SCIE Indexing</h1>
        <p>
          Our clients' papers have been successfully indexed in Scopus / SCIE.
        </p>
        <div className="publication_slide">
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            slidesPerView={1}
            spaceBetween={0}
            loop={true}
            navigation={true}
            pagination={{ clickable: true }}
            aria-label="Scopus and SCIE indexed publications"
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
          >
            {publicationsList.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <article className="publication_list_slide">
                    <p className="publication_type">{item.type}</p>
                    <h2>{item.title}</h2>
                    <dl className="publication_details">
                      <div>
                        <dt>Authors:</dt>
                        <dd>{item.authors}</dd>
                      </div>
                      {item.presentedAt && (
                        <div>
                          <dt>presentedAt:</dt>
                          <dd>{item.presentedAt}</dd>
                        </div>
                      )}
                      <div>
                        <dt>Journal:</dt>
                        <dd>{item.publication}</dd>
                      </div>
                      <div>
                        <dt>Quartile:</dt>
                        <dd>{item.quartile}</dd>
                      </div>
                      <div>
                        <dt>Indexing:</dt>
                        <dd>{item.indexing}</dd>
                      </div>
                      <div>
                        <dt>Publisher:</dt>
                        <dd>{item.publisher}</dd>
                      </div>
                      <div>
                        <dt>Year:</dt>
                        <dd>{item.year}</dd>
                      </div>
                      <div>
                        <dt>DOI:</dt>
                        <dd>
                          <a href={item.doi} target="_blank" rel="noreferrer">
                            {item.doi}
                          </a>
                        </dd>
                      </div>
                    </dl>
                  </article>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <h3 className="publication_cta">
          Join us at WCMRP-2027 and unlock the opportunity to publish your
          research in reputed Scopus / SCIE indexed journals.
        </h3>
      </section>
    </div>
  );
};

export default PublicationList;
