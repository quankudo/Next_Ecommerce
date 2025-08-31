// app/(user)/layout.tsx
import React from "react";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* Layout chung cho (user) */}
      <header>User Header</header>
      <main>{children}</main>
      <footer>User Footer</footer>
    </div>
  );
}
