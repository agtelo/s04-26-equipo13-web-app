// Root page shows landing page
// Proxy middleware handles redirects for authenticated users
import LandingPage from "./landing";

export default function RootPage() {
  return <LandingPage />;
}
