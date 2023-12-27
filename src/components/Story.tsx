import * as React from "react";
import { graphql } from "relay-runtime";
import { useFragment } from "react-relay";
import type { StoryFragment$key } from "./__generated__/StoryFragment.graphql";
import Card from "./Card";
import Heading from "./Heading";
import PosterByline, { type Props as PosterBylineProps } from "./PosterByline";
import StorySummary from "./StorySummary";
import Timestamp from "./Timestamp";
import Image from "./Image";

const StoryFragment = graphql`
  fragment StoryFragment on Story {
    title
    summary
    createdAt
    poster {
      ...PosterBylineFragment
    }
    thumbnail {
      ...ImageFragment @arguments(width: 800)
    }
  }
`;

type Props = {
  story: StoryFragment$key;
};

export default function Story({ story }: Props): React.ReactElement {
  const data = useFragment(StoryFragment, story);
  return (
    <Card>
      <PosterByline poster={data.poster} />
      <Heading>{data.title}</Heading>
      <Timestamp time={data.createdAt} />
      <Image image={data.thumbnail}  height={400} />
      <StorySummary summary={data.summary} />
    </Card>
  );
}
