import "./Proceeding.css";
import scopus from "../../assets/Logo/scopus-logo.png";
import sjr from "../../assets/Images/sjr-logo.webp";

const Proceeding = () => {
  return (
    <div className="Proceedings" data-aos="fade-up"
     data-aos-anchor-placement="top-bottom">
      <div>
        <span className="mini_head">INDEXED JOURNALS</span>
        <h1 className="main_head" style={{color:"white"}}>Proceedings & Publications</h1>
        <div>
          <img src={scopus} alt="" />
          <img src={sjr} alt="" style={{objectFit:"cover"}}/>
        </div>
        <p>
          Note: WCMRP - 2027 Proceedings will be submitted to the Web of Science
          Book Citation Index (BkCI) and Scopus for evaluation and indexing
          purposes (T&C apply).
        </p>
      </div>
    </div>
  );
};

export default Proceeding;
