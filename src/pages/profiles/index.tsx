import React from 'react'
import FeedPost from '../../components/FeedPost'
import LensProfile from '../../components/LensProfile'
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
        <div className="flex flex-row flex-nowrap overflow-x-auto h-1/4">
        {data?.exploreProfiles.items.map((profile) => (
            <LensProfile key={profile.id} profile={profile}/>
        ))}

        </div>  

    </div>

  )
}
