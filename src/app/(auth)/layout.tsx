import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: "Authentication | GiG Geni",
    template: "%s | GiG Geni"
  },
  description: "Sign in or create your GiG Geni account to access the competitive hiring platform.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}