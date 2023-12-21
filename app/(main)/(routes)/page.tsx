// import { ModeToggle } from "@/components/darkTheme-toggle";
// import { UserButton } from "@clerk/nextjs";

// export default function Home() {
//   return (
//     <div className="">
//       <UserButton afterSignOutUrl="/" />
//       <ModeToggle />
//     </div>
//   );
// }
import { redirect } from "next/navigation";
import { initialProfile } from "@/lib/initial-profile";
import { db } from "@/lib/db";
import { InitialModal } from "@/components/modals/initial-modal";

const SetupPage = async () => {
  const profile = await initialProfile();

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return <InitialModal />;
};

export default SetupPage;
