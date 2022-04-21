module.exports = function (html, obj) {
  let out = html.replace(/{ImageProduct}/g, obj.image);
  out = out.replace("{DescProduct}", obj.description);
  out = out.replace(/{NameProduct}/g, obj.productName);
  out = out.replace("{DetailProduct}", obj.quantity);
  out = out.replace(/{PriceProduct}/g, obj.price);
  out = out.replace("{IdProduct}", obj.id);
  out = out.replace("{OrganicProduct}", obj.organic ? "Organic!" : "");
  out = out.replace("{CountryProduct}", obj.from);
  out = out.replace("{VitaminProduct}", obj.nutrients);
  return out;
};

