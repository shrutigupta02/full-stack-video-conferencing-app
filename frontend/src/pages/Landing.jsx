import "../App.css";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landingPageContainer">
      <nav>
        <div className="navHeader">
          <h2>SETU.</h2>
        </div>
        <div className="navlist">
          <p
            onClick={() => {
              navigate("/");
            }}
          >
            Join as Guest
          </p>
          <p
            onClick={() => {
              navigate("/auth");
            }}
          >
            Login
          </p>
        </div>
      </nav>

      <div className="landingMainContainer">
        {/* <h1 style={{fontFamily: 'CustomFont'}}>SETU.</h1> */}
        <h2>
          Digital <b>Bridge</b> to Keep You Connected.
        </h2>
        <div className="button" onClick={() => navigate("/auth")}>
          Get Started
        </div>
      </div>

      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
