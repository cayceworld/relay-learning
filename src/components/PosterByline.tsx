import * as React from "react";
import Image from "./Image";
import { graphql } from "relay-runtime";
import { useFragment } from "react-relay";
import type { PosterBylineFragment$key } from "./__generated__/PosterBylineFragment.graphql";

const PosterBylineFragment = graphql`
  fragment PosterBylineFragment on Actor {
    name
    profilePicture {
      ...ImageFragment @arguments(width: 80, height: 60)
    }
  }
`;

export type Props = {
  poster: PosterBylineFragment$key;
};

export default function PosterByline({ poster }: Props): React.ReactElement {
  if (poster == null) {
    return null;
  }
  const data = useFragment(PosterBylineFragment, poster);

  return (
    <div className="byline">
      <Image
        image={data.profilePicture}
        className="byline__image"
      />
      <div className="byline__name">{data.name}</div>
    </div>
  );
}
