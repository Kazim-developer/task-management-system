import type React from "react";

export default function CenterContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-screen w-[100%] flex justify-center items-center">
      {children}
    </section>
  );
}
