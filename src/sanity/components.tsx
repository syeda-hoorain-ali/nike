"use client";

import { ObjectInputProps } from "sanity";
import { Flex, Text } from "@sanity/ui";
import { Rating as ReactRating } from '@smastrom/react-rating';
import { FilesIcon, ShirtIcon, ShoppingBagIcon } from "lucide-react";
import '@smastrom/react-rating/style.css';

type RatingProps = ObjectInputProps<Record<string, number>>

export const Rating = ({ value }: RatingProps) => {

  if (!value) return <Text>No rating available</Text>;

  return (
    <Flex align="center" style={{ gap: '1rem' }}>
      <ReactRating style={{ maxWidth: 160 }} value={value.stars} readOnly />
      <Text weight="semibold" muted style={{ marginTop: '2px' }}>({value.count})</Text>
    </Flex>
  )
}

export const OrderIcon = () => <ShoppingBagIcon />
export const ProductsIcon = () => <ShirtIcon />
export const CategoryIcon = () => <FilesIcon />
