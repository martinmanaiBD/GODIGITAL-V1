import Image from "@component/Image";
import Link from "next/link";
import { SpaceProps } from "styled-system";
import FlexBox from "../FlexBox";
import Typography from "../Typography";
import { StyledProductCard12 } from "./ProductCardStyle";
import TextField from "@component/text-field/TextField";
import { fetchCartItems} from '@component/API/cart';
import { getJustificationCart } from '@component/API/justification';
import React, { useEffect, useState } from "react";
import { CartItem } from '@reducer/cartReducer';

export interface ProductCard12Props {
  id: string | number;
  name: string;
  qty: number;
  price: number;
  imgUrl?: string;
  justification: string;
 
}

const ProductCard12: React.FC<ProductCard12Props & SpaceProps> = ({
  id,
  name,
  qty,
  price,
  imgUrl,
  justification: initialJustification, 
  ...props
}) => {
  console.log("Rendering ProductCard12:", { id, name, qty, price, imgUrl });
  const [,setCartItems] = useState<CartItem[]>([]);
  const [justification, setJustification] = useState('');

  useEffect(() => {
    const fetchCartAndJustification = async () => {
      try {
        const items = await fetchCartItems();
        setCartItems(items);
        
        // Assume id is the item id you want to get justification for
        const justification = await getJustificationCart(id);
        setJustification(justification);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCartAndJustification();
  }, [id]);

  return (
    <StyledProductCard12 {...props}>
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
        value={justification} // set value to the fetched justification
        onChange={(e) => setJustification(e.target.value)}
        onBlur={async () => {
            try {
              const fetchedJustification = await getJustificationCart(id);
              setJustification(fetchedJustification); // Update state with fetched justification
            } catch (error) {
              alert('Failed to fetch justification');
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
    </StyledProductCard12>
  );
};

export default ProductCard12;