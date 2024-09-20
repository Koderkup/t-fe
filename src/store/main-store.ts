import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { MainStore } from "./types";
import { attributeActions, removeAttribute } from "./helpers";

export const useMainStore = create<MainStore>()(
  immer(set => ({
    currentStep: 1,
    isBannersOpen: false,
    isModalOpen: false,
    attributes: [],
    stepTwoFormData: {
      font: "Roboto",
      textSize: "15",
      theme: "Light",
      highlightColor: "#67FF92",
    },
    paymentMethod: "stripe",
    activeItemId: null,
    activeShopId: null,
    isLabelInputOpen: false,
    isSuccesModalOpen: false,
    productMedias: [],
    activeMedia: null,
    incrementStep: () => {
      set(state => ({ currentStep: state.currentStep + 1 }));
    },
    toggleBanners: () => {
      set(state => ({ isBannersOpen: !state.isBannersOpen }));
    },
    toggleLabelInput: show => {
      set(() => ({ isLabelInputOpen: show }));
    },
    toggleModal: isOpen => {
      set(() => ({ isModalOpen: isOpen }));
    },
    toggleSuccesModal: open => {
      set(() => ({ isSuccesModalOpen: open }));
    },
    setActiveItemId: id => {
      set(() => ({ activeItemId: id }));
    },
    setAttributes: data =>
      set(state => {
        const { attributes } = attributeActions(state.attributes, data);
        return {
          attributes,
        };
      }),
    deleteAttribute: name =>
      set(state => {
        const { attributes } = removeAttribute(state.attributes, name);
        return {
          attributes,
        };
      }),
    clearAttributes: () =>
      set(() => ({
        attributes: [],
      })),
    setStepTwoFormData: data =>
      set(state => ({
        stepTwoFormData: { ...state.stepTwoFormData, ...data },
      })),
    setPaymentMethod: data => {
      set(() => ({ paymentMethod: data }));
    },
    setActiveShopId: id => {
      set(() => ({ activeShopId: id }));
    },
    setProductMedias: productMedias => {
      set(() => ({ productMedias }));
    },
    setActiveMedia: activeMedia => {
      set(() => ({ activeMedia }));
    },
  }))
);
