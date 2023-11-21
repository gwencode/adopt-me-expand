import { Component, ErrorInfo, ReactElement } from "react";
import { Link } from "react-router-dom";

class ErrorBoundary extends Component<{ children: ReactElement }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Typically you would log this to an error reporting service like TrackJS, or New Relic
    console.log("ErrorBoudary component caught an error", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <h2>
          There was an error with this listing. <Link to="/">Click here</Link>{" "}
          to go back to the home page.
        </h2>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
