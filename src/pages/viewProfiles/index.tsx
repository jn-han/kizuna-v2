import React from 'react'
import { ProfileSortCriteria, PublicationSortCriteria, useExploreProfilesQuery, useExplorePublicationsQuery } from '../../graphql/generated'


export default function Home() {
    const {isLoading, error, data} = useExploreProfilesQuery({
        request: {
            sortCriteria: ProfileSortCriteria.MostFollowers,
        }
    })

    if (isLoading) {
        return (<div className=''>Loading</div>)
    }

    if (error) {
        return (<div>Error...</div>)
    }
    console.log(data?.exploreProfiles.items)

  return (
    <div>
        <h1 className="text-xl mt-3 ml-5">Popular Profiles</h1>

        <div className="flex flex-row flex-nowrap overflow-x-auto">
            
        {
            data?.exploreProfiles.items.map((profile) => (
                <div key={profile.id} className="flex flex-auto flex-col m-5 items-center p-3 rounded-lg bg-accent basis-4/12 flex-shrink-0 ">
                    <h2 className='text-xl mb-3'>{profile.handle}</h2>
                    <h3>Followers: {profile.stats.totalFollowers}</h3>
                    <h3>Following: {profile.stats.totalFollowing}</h3>
                    <h4 className='text-sm mt-4'>{profile.bio}</h4>
                </div>
            ))
        }
        </div>  

    </div>

  )
}
