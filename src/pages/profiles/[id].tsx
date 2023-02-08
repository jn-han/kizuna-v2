import { Player } from "@livepeer/react";
import { MediaRenderer } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import FeedPost from "../../components/FeedPost";
import { useProfileQuery, usePublicationsQuery } from "../../graphql/generated";
import ContentPlayer from "../../components/livepeer/ContentPlayer";

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
        <div className="h-screen w-full">
            <div className="p-4 w-1/2 absolute top-36 m-3 inline-block">
                <ContentPlayer id="6d7el73r1y12chxr"/>
            </div>

            <div>
                {/* Profile information */}
                <div className=" w-5/12 h-2/5 absolute right-10 top-36 bg-header inline-block p-4 border-solid border-grey border-[1px] shadow-2xl rounded-lg">
                    <div className="w-full h-3/6">
                        {/* Cover Image */}
                        <MediaRenderer 
                            //@ts-ignore
                            src={profileData?.profile?.coverPicture.original.url || "https://media.tarkett-image.com/large/TH_24567080_24594080_24596080_24601080_24563080_24565080_24588080_001.jpg"}
                            alt={
                                profileData?.profile?.name || profileData?.profile?.handle
                            }
                            height=""
                            width=""
                            className="object-contain"
                        />
                    </div>
                    <div className="-top-12 left-10 relative h-0 w-1/4 bg-accent pb-[10%]">
                        <div>
                            {/* Profile Picture */}
                            <MediaRenderer
                            //@ts-ignore
                            src={profileData?.profile?.picture?.original.url || ""}
                            alt={
                                profileData?.profile?.name || profileData?.profile?.handle
                            }
                            height="100%"
                            width="100%"
                            className="rounded-xl ring-8 object-contain ring-header "
                            />
                        <p className="mt-2 ml-2">{profileData.profile.name}</p>
                        <p className="ml-2 text-accent">
                        @{profileData.profile.handle}
                        </p>
                        </div>
                                            
                        {/* <div className=""> */}
                            {/* Followers */}
                            {/* <div className="">
                                    {profileData.profile.stats.totalFollowers}
                                    <br></br>
                                    Followers
                            </div> */}
                            {/* Following */}
                            {/* <div className="">
                                {profileData.profile.stats.totalFollowing}
                                <br></br>
                                Following
                            </div>
                        </div> */}
                    </div>




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