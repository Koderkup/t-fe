interface Resources {
  "ad-block-page": {
    "ad-block-page": {
      title: "Edit ad block";
      "button-text": "Save";
      "delete-button-text": "Delete ad block";
    };
    "ad-blocks-page": {
      title: "Ad blocks";
      "button-text": "Add ad block";
    };
    "create-ad-block-page": {
      title: "Create ad block";
      "button-text": "Create";
    };
    "ad-block-form": {
      "promo-title": "Promo title";
      "promo-title-placeholder": "Enter promo title";
      "promo-link": "Promo link";
      "promo-link-placeholder": "Enter name for promo link";
      "promo-url": "Promo url";
      "promo-url-placeholder": "e.g. www.promourl.com";
      media: "Media";
      "media-button-text": "Add media";
      title: "Title";
      "title-placeholder": "Enter title";
      description: "Description";
      "description-placeholder": "Describe ad block";
      "button-text": "Button text";
      "button-text-placeholder": "Enter button text";
      "button-url": "Button URL";
      "button-url-placeholder": "e.g. www.promourl.com";
      activate: "Activate";
    };
  };
  "bot-settings-page": {
    "page-title": "Bot settings";
    options: {
      "option-1": "Welcome message";
      "option-2": "Order confirmation message";
    };
    "welcome-message-modal": {
      title: "Welcome message";
      form: {
        "media-input": {
          placeholder: "Add media";
          label: "Photo";
        };
        "text-input": {
          placeholder: "Write message";
          label: "Text";
        };
      };
    };
    "order-confirmation-modal": "Order confirmation";
    "button-text": "Save";
  };
  "categories-pages": {
    "categories-page.empty-placeholder": {
      "title-part-1": "Get started:";
      "title-part-2": "create categories";
      "title-part-3": "and";
      "title-part-4": "add products";
      description: "Organize your store to make it easier for customers to find what they're looking for";
      "button-text": "Add category";
    };
    "categories-page.preview": {
      title: "Categories";
      "button-text": "Add category";
    };
    "create-category-page": {
      title: "Create category";
      name: "Category name";
      "name-placeholder": "Enter category name";
      description: "Description";
      "description-placeholder": "Describe category";
      "button-text": "Add category";
    };
    "category-page": {
      title: "Products";
      "add-product-text": "Add product";
      "add-subcategory-text": "Add subcategory";
    };
    "create-subcategory-page": {
      title: "Create subcategory";
      name: "Subcategory name";
      "name-placeholder": "Enter subcategory name";
      "parent-category": "Parent category";
      description: "Description";
      "description-placeholder": "Describe subcategory";
      "button-text": "Add subcategory";
    };
    "delete-modal": {
      cancel: "Cancel";
      "delete-category": "Delete Category";
    };
  };
  "main-page": {
    "page-title": "Create application";
    "page-description": "Choose from a menu of various application types that cater to your business needs.";
    "application-type-list": {
      "item-shop": {
        title: "Item shop";
        description: "Sells consumer goods";
      };
      services: {
        title: "Services";
        description: "Offers haircuts, massages, and repairs";
      };
      booking: {
        title: "Booking";
        description: "Assists in booking travel";
      };
      education: {
        title: "Education";
        description: "Provides formal education";
      };
      healthcare: {
        title: "Healthcare";
        description: "Provides medical services";
      };
      transport: {
        title: "Transport";
        description: "Provides medical care";
      };
    };
    "in-development": "Coming soon";
    link: {
      text: "Can't find the template you want?";
      href: "Let us know";
    };
  };
  newsletter: {
    "no-newsletter": {
      title: "Communicate Effectively";
      description: "Send personalized messages to your customers to share news, promotions, and updates. Use our tools to create engaging content that keeps your audience interested and informed";
      "button-text": "Start mailing";
    };
    "create-newsletter": {
      title: "Create new mailing";
      description: "This message will be visible to subscribers of your store";
      "media-label": "Photo";
      "media-placeholder": "Add photo";
      message: "Message";
      "message-placeholder": "Write a message";
      "button-text": "Send";
      "button-text-2": "Try again";
    };
    "newsletter-history": {
      title: "Mailing";
      description: "Here you can see all the messages that you have sent over time.";
      "button-text": "New message";
      "modal-text": "Message sent";
      status: {
        sent: "Message sent";
        pending: "Message not sent";
      };
    };
  };
  "order-settings-page": {
    title: "Order settings";
    "min-order-amount": "Minimum order amount";
    "min-order-amount-with-delivery": "Minimum order with delivery";
    "forwarding-id": "Forwarding orders";
    "forwarding-id-placeholder": "Add ID";
    "tooltip-text": "Determines where new order information will be sent";
    "button-text": "Save";
  };
  "orders-pages": {
    "order-history-page": {
      title: "Order history";
      "link-text": "See details";
    };
    "order-details-page": {
      title: "Order #{{orderNumber}}";
      "info-list": {
        "order-date": "Order date:";
        "customer-name": "Customer name:";
        "customer-number": "Customer number:";
        "delivery-address": "Delivery address:";
        payment: "Payment:";
        status: "Status:";
      };
      "price-info": {
        subtotal: "Subtotal";
        discount: "Discount";
        delivery: "Delivery";
      };
      "button-text": "Change status";
    };
    "status-modal": {
      cancel: "Cancel";
      title: "Choose status";
      "button-text": "Set status";
    };
    quantity: "Quantity";
    total: "Total";
    "status-variants": {
      pending: "Pending";
      paid: "Paid";
      confirmed: "Confirmed";
      shipped: "Shipped";
      delivered: "Delivered";
      cancelled: "Cancelled";
    };
    "data-placeholder": "No Orders Yet!";
  };
  "payment-page": {
    "page-title": "How would you like /to pay?";
    "all-items": "All items";
    action: "Pay";
    total: "Total";
    "link-text": "What is TaplyCoin?";
    "payment-methods": {
      title: "Payment method";
      stripe: {
        description: "Transactions using credit or debit cards";
      };
      ton: {
        description: "With each transaction users also receive TapplyCoin";
      };
    };
    "tapply-coin-page": {
      description: "With each transaction via TON, users also receive TapplyCoin — branded tokens that can be used within the application to gain access to exclusive designs, discounts and other unique features.";
      "list-title": "These tokens can be used for:";
      "usage-text": {
        first: "Purchases of special designs that are not available for standard purchase";
        second: "Receive discounts on future updates or additional features.";
        third: "Participation in exclusive promotions and offers available only to TapplyCoin owners.";
      };
    };
    "payment-confirmation": {
      "page-title": "Congratulations! New app purchased";
      "page-description": "We wish you success in your business. We are confident that your new app will contribute to its growth and prosperity.";
      "page-cell": "The next steps for managing the application will be sent to you shortly";
      link: {
        text: "Do you have any questions?";
        href: "Contact us";
      };
      "button-text": "Back to Home page";
    };
  };
  "payment-systems-page": {
    title: "Payment systems";
    "crypto-input": "Crypto";
    "fiat-input": "Fiat";
    "crypto-input-placeholder": "Choose crypto system";
    "fiat-input-placeholder": "Choose fiat system";
    "modal-crypto-title": "Select crypto payment methods";
    "modal-fiat-title": "Select fiat payment methods";
    "modal-button": "Save";
  };
  "products-pages": {
    "products-page.empty-placeholder": {
      title: "Add your first product";
      description: "Start building your inventory by adding detailed information about your product, including images, descriptions, and pricing";
      "button-text": "Add product";
    };
    "products-page.overview": {
      title: "Products";
      "all-category": "All";
      "button-text": "Add product";
    };
    "create-product-page": {
      title: "Add product";
      name: "Product name";
      "name-placeholder": "Enter product name";
      "name-error": "Please enter product name";
      "description-short": "Short description (for product card)";
      "description-short-error": "Please add short description";
      "description-full": "Full description (for product page)";
      "description-full-error": "Please add full description";
      "description-placeholder": "Describe product";
      category: "Category";
      "category-placeholder": "Choose option";
      media: "Media";
      "media-button-text": "Add media";
      featured: "Mark as featured";
      price: "Price";
      label: "Label";
      attributes: "Attributes";
      "attributes-button-text": "Add attribute";
      "add-button-text": "Add product";
      labelsPreset: {
        "last-chance": "last chance";
        sale: "sale";
        new: "new";
      };
    };
    "attribute-modal": {
      title: "Add attribute";
      form: {
        name: {
          label: "Attribute name";
          options: {
            color: "Color";
            size: "Size";
          };
        };
        feature: {
          label: "Feature";
          placeholder: "Enter attribute feature";
        };
        extraCharge: {
          label: "Extra charge";
          placeholder: "Add extra charge";
        };
        description: {
          label: "Description";
          placeholder: "Describe the attribute";
        };
        hexCode: {
          label: "Hex Code";
          placeholder: "Enter Hex color code";
        };
        option: "Option";
        "in-stock": "In stock";
        "error-text": "This attribute already exists";
        "color-error": "Invalid HEX color code";
      };
      "action-buttons": {
        save: "Save";
        "save-changes": "Save changes";
        "delete-attribute": "Delete attribute";
        "add-option": "Add option";
        "delete-option": "Delete option";
      };
    };
    "delete-modal": {
      title: "Delete this label?";
      text: "If you delete this label, it will be removed from all product cards.";
      "button-actions": {
        delete: "Delete";
        cancel: "Cancel";
      };
    };
    "product-page": "Edit product";
  };
  "promo-block": {
    "promo-block-page": {
      title: "Edit promo block";
      "button-text": "Save";
      "delete-button-text": "Delete ad block";
    };
    "promo-blocks-page": {
      title: "Promo blocks";
      "button-text": "Add promo block";
    };
    "create-promo-block-page": {
      title: "Create promo block";
      "button-text": "Create";
    };
    "promo-block-form": {
      title: "Title";
      "title-placeholder": "Enter title";
      description: "Description";
      "description-placeholder": "Describe promo block";
      "promo-text": "Promo text";
      "promo-text-placeholder": "Enter text";
      link: "Item link";
      "link-placeholder": "e.g. www.promourl.com";
      media: "Media";
      "media-button-text": "Add media";
      activate: "Activate";
    };
  };
  "promo-codes": {
    "promo-code-page": {
      title: "Edit promocode";
      "button-text": "Save";
      "delete-button-text": "Delete promocode";
    };
    "promo-codes-page": {
      title: "Promocodes";
      "button-text": "Add promocode";
    };
    "create-promo-code-page": {
      title: "Create promocode";
      "button-text": "Create";
    };
    "promo-code-form": {
      name: "Promocode name";
      "name-placeholder": "Enter promocode name";
      discount: "Discount";
      "start-date": "Start date";
      "date-placeholder": "Choose date";
      "end-date": "End date";
      activate: "Activate";
      "end-date-error": "Please enter a valid date";
      "datepicker-start-title": "Choose start date";
      "datepicker-end-title": "Choose end date";
      "datepicker-start-button": "Set start date";
      "datepicker-end-button": "Set end date";
    };
  };
  "shop-settings-page": {
    "page-title": "Shop settings";
    inputs: {
      "media-block": {
        label: "Shop image";
        placeholder: "Add media";
      };
      name: "Shop name*";
      "bot-token": "Bot token*";
      description: "Description";
      country: "Country*";
      "currency*": "Currency*";
      search: "Search";
      "select-placeholder": "Select a {{inputName}}";
      "input-placeholder": "Enter a {{inputName}}";
    };
    modals: {
      "country-modal": "Select country";
      "currency-modal": "Select currency";
    };
    "button-text": "Save";
  };
  "step-one-page": {
    "step-one-page": {
      step: "Step";
      title: "Enter /basic information/ about your business";
      placeholder: "Enter {{name}}";
      "placeholder-2": "Enter shop {{inputName}}";
      "placeholder-3": "Token";
      "step-one-form": {
        "shop-name-input": "Shop name";
        botToken: "Bot Token";
        "address-input": "Address";
        "phone-number-input": "Phone number";
        description: "Description";
        "email-input": {
          label: "Email";
          placeholder: "e.g. shop@mail.com";
        };
        "shop-type-input": {
          label: "Type";
          placeholder: "Choose option";
        };
      };
      botTokenText: {
        head_over_to: "Head over to";
        and: "and";
        get_your_token: "get your token";
      };
    };
    "shop-type-selection-page": {
      title: "Select type";
      placeholder: "Search";
      "option-1": "Cosmetics and Beauty Products";
      "option-2": "Clothing and Apparel";
      "option-3": "Electronics and Gadgets";
      "option-4": "Home Decor and Furniture";
      "option-5": "Jewelry and Accessories";
      "option-6": "Health and Wellness Products";
      "option-7": "Books and Stationery";
      "option-8": "Food and Beverage";
      "option-9": "Baby and Kids Products";
      "option-10": "Pet Supplies";
      "option-11": "Toys and Games";
      "option-12": "Art and Crafts";
      "option-13": "Automotive Parts and Accessories";
      "option-14": "Footwear";
      "option-15": "Outdoor and Camping Gear";
      "option-16": "Personalized Gifts";
      "option-17": "Digital Products (eBooks, Software)";
      "option-18": "Subscription Boxes";
      "option-19": "Vintage and Antique Items";
      "option-20": "Musical Instruments and Accessories";
      "option-21": "Office Supplies";
      "option-22": "Gardening and Outdoor Supplies";
      "option-23": "Party Supplies and Decorations";
      "option-24": "Travel Accessories";
      "option-25": "Watches and Timepieces";
      "option-26": "Ethical and Sustainable Products";
      "option-27": "Wedding and Bridal Supplies";
      "option-28": "Luxury Goods";
      "option-29": "Hobby and DIY Kits";
    };
    "instruction-modal": {
      title: "How To Get Bot Token";
      list: {
        "step-one": {
          title: "Step 1: Open @BotFather";
          "description-1": "Find the";
          "description-2": "bot in Telegram. It’s the official bot for creating and managing other bots.";
        };
        "step-two": {
          title: "Step 2: Create a New Bot";
          "description-1": "Send /newbot to ,";
          "description-2": "then follow the prompts to name your bot and set a unique username.";
        };
        "step-three": {
          title: "Step 3: Get the Token";
          "description-1": "After your bot is created,";
          "description-2": "will give you a token. Copy it and paste it into the required field.";
        };
      };
    };
  };
  "step-three-page": {
    "additional-feature-page": {
      title: "Choose /additional features/ for your application";
    };
    "payment-method-page": {
      payment: "Payment";
      add: "Add";
    };
    "feature-page": {
      "add-for": "Add for {{price}}";
    };
  };
  "step-two-page": {
    "step-two-page": {
      step: "Step";
      title: "Select /visual design/ for your application";
      placeholder: "Search";
    };
    "design-settings-page": {
      appearance: "Appearance";
      "explain-text": "Customize some aspects of the visual style to further adapt the app to your brand";
      form: {
        "theme-inputs": {
          label: "Mode";
          "input-one": {
            title: "Light";
            description: "Theme will be always in light mode";
          };
          "input-two": {
            title: "Dark";
            description: "Theme will be always in dark mode";
          };
          "input-three": {
            title: "Automatic";
            description: "Theme will follow the operating system theme";
          };
        };
        "colors-input": "Highlight color";
        "font-input": "Font";
        "tex-size-input": "Text Size";
        "submit-button": "Add for {{price}}";
      };
    };
    "font-type-selection-page": {
      title: "Select a font";
    };
    "design-tags": {
      bright: "Bright";
      light: "Light";
      classic: "Classic";
      minimalism: "Minimalism";
    };
  };
  translation: {
    "home-page.navigation": {
      main: "Main";
      settings: "Settings";
      categories: "Categories";
      products: "Products";
      orders: "Orders";
      newsletters: "Newsletter";
      payment: "Payment";
      "bot-settings": "Bot Settings";
      "order-settings": "Order Settings";
      "ad-block": "Ad block";
      "promo-codes": "Promocodes";
      "promo-block": "Promo block";
    };
    "action-sheet.actions": {
      edit: "Edit";
      delete: "Delete";
      continue: "Continue";
    };
    "dropdown-menu": {
      selected: "Selected:";
      items: "Items";
      item: "Item";
      "menu-actions": {
        "menu-open": "See details";
        "close-menu": "Hide details";
        "remove-feature": "Remove";
      };
      features: {
        "visual-design": "Visual design";
      };
    };
    "control-panel": {
      "create-app": "Create an app";
      administrate: "Administrate";
      "app-settings": "App settings";
    };
    "example-text": "Pack my box with five dozen liquor jugs.";
    "languages-modal": {
      title: "Select language";
      "input-placeholder": "Search";
      zh: "Chinese";
      en: "English";
      hi: "Hindi";
      pt: "Portuguese";
      uk: "Ukrainian";
      ru: "Russian";
    };
    "app-settings-page": {
      "page-title": "Settings";
      balance: "Tapply coin balance";
      "phone-number": "Phone number";
      name: "Name";
      "last-name": "Last name";
      "last-name-placeholder": "Second name";
      language: "Language*";
      "language-placeholder": "Choose option";
    };
    "coupon-modal": {
      title: "Congratulations!";
      description: "You've just unlocked a coupon for 100 TapplyCoins";
      "button-text": "Get it";
    };
    "error-messages": {
      required: "This field is required";
      email: "Invalid email format";
      phoneNumber: "Invalid phone number format";
    };
    "administrate-page": {
      title: "Shop administrate";
      description: {
        "part-1": "Here you can view all the stores";
        "part-2": "that are under your administration";
      };
    };
  };
  "welcome-page": {
    "welcome-page": {
      title: "Welcome to";
      description: "Create unique applications for your business directly in Telegram with ease and convenience";
      continue: "Continue";
      skip: "Skip";
      next: "Next";
      "get-started": "Get started";
      step: "Step";
      "step-1-title": "Why do you need Tapply?";
      "step-1-description": "Tapply offers a convenient way to build websites directly within Telegram";
      "step-2-title": "Tapply advantages";
      "step-2-description": "Our app streamlines website building with flexible design, customization, and built-in analytics/SEO tools";
      "step-3-title": "Create your application";
      "step-3-description": "Create unique applications for your business directly in Telegram with ease and convenience";
      "step-4-title": "Application management";
      "step-4-description": "Manage the created application, including managing functions, monitoring and updates";
      "step-5-title": "Support and contacts";
      "step-5-description": "If you have any questions or need assistance, don't hesitate to contact our support team";
      "step-6-title": "Free 14 days trial!";
      "step-6-description": "Try Tapply for free for 14 days and see how convenient it is to manage your tasks";
    };
  };
}

export default Resources;
