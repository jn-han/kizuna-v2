import { Player } from "@livepeer/react";
import { MediaRenderer } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { useProfileQuery, usePublicationsQuery } from "../../graphql/generated";
import ContentPlayer from "../../components/livepeer/ContentPlayer";
import Image from "next/image";

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



    if(publicationsError || profileError) {
        return <div>Profile issue occured</div>
    }

    if(loadingProfile){
        return <div>Loading Profile...</div>
    }

    function getIPFSbackground() {
        return profileData?.profile?.coverPicture?.original?.url.substr(7, profileData.profile.coverPicture.original.url.length) || ""
    }

    function getIPFSprofile() {
        return profileData?.profile?.picture?.original?.url.substr(7, profileData.profile.coverPicture.original.url.length)
    }

    var ipfsGateway:string = "https://ipfs.io/ipfs/" 

    return (
        <div className=" flex flex-row">
            <div className="w-3/5 m-20 mr-0 ">
                <ContentPlayer 
                id="6d7el73r1y12chxr"
                />
            </div>

            <div className="w-2/5 m-20 bg-accent">
                {/* Profile information */}
                <div className="h-2/5 bg-black">
                    <div className="">
                            {/* Cover Image */}
                                <MediaRenderer
                                src={profileData?.profile?.coverPicture?.original?.url}
                                height="100%"
                                width="100%"
                                className="w-full h-full"
                                />

                    </div>

                    <div className="">
                        <div className="">
                            {/* Profile Picture */}
                            {/* <img
                            //@ts-ignore
                            src={ipfsGateway + getIPFSprofile()}
                            alt={
                                profileData?.profile?.name || profileData?.profile?.handle
                            }
                            className="h-56 w-56"
                            /> */}
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