import { Link } from "react-router-dom";
import "./ErrorPage.css";

const ErrorPage = () => {
  return (
    <div className="container">
      <h1>404</h1>
      <p className="error-text">
        The page you are looking could not be found.It might have been removed,
        renamed or did not exist in the first place.
      </p>
      <div id="btn">
        <Link className="button" to="/">
          Go back to homepage
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
