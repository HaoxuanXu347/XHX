import 'bootstrap/dist/css/bootstrap.min.css';
//import PropTypes from "prop-types";

const subtitleStyle = {
  fontStyle: "italic",
  fontSize: "x-large",
  color: "coral",
  display: "flex",          
  justifyContent: "center",  
  alignItems: "center",     
  height: "30vh",           
};
const Banner = ({children}) => {
    return (
        <header>
          <div style={subtitleStyle}>
            {children}
          </div>
        </header>
      );
}

/*
const Banner1 = (props) => {
  return (
      <header className="row mb-41">
        <div className="col-5">
          <img src={logo} className={logoClass} alt="logo" />
        </div>
        <div className="col-7 mt-5" style={subtitleStyle}>
          {props.headertext}
        </div>
      </header>
    );
}

const Banner2 = ({headertext}) => {
  return (
      <header className="row mb-41">
        <div className="col-5">
          <img src={logo} className={logoClass} alt="logo" />
        </div>
        <div className="col-7 mt-5" style={subtitleStyle}>
          {headertext}
        </div>
      </header>
    );
}

Banner2.propTypes = {
  headertext: PropTypes.string.isRequired
};*/

export default Banner;