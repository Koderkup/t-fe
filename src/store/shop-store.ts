import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ShopStore } from "./types";
import { calculateTotalPrice, featuresActions, removeFeature } from "./helpers";

export const useShopStore = create<ShopStore>()(
  persist(
    set => ({
      shopId: "",
      shopStepTwoFieldsData: {
        textSize: 0,
        highlightColor: "",
        font: "",
        theme: "",
        features: [],
        totalPrice: 0,
      },
      activeStep: null,
      setActiveStep: step => set({ activeStep: step }),
      setShopId: id => set({ shopId: id }),
      setShopStepTwoFieldsData: data =>
        set(state => ({
          shopStepTwoFieldsData: { ...state.shopStepTwoFieldsData, ...data },
        })),
      addFeature: feature =>
        set(state => {
          const { featuresData } = featuresActions(
            state.shopStepTwoFieldsData.features,
            feature
          );
          const totalPrice = calculateTotalPrice(
            featuresData,
            state.shopStepTwoFieldsData.visualDesignFeature || null
          );
          return {
            shopStepTwoFieldsData: {
              ...state.shopStepTwoFieldsData,
              features: featuresData,
              totalPrice,
            },
          };
        }),
      addVisualDesignFeature: data =>
        set(state => {
          const totalPrice = calculateTotalPrice(
            state.shopStepTwoFieldsData.features,
            data
          );
          return {
            shopStepTwoFieldsData: {
              ...state.shopStepTwoFieldsData,
              visualDesignFeature: data,
              totalPrice,
            },
          };
        }),
      removeFeature: featureName =>
        set(state => {
          const { features } = removeFeature(
            state.shopStepTwoFieldsData.features,
            featureName
          );
          const totalPrice = calculateTotalPrice(
            features,
            state.shopStepTwoFieldsData.visualDesignFeature || null
          );
          return {
            shopStepTwoFieldsData: {
              ...state.shopStepTwoFieldsData,
              features,
              totalPrice,
            },
          };
        }),
      removeDesignFeature: () =>
        set(state => {
          const totalPrice = calculateTotalPrice(
            state.shopStepTwoFieldsData.features,
            null
          );
          return {
            shopStepTwoFieldsData: {
              ...state.shopStepTwoFieldsData,
              textSize: 0,
              highlightColor: "",
              font: "",
              theme: "",
              totalPrice,
              visualDesignFeature: undefined,
            },
          };
        }),
      clearFeatures: () =>
        set(() => ({
          shopStepTwoFieldsData: {
            textSize: 0,
            highlightColor: "",
            font: "",
            theme: "",
            features: [],
            totalPrice: 0,
          },
        })),
    }),
    {
      name: "create-app",
    }
  )
);
