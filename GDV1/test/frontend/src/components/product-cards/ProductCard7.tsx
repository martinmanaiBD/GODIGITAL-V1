import Image from "@component/Image";
import Link from "next/link";
import { SpaceProps } from "styled-system";
import FlexBox from "../FlexBox";
import Typography from "../Typography";
import { StyledProductCard7 } from "./ProductCardStyle";
import TextField from "@component/text-field/TextField";
import { addJustificationCart } from "@component/API/justification";
import React, { useState } from "react";

export interface ProductCard7Props {
  id: string | number;
  name: string;
  qty: number;
  price: number;
  imgUrl?: string;
  justification?: string;
}

const ProductCard7: React.FC<ProductCard7Props & SpaceProps> = ({
  id,
  name,
  qty,
  price,
  imgUrl,
  ...props
}) => {
  console.log("Rendering ProductCard7:", { id, name, qty, price, imgUrl });
  const [justification, setJustification] = useState('');

  return (
    <StyledProductCard7 {...props}>
      <Image
        src={imgUrl || "/assets/images/products/iphone-xi.png"}
        size={150}
        display="block"
        alt={name}
      />
      <FlexBox
        className="product-details"
        flexDirection="column"
        justifyContent="space-between"
        minWidth="0px"
        width="100%"
      >
        <Link href={`/product/${id}`}>
          <a>
            <Typography
              className="title"
              fontWeight="600"
              fontSize="18px"
              mb="0.5rem"
            >
              {name}
            </Typography>
          </a>
        </Link>
       <TextField
  label="Justification"
  fullwidth
  placeholder="eg : I need this to ease my accounting work"
  type="textarea"
  rows={4}
  mb="1rem"
  onChange={(e) => setJustification(e.target.value)}
        onBlur={async () => {
          try {
            await addJustificationCart(id, justification);
          } catch (error) {
            alert('Failed to add justification');
          }
        }}
      />
        <FlexBox justifyContent="space-between" alignItems="flex-end">
          <FlexBox flexWrap="wrap" alignItems="center">
            <Typography color="gray.600" mr="0.5rem">
              RM{price.toFixed(2)} x {qty}
            </Typography>
            <Typography fontWeight={600} color="primary.main" mr="1rem">
              RM{(price * qty).toFixed(2)}
            </Typography>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </StyledProductCard7>
  );
};

export default ProductCard7;
