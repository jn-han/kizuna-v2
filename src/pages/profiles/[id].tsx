import { MediaRenderer } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import FeedPost from "../../components/FeedPost";
import { useProfileQuery, usePublicationsQuery } from "../../graphql/generated";

type Props = {};

export default function ProfilePage ({}: Props) {

    const router = useRouter();
    const { id } = router.query

    const {isLoading: loadingProfile, data: profileData, error: profileError} = useProfileQuery({
        request: {
            handle: id,
        },
    },
    {
        enabled: !!id
    }

    );

    const {isLoading: isLoadingPublications, data: publicationsData, error: publicationsError} = 
    usePublicationsQuery({
        request: {
            profileId: profileData?.profile?.id
        }
    }, {
        enabled: !!profileData?.profile?.id
    })

    console.log({loadingProfile, profileData, publicationsData, isLoadingPublications})


    if(publicationsError || profileError) {
        return <div>Profile issue occured</div>
    }

    if(loadingProfile){
        return <div>Loading Profile...</div>
    }

    return (
        <div>
            <div>
                {/* Cover Image */}
                <MediaRenderer 
                src={profileData?.profile?.coverPicture.original.url || ""}
                alt={
                    profileData?.profile?.name || profileData?.profile?.handle
                }
                />
                {/* Profile Picture */}
                <MediaRenderer
                src={profileData?.profile?.picture?.original.url || ""}
                alt={
                    profileData?.profile?.name || profileData?.profile?.handle
                }
                />
                {/* Profile Name  */}
                <h1>
                    {profileData?.profile?.name || "Anon User"}
                </h1>
                {/* Profile Handle */}
                <h2>
                    {profileData?.profile?.handle || "Anon User"}
                </h2>
                {/* Profile Description  */}
                <p>
                    {profileData?.profile?.bio}
                </p>
                <div>
                    {publicationsData?.publications.items.map((publication) =>(
                        <FeedPost publication={publication} key={publication.id}/>
                    ))
                    }
                </div>
            </div>

        </div>
    )
}