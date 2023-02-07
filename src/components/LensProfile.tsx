import { MediaRenderer } from "@thirdweb-dev/react";
import Link from "next/link";
import { ExploreProfilesQuery } from "../graphql/generated"

type Props = {
    profile: ExploreProfilesQuery["exploreProfiles"]["items"][0];
}

export default function LensProfile({ profile }: Props) {
    console.log(profile)
    return (
        <div className="bg-accent flex flex-col items-center basis-1/6 flex-shrink-0 p-1 m-4 rounded-lg">
            <div className="w-3/5">
                <MediaRenderer 
                // @ts-ignore
                    src={profile?.picture?.original?.url || ""}
                    alt={profile.name || profile.handle}
                    className=""
                />
            </div>
            <div className="">
            <Link href={`/profiles/${profile.handle}`}>
                    <p className="text-lg">{profile.name || profile.handle}</p>
            </Link>
            </div>
                <p className="text-md">Followers: {profile.stats.totalFollowers}</p>
                <p className="text-sm">{profile.bio}</p>
        </div>
    )
}