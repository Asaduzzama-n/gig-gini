import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: "Authentication | GiG Gini",
    template: "%s | GiG Gini"
  },
  description: "Sign in or create your GiG Gini account to access the competitive hiring platform.",
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