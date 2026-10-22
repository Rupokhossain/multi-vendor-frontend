"use client";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // প্রতি রেন্ডারে নতুন ইনস্ট্যান্স না বানিয়ে স্টেট আকারে ধরে রাখা
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 2,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
