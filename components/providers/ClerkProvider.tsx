"use client";

import { CLERK_PUBLISHABLE_KEY, NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY } from "@/config";
import { ClerkProvider } from "@clerk/clerk-react";
import React from "react";

const ClerkClientProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <ClerkProvider
            publishableKey={CLERK_PUBLISHABLE_KEY || NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "pk_test_cmF0aW9uYWwtbGVlY2gtMzIuY2xlcmsuYWNjb3VudHMuZGV2JA"}
        >
            {children}
        </ClerkProvider>
    )
};

export default ClerkClientProvider;