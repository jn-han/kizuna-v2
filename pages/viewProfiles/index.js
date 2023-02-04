/* pages/index.js */
import { useEffect, useState } from 'react'
import { client, exploreProfiles } from '../../api'
import Link from 'next/link'



export default function Profiles() {
  /* create initial state to hold array of profiles */
  const [profiles, setProfiles] = useState([])
  useEffect(() => {
    fetchProfiles()
  }, [])
  async function fetchProfiles() {
    try {
      /* fetch profiles from Lens API */
      let response = await client.query({ query: exploreProfiles })
      /* loop over profiles, create properly formatted ipfs image links */
      let profileData = await Promise.all(response.data.exploreProfiles.items.map(async profileInfo => {
        let profile = { ...profileInfo }
        let picture = profile.picture
        if (picture && picture.original && picture.original.url) {
          if (picture.original.url.startsWith('ipfs://')) {
            let result = picture.original.url.substring(7, picture.original.url.length)
            profile.avatarUrl = `http://lens.infura-ipfs.io/ipfs/${result}`
          } else {
            profile.avatarUrl = picture.original.url
          }
        }
        return profile
      }))
      /* update the local state with the profiles array */
      setProfiles(profileData)
    } catch (err) {
      console.log({ err })
    }
  }
  return (
    <div className='pt-20'>
      <h1 className='text-2xl pl-[5rem]'>Popular Profiles</h1>
      <div className='flex flex-wrap flex-row space-x-4 p-8 h-45 '>
        {
          profiles.map(profile => (
            <div key={profile.id} className='p-3 rounded-lg w-56 h-56 flex flex-col items-center'>
              <img className='h-auto w-36 rounded-full' src={profile.avatarUrl || 'https://picsum.photos/200'} />
              <p className='text-md text-center mt-2 break-all'>{profile.name}</p>
              <Link href={`/profile/${profile.handle}`}>
                <p className='cursor-pointer text-center mt-1 mb-2 '>{profile.handle}</p>
              </Link>
              {/* <p className='text-pink-600 text-sm font-medium text-center'>{profile.stats.totalFollowers} followers</p> */}
            </div>
          ))
        }
      </div>
    </div>
  )
}