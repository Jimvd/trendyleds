

export const MENU_ITEMS = [{
    id: 1,
    label: "Kleding", link: "kleding",
    subitems: [
        { name: "Broeken", link: "/broeken" },
        { name: "Jassen", link: "/jassen" },
        { name: "t-shirts", link: "/tshirts" },
    ],
    hasChevron: true,
},
{
    id: 2,
    label: "Party collection", link: "party-collection",
    subitems: [
        { name: "Halloween", link: "/halloween" },
        { name: "Kerst", link: "/Kerst" },
    ],
    hasChevron: true,
},
{
    id: 3,
    label: "Blog", link: "blog",
    hasChevron: false,
},
{
    id: 4,
    label: "Contact", link: "contact",
    hasChevron: false,
},
{
    id: 5,
    label: "About", link: "about",
    hasChevron: false,
},
]
