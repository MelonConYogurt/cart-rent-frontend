import {SignUp} from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="flex justify-center items-center my-20 mx-10 h-screen">
      <SignUp />
    </section>
  );
}
