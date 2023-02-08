import { Player } from "@livepeer/react";
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
            <div className="p-1 w-1/2 absolute top-40 m-3 inline-block">
                <Player></Player>
            </div>

            <div>
                {/* Profile information */}
                <div className=" w-5/12 absolute right-10 top-40 bg-header inline-block p-4 border-solid border-grey border-[1px] shadow-2xl rounded-lg">
                    <div className="w-full">
                        {/* Cover Image */}
                        <MediaRenderer 
                        src={profileData?.profile?.coverPicture.original.url || ""}
                        alt={
                            profileData?.profile?.name || profileData?.profile?.handle
                        }
                        height="100%"
                        width="100%"
                        className="z-10"
                        />
                    </div>
                    <div>
                        {/* Profile Picture */}
                        <MediaRenderer
                        src={profileData?.profile?.picture?.original.url || ""}
                        alt={
                            profileData?.profile?.name || profileData?.profile?.handle
                        }
                        height="30%"
                        width="30%"
                        className="rounded-xl ring-8 relative -top-10 left-2 z-0 m-3 ring-header "
                        />
                    </div>
                    <div className="relative -top-12 left-5 text-xl">
                        {profileData.profile.name}
                    </div>
                    <div className="relative -top-12 left-5 text-accent">
                        @{profileData.profile.handle}
                    </div>
                    
                    {/* <div className="relative left-52"> */}
                        {/* Followers */}
                        {/* <div className="inline-block w-3/12 bg-black p-2 rounded-lg">
                                {profileData.profile.stats.totalFollowers}
                                <br></br>
                                Followers
                        </div> */}
                        
                        {/* Following */}
                        {/* <div className="inline-block w-3/12 span-right ml-2 p-2 h-auto bg-black left-2 rounded-lg">
                            {profileData.profile.stats.totalFollowing}
                            <br></br>
                            Following
                        </div>
                    </div> */}


                </div>





                {/* <div>
                    <h2>About</h2> */}
                    {/* PROFILE DESCRIPTION GOES HERE  */}
                    {/* <div>
                        <p>
                            {profileData?.profile?.bio}
                        </p>
                    </div>
                </div> */}

                {/* <div>
                    {publicationsData?.publications.items.map((publication) =>(
                        <FeedPost publication={publication} key={publication.id}/>
                    ))
                    }
                </div> */}
            </div>

        </div>
    )
}