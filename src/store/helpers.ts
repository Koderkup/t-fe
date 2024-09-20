import { AttributesFields } from "@/shared/types/product.interface";
import { ShopFeature } from "@/shared/types/types";

export const featuresActions = (
  features: Array<ShopFeature>,
  feature: ShopFeature
) => {
  const featureIdx = features.findIndex(
    el => el.featureTitle === feature.featureTitle
  );
  let newFeatures;

  if (featureIdx !== -1) {
    newFeatures = [...features];
    newFeatures[featureIdx] = feature;
  } else {
    newFeatures = [...features, feature];
  }

  return {
    featuresData: newFeatures,
  };
};

export const removeFeature = (
  features: Array<ShopFeature>,
  featureName: string
) => {
  const newFeatures = features.filter(el => el.featureTitle !== featureName);
  return {
    features: newFeatures,
  };
};

export const calculateTotalPrice = (
  features: Array<ShopFeature>,
  visualDesignFeature: ShopFeature | null
) => {
  const featuresTotalPrice = features.reduce(
    (prev, current) => prev + current.featurePrice,
    0
  );

  const visualDesignPrice = visualDesignFeature
    ? visualDesignFeature.featurePrice
    : 0;

  return featuresTotalPrice + visualDesignPrice;
};

export const removeAttribute = (
  attributes: Array<AttributesFields>,
  name: string
) => {
  const newAttributes = attributes.filter(el => el.attributeName !== name);

  return {
    attributes: newAttributes,
  };
};

export const attributeActions = (
  attributes: Array<AttributesFields>,
  attribute: AttributesFields
) => {
  const attributeIdx = attributes.findIndex(el => el.id === attribute.id);
  let newAttribute;

  if (attributeIdx !== -1) {
    newAttribute = [...attributes];
    newAttribute[attributeIdx] = attribute;
  } else {
    newAttribute = [...attributes, attribute];
  }

  return {
    attributes: newAttribute,
  };
};

export const phoneNumberFormatCheck = (phoneNumber: string) =>
  phoneNumber.includes("+") ? phoneNumber : `+${phoneNumber}`;
