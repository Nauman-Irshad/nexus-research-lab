/**
 * A template remounts on every navigation, which gives each route a short
 * entrance transition without any client-side animation library.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="route-fade">{children}</div>;
}
