// "use client";
// import {Protect} from "@clerk/nextjs";

// export default function SettingsForm() {
//   return (
//     <Protect
//       permission="org:insert:add"
//       fallback={<p>You are not allowed to see this section.</p>}
//     >
//       <div>Si ves esto eres admin</div>
//     </Protect>
//   );
// }

"use client";

import {useUser} from "@clerk/clerk-react";

export default function Home() {
  const {isSignedIn, user, isLoaded} = useUser();

  if (!isLoaded) {
    // Handle loading state however you like
    return null;
  }

  if (isSignedIn) {
    return <div onClick={() => console.log(user)}>Hello {user.fullName}!</div>;
  }

  return <div>Not signed in</div>;
}
