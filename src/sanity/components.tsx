"use client";

import { ObjectInputProps, PreviewProps } from "sanity";
import { Box, Flex, Text } from "@sanity/ui";
import { Rating as ReactRating } from '@smastrom/react-rating';
import { FilesIcon, ShirtIcon, ShoppingBagIcon } from "lucide-react";
import '@smastrom/react-rating/style.css';
import Image from "next/image";

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

type OrderProductPreviewProps = PreviewProps & {
  name?: string;
  image?: string;
  price?: number;
  quantity?: number;
}

export const OrderProductPreview = (props: OrderProductPreviewProps) => {
  const { name, quantity, price, image, renderDefault } = props;

  const previewProps: PreviewProps = {
    ...props,
    title: name,
    subtitle: `${quantity || 0} pieces`,
    media: <Image
      fill
      src={image as string}
      alt={name || "Product"}
      style={{ width: "100%", height: "auto" }}
    />,
  };

  return (
    <Flex align="flex-start">
      <Box flex={1}>{renderDefault(previewProps) as React.ReactElement}</Box>
      <Box padding={3}>
        <Text size={2} weight="semibold">₹ {price}</Text>
      </Box>
    </Flex>
  );
};



export const OrderIcon = () => <ShoppingBagIcon />
export const ProductsIcon = () => <ShirtIcon />
export const CategoryIcon = () => <FilesIcon />
