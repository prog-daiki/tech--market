type PriceFormatProps={
  price: number;
}

const PriceFormat: React.FC<PriceFormatProps> = ({
  price,
}) => {
  const formatPrice = price.toLocaleString();
  return formatPrice;
}

export default PriceFormat;
