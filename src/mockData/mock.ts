export const MOCK_RELATED_SEARCH = [
  "What are the unique flavor profiles of each type of coffee bean",
  "How do the origins of coffee beans influence their taste",
  "Why is Robusta often used in espresso blends",
  "How does the flavor of Excelsa beans compare to Arabica and Robusta",
];

export const MOCK_SOURCES = [
  {
    id: 1,
    name: "kitchenaid",
    url: "https://www.kitchenaid.com/pinch-of-help/countertop-appliances/types-of-coffee-beans.html",
    header: "4 Types of Coffee Beans: How to Choose",
  },
  {
    id: 2,
    name: "counterculturecoffee",
    url: "https://counterculturecoffee.com/blogs/counter-culture-coffee/coffee-basics-brewing-methods",
    header: "Coffee Basics: Brewing Methods",
  },
  {
    id: 3,
    name: "reddit",
    url: "https://www.reddit.com/r/Coffee/comments/2md6x3/how_to_match_coffee_types_to_brew_methods/?rdt=39306",
    header: "HHow to match coffee types to brew methods?",
  },
  {
    id: 4,
    name: "cafedirect",
    url: "https://www.cafedirect.co.uk/shop/coffee-bean-types-and-their-characteristics/s",
    header: "Coffee Bean Types and Their Characteristics",
  },
  {
    id: 5,
    name: "orleanscoffee",
    url: "https://orleanscoffee.com/brew-specialty-coffee-at-home/",
    header: "Specialty Coffee: How to Brew the Best Coffee at Home",
  },
];

export const MOCK_SEARCH_RESULT_WEB = {
  introduction:
    "There are four main types of coffee beans, each with distinct characteristics and optimal brewing methods.",
  content: [
    {
      title: "Arabica",
      format: "list",
      data: [
        {
          description:
            "These are the most popular coffee beans worldwide, known for their smooth, complex flavor profiles.",
          sources: [1, 4],
        },
        {
          subtitle: "Pour-over",
          description:
            "Ideal for teasing out delicate flavors. Use a finer grind, similar to table salt, for smaller pour-over cones.",
          sources: [2],
        },
        {
          subtitle: "Drip coffee",
          description:
            "A common choice for Arabica beans due to their balanced flavor profile.",
          sources: [1],
        },
      ],
    },
    {
      title: "Robusta",
      format: "list",
      data: [
        {
          description:
            "These beans have a deeper, more bitter flavor with woody or nutty undertones.",
          sources: [1, 4],
        },
        {
          subtitle: "Espresso",
          description:
            "Their bold flavor stands up well to milk and other additions.",
          sources: [1],
        },
        {
          subtitle: "Coffee blends",
          description: "Often used to complement other coffee flavors.",
          sources: [1],
        },
      ],
    },
    {
      title: "Excelsa",
      format: "list",
      data: [
        {
          description:
            "Known for their complex flavor profile, combining light and dark roast traits.",
          sources: [1, 4],
        },
        {
          subtitle: "Brewed coffee",
          description:
            "Their unique flavor makes them popular as a stand-alone brew.",
          sources: [1],
        },
        {
          subtitle: "Coffee blends",
          description: "Adds dimension to the overall flavor.",
          sources: [1],
        },
      ],
    },
    {
      title: "Liberica",
      format: "list",
      data: [
        {
          description:
            "These beans have an unusual flavor profile described as nutty and woody.",
          sources: [1, 4],
        },
        {
          subtitle: "Brewed coffee",
          description: "Can be enjoyed on its own for its unique taste.",
          sources: [1],
        },
        {
          subtitle: "Desserts",
          description:
            "Their distinct flavor can add an interesting twist to coffee-based desserts.",
          sources: [1],
        },
      ],
    },
  ],
};

export const MOCK_SEARCH_RESULT = {
  introduction:
    "Coffee enthusiasts around the world appreciate the diverse flavors and characteristics of different coffee bean varieties. Here's an overview of the main types of coffee beans and the best brewing methods for each:",
  content: [
    {
      title: "Types of Beans",
      format: "list",
      data: [
        {
          heading: "Arabica",
          description:
            "Arabica beans are the most popular and widely consumed coffee beans, accounting for about 60-70% of global coffee production.",
        },
        {
          heading: "Robusta",
          description:
            "Robusta beans are known for their strong, bold flavor and higher caffeine content compared to Arabica beans. They are often used in espresso blends to add body and crema to the shot.",
        },
        {
          heading: "Excelsa",
          description:
            "Excelsa beans are known for their unique flavor profile, combining light and dark roast traits.",
        },
      ],
    },
    {
      title: "Best Brewing Methods",
      format: "list",
      data: [
        {
          heading: "Pour-over",
          description:
            "Ideal for: Arabica, Excelsa. This method highlights the delicate flavors and aromas of high-quality single-origin coffees.",
        },
        {
          heading: "Espresso",
          description:
            "Ideal for: Arabica (high-quality single-origin), Robusta (in blends) Espresso brewing can showcase the complexity of Arabica or harness the strong flavors and crema-producing qualities of Robusta.",
        },
        {
          heading: "French press",
          description:
            "Ideal for: Robusta, Liberica The full immersion brewing process extracts bold flavors and oils, complementing the characteristics of these bean types.",
        },
        {
          heading: "Cold brew",
          description:
            "Ideal for: Arabica, Liberica, Excelsa. The slow extraction process of cold brewing brings out the smooth, less acidic qualities of these beans while preserving their unique flavor profiles.",
        },
      ],
    },
  ],
};

// 1. why are there sources sometimes ? but not all the time ? User transparency in the UI as we figure this out would help with confusion.
// 2. shared spaces would be a nice collaboration feature !
