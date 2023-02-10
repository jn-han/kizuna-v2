import { MediaRenderer } from "@thirdweb-dev/react";
import Link from "next/link";
import React from "react";
import { ExplorePublicationsQuery } from "../graphql/generated";


type Props = {
  publication: ExplorePublicationsQuery["explorePublications"]["items"][0];
};

export default function FeedPost({ publication }: Props) {
  console.log(publication);

  return (
    <div className="flex flex-col items-center rounded-lg justify-between p-3 flex-shrink-0 m-4 bg-accent">
      <div className="">
        {/* Author Profile picture */}
        <MediaRenderer
          // @ts-ignore
          src={publication?.profile?.picture?.original?.url || ""}
          alt={publication.profile.name || publication.profile.handle}
          className=""
        />

        {/* Author profile Name */}
        <Link
          href={`/profiles/${publication.profile.handle}`}
          className=""
        >
          {publication.profile.name || publication.profile.handle}
        </Link>
      </div>

      <div className="">
        {/* Name of the post */}
        <h3 className="">
          {publication.metadata.name}
        </h3>

        {/* Description of the post */}
        <p className="">
          {publication.metadata.content}
        </p>

        {/* Image / media of the post if there is one */}
        {(//@ts-ignore
          publication.metadata.image ||
          publication.metadata.media?.length > 0) && (
          <MediaRenderer
            src={
              //@ts-ignore
              publication.metadata.image||
              publication.metadata.media[0].original.url
            }
            alt={publication.metadata.name || ""}
            className=""
          />
        )}
      </div>

      <div className="">
        <p>{publication.stats.totalAmountOfCollects} Collects</p>
        <p>{publication.stats.totalAmountOfComments} Comments</p>
        <p>{publication.stats.totalAmountOfMirrors} Mirrors</p>
      </div>
    </div>

  );
}