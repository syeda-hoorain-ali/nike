"use client";

import { ObjectInputProps } from "sanity";
import { Flex, Text } from "@sanity/ui";
import { Rating as ReactRating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';

type RatingProps = ObjectInputProps<{ stars: number; count: number }>

export const Rating = (props: RatingProps) => {

  const { value } = props
  console.log(props)

  if (!value) return <Text>No rating available</Text>;

  return (
    <Flex align="center" style={{ gap: '1rem' }}>
      <ReactRating style={{ maxWidth: 160 }} value={value.stars} readOnly />
      <Text weight="semibold" muted style={{ marginTop: '2px' }}>({value.count})</Text>
    </Flex>
  )
}
