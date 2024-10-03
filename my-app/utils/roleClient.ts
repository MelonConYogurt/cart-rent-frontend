"use client";

import {useUser} from "@clerk/clerk-react";

export default function CheckRoleClientSide() {
  const {isSignedIn, user, isLoaded} = useUser();

  if (isLoaded) {
    if (isSignedIn && user.publicMetadata.role === "admin") {
      return true;
    }
  }
}
