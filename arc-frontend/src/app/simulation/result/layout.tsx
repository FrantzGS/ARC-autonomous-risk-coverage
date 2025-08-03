// src/app/simulation/result/layout.tsx

export const metadata = {
  title: "Simulation Result – ARC",
  description: "Climate risk quote result for farmers using ARC – Autonomous Risk Coverage",
};

export default function ResultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
