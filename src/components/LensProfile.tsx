import { MediaRenderer } from "@thirdweb-dev/react";
import Link from "next/link";
import { ExploreProfilesQuery } from "../graphql/generated"

type Props = {
    profile: ExploreProfilesQuery["exploreProfiles"]["items"][0];
}

export default function LensProfile({ profile }: Props) {
    console.log(profile)
    return (
        <div className="basis-52 flex-shrink-0 rounded-lg justify-between">
                <Link className="flex flex-col items-center" href={`/profiles/${profile.handle}`}>
                        <MediaRenderer 
                        // @ts-ignore
                        src={profile?.picture?.original?.url || "https://media.tarkett-image.com/large/TH_24567080_24594080_24596080_24601080_24563080_24565080_24588080_001.jpg"}
                        alt={profile.name || profile.handle}
                        height="50%"
                        width="50%"
                        className="rounded-full"
                        />

                    <p className="text-lg mt-3">{profile.name || profile.handle}</p>


                </Link>
        </div>
    )
}