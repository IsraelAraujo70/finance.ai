export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pr-br", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};
