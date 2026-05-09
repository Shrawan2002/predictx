// import { Market } from "@/app/types";

// export const markets: Market[] = [
//     {
//         id: "btc-5m-1",
//         title: "Will Bitcoin be above $68,500 in 5 minutes?",
//         category: "crypto",
//         isLive: true,
//         volume: 2845231,
//         liquidity: 120000,
//         endTime: "2026-04-29T14:35:00Z",
//         outcomes: [
//             { id: "btc-5m-1-yes", label: "Yes", price: 0.57 },
//             { id: "btc-5m-1-no", label: "No", price: 0.43 },
//         ],
//     },
//     {
//         id: "btc-april-high",
//         title: "What price will Bitcoin hit by April 30?",
//         category: "crypto",
//         isLive: true,
//         volume: 5123456,
//         liquidity: 340000,
//         endTime: "2026-04-30T23:59:59Z",
//         outcomes: [
//             { id: "btc-april-high-70k", label: "$70K–$75K", price: 0.28 },
//             { id: "btc-april-high-75k", label: "$75K–$80K", price: 0.41 },
//             { id: "btc-april-high-80k", label: "$80K+", price: 0.31 },
//         ],
//     },
//     {
//         id: "eth-4000-april",
//         title: "Will Ethereum exceed $4,000 by April 30?",
//         category: "crypto",
//         isLive: true,
//         volume: 1892345,
//         liquidity: 210000,
//         endTime: "2026-04-30T23:59:59Z",
//         outcomes: [
//             { id: "eth-4000-yes", label: "Yes", price: 0.63 },
//             { id: "eth-4000-no", label: "No", price: 0.37 },
//         ],
//     },
//     {
//         id: "sol-200-april",
//         title: "Will Solana hit $200 in April?",
//         category: "crypto",
//         isLive: false,
//         volume: 923451,
//         liquidity: 95000,
//         endTime: "2026-04-30T23:59:59Z",
//         outcomes: [
//             { id: "sol-200-yes", label: "Yes", price: 0.46 },
//             { id: "sol-200-no", label: "No", price: 0.54 },
//         ],
//     },
//     {
//         id: "btc-month-close",
//         title: "Will Bitcoin close above $70,000 on April 30?",
//         category: "crypto",
//         isLive: true,
//         volume: 3212345,
//         liquidity: 275000,
//         endTime: "2026-04-30T23:59:59Z",
//         outcomes: [
//             { id: "btc-close-yes", label: "Yes", price: 0.52 },
//             { id: "btc-close-no", label: "No", price: 0.48 },
//         ],
//     },
//     {
//         id: "eth-weekly-range",
//         title: "ETH price range this week?",
//         category: "crypto",
//         isLive: true,
//         volume: 1456789,
//         liquidity: 180000,
//         endTime: "2026-05-03T23:59:59Z",
//         outcomes: [
//             { id: "eth-range-3000", label: "$3000–$3500", price: 0.25 },
//             { id: "eth-range-3500", label: "$3500–$4000", price: 0.44 },
//             { id: "eth-range-4000", label: "$4000+", price: 0.31 },
//         ],
//     },
// ];



// import { MockMarket } from "../types/index";

// export const mockMarkets: MockMarket[] = [

//     {
//         id: "1",
//         title: "Will Bitcoin hit $100K in 2026?",
//         category: "Crypto",
//         isLive: true,
//         volume: 7200000,
//         outcomes: [
//             { label: "Yes", percentage: 62 },
//             { label: "No", percentage: 38 },
//         ],
//     },
//     {
//         id: "2",
//         title: "Will Ethereum reach $3,000 this month?",
//         category: "Crypto",
//         isLive: true,
//         volume: 4100000,
//         outcomes: [
//             { label: "Above 3000", percentage: 55 },
//             { label: "Below 3000", percentage: 45 },
//         ],
//     },
//     {
//         id: "3",
//         title: "Will Solana cross $200 in May?",
//         category: "Crypto",
//         isLive: false,
//         volume: 1900000,
//         outcomes: [
//             { label: "Above 200", percentage: 48 },
//             { label: "Below 200", percentage: 52 },
//         ],
//     },

//     // 🏏 SPORTS
//     {
//         id: "4",
//         title: "Will India win the World Cup 2026?",
//         category: "Sports",
//         isLive: true,
//         volume: 8500000,
//         outcomes: [
//             { label: "Yes", percentage: 58 },
//             { label: "No", percentage: 42 },
//         ],
//     },
//     {
//         id: "5",
//         title: "Will Manchester City win the league?",
//         category: "Sports",
//         isLive: true,
//         volume: 5300000,
//         outcomes: [
//             { label: "Yes", percentage: 64 },
//             { label: "No", percentage: 36 },
//         ],
//     },
//     {
//         id: "6",
//         title: "Will Messi score 30+ goals this season?",
//         category: "Sports",
//         isLive: false,
//         volume: 2100000,
//         outcomes: [
//             { label: "Yes", percentage: 47 },
//             { label: "No", percentage: 53 },
//         ],
//     },

//     // 🏛 POLITICS
//     {
//         id: "7",
//         title: "Will Donald Trump win the 2028 election?",
//         category: "Politics",
//         isLive: true,
//         volume: 9300000,
//         outcomes: [
//             { label: "Yes", percentage: 51 },
//             { label: "No", percentage: 49 },
//         ],
//     },
//     {
//         id: "8",
//         title: "Will Biden run for re-election?",
//         category: "Politics",
//         isLive: true,
//         volume: 4200000,
//         outcomes: [
//             { label: "Yes", percentage: 39 },
//             { label: "No", percentage: 61 },
//         ],
//     },
//     {
//         id: "9",
//         title: "Will India pass new crypto regulations in 2026?",
//         category: "Politics",
//         isLive: false,
//         volume: 3100000,
//         outcomes: [
//             { label: "Yes", percentage: 44 },
//             { label: "No", percentage: 56 },
//         ],
//     },

//     // MIXED EXTRA
//     {
//         id: "10",
//         title: "Will Bitcoin ETF inflow exceed $10B this month?",
//         category: "Crypto",
//         isLive: true,
//         volume: 2800000,
//         outcomes: [
//             { label: "Yes", percentage: 57 },
//             { label: "No", percentage: 43 },
//         ],
//     },
//     {
//         id: "11",
//         title: "Will Real Madrid win Champions League?",
//         category: "Sports",
//         isLive: true,
//         volume: 6100000,
//         outcomes: [
//             { label: "Yes", percentage: 60 },
//             { label: "No", percentage: 40 },
//         ],
//     },
//     {
//         id: "12",
//         title: "Will global inflation drop below 3% in 2025?",
//         category: "Politics",
//         isLive: true,
//         volume: 3700000,
//         outcomes: [
//             { label: "Yes", percentage: 46 },
//             { label: "No", percentage: 54 },
//         ],
//     },

//     {
//         id: "c1",
//         title: "Will Bitcoin hit $120K in 2026?",
//         category: "Crypto",
//         isLive: true,
//         volume: 8200000,
//         outcomes: [{ label: "Yes", percentage: 65 }, { label: "No", percentage: 35 }],
//     },
//     {
//         id: "c2",
//         title: "Will Ethereum hit $5K this year?",
//         category: "Crypto",
//         isLive: true,
//         volume: 6100000,
//         outcomes: [{ label: "Yes", percentage: 58 }, { label: "No", percentage: 42 }],
//     },
//     {
//         id: "c3",
//         title: "Will Solana flip Ethereum market cap?",
//         category: "Crypto",
//         isLive: false,
//         volume: 2100000,
//         outcomes: [{ label: "Yes", percentage: 30 }, { label: "No", percentage: 70 }],
//     },
//     {
//         id: "c4",
//         title: "Will Dogecoin reach $1?",
//         category: "Crypto",
//         isLive: true,
//         volume: 5000000,
//         outcomes: [{ label: "Yes", percentage: 45 }, { label: "No", percentage: 55 }],
//     },
//     {
//         id: "c5",
//         title: "Will Bitcoin dominance exceed 60%?",
//         category: "Crypto",
//         isLive: false,
//         volume: 1800000,
//         outcomes: [{ label: "Yes", percentage: 52 }, { label: "No", percentage: 48 }],
//     },
//     {
//         id: "c6",
//         title: "Will ETH gas fees drop below $1?",
//         category: "Crypto",
//         isLive: true,
//         volume: 2400000,
//         outcomes: [{ label: "Yes", percentage: 40 }, { label: "No", percentage: 60 }],
//     },
//     {
//         id: "c7",
//         title: "Will a new crypto reach top 5?",
//         category: "Crypto",
//         isLive: true,
//         volume: 3200000,
//         outcomes: [{ label: "Yes", percentage: 48 }, { label: "No", percentage: 52 }],
//     },
//     {
//         id: "c8",
//         title: "Will XRP win SEC case?",
//         category: "Crypto",
//         isLive: true,
//         volume: 7300000,
//         outcomes: [{ label: "Yes", percentage: 67 }, { label: "No", percentage: 33 }],
//     },
//     {
//         id: "c9",
//         title: "Will crypto market cap hit $5T?",
//         category: "Crypto",
//         isLive: true,
//         volume: 9100000,
//         outcomes: [{ label: "Yes", percentage: 62 }, { label: "No", percentage: 38 }],
//     },
//     {
//         id: "c10",
//         title: "Will Binance remain #1 exchange?",
//         category: "Crypto",
//         isLive: true,
//         volume: 4300000,
//         outcomes: [{ label: "Yes", percentage: 70 }, { label: "No", percentage: 30 }],
//     },
//     {
//         id: "c11",
//         title: "Will US approve more crypto ETFs?",
//         category: "Crypto",
//         isLive: true,
//         volume: 5800000,
//         outcomes: [{ label: "Yes", percentage: 72 }, { label: "No", percentage: 28 }],
//     },
//     {
//         id: "c12",
//         title: "Will NFTs make a comeback?",
//         category: "Crypto",
//         isLive: false,
//         volume: 1900000,
//         outcomes: [{ label: "Yes", percentage: 50 }, { label: "No", percentage: 50 }],
//     },
//     {
//         id: "c13",
//         title: "Will Layer 2 dominate Ethereum?",
//         category: "Crypto",
//         isLive: true,
//         volume: 2600000,
//         outcomes: [{ label: "Yes", percentage: 66 }, { label: "No", percentage: 34 }],
//     },
//     {
//         id: "c14",
//         title: "Will crypto replace banks?",
//         category: "Crypto",
//         isLive: false,
//         volume: 1700000,
//         outcomes: [{ label: "Yes", percentage: 22 }, { label: "No", percentage: 78 }],
//     },
//     {
//         id: "c15",
//         title: "Will stablecoins surpass $500B supply?",
//         category: "Crypto",
//         isLive: true,
//         volume: 3000000,
//         outcomes: [{ label: "Yes", percentage: 60 }, { label: "No", percentage: 40 }],
//     },

//     // ================= SPORTS (15) =================
//     {
//         id: "s1",
//         title: "Will India win World Cup 2026?",
//         category: "Sports",
//         isLive: true,
//         volume: 8800000,
//         outcomes: [{ label: "Yes", percentage: 55 }, { label: "No", percentage: 45 }],
//     },
//     {
//         id: "s2",
//         title: "Will Messi win Ballon d'Or?",
//         category: "Sports",
//         isLive: true,
//         volume: 6000000,
//         outcomes: [{ label: "Yes", percentage: 49 }, { label: "No", percentage: 51 }],
//     },
//     {
//         id: "s3",
//         title: "Will Ronaldo retire this year?",
//         category: "Sports",
//         isLive: true,
//         volume: 3000000,
//         outcomes: [{ label: "Yes", percentage: 35 }, { label: "No", percentage: 65 }],
//     },
//     {
//         id: "s4",
//         title: "Will Real Madrid win UCL?",
//         category: "Sports",
//         isLive: true,
//         volume: 7000000,
//         outcomes: [{ label: "Yes", percentage: 61 }, { label: "No", percentage: 39 }],
//     },
//     {
//         id: "s5",
//         title: "Will IPL viewership break record?",
//         category: "Sports",
//         isLive: false,
//         volume: 2100000,
//         outcomes: [{ label: "Yes", percentage: 57 }, { label: "No", percentage: 43 }],
//     },

//     // add remaining sports (s6 → s15)
//     ...Array.from({ length: 10 }).map((_, i) => ({
//         id: `s${i + 6}`,
//         title: `Sports event prediction ${i + 6}`,
//         category: "Sports",
//         isLive: i % 2 === 0,
//         volume: 2000000 + i * 500000,
//         outcomes: [
//             { label: "Yes", percentage: 50 + (i % 10) },
//             { label: "No", percentage: 50 - (i % 10) },
//         ],
//     })),

//     // ================= POLITICS (15) =================
//     ...Array.from({ length: 15 }).map((_, i) => ({
//         id: `p${i + 1}`,
//         title: `Political prediction ${i + 1}`,
//         category: "Politics",
//         isLive: i % 2 === 0,
//         volume: 3000000 + i * 400000,
//         outcomes: [
//             { label: "Yes", percentage: 45 + (i % 10) },
//             { label: "No", percentage: 55 - (i % 10) },
//         ],
//     })),

//     // ================= TECH (15) =================
//     ...Array.from({ length: 15 }).map((_, i) => ({
//         id: `t${i + 1}`,
//         title: `Tech prediction ${i + 1}`,
//         category: "Tech",
//         isLive: i % 2 !== 0,
//         volume: 2500000 + i * 300000,
//         outcomes: [
//             { label: "Yes", percentage: 40 + (i % 15) },
//             { label: "No", percentage: 60 - (i % 15) },
//         ],
//     })),
// ]




// export const mockMarkets: MockMarket[] = [

//     // ✅ YES / NO
//     {
//         id: "yn1",
//         title: "Will Bitcoin hit $100K in 2026?",
//         category: "Crypto",
//         type: "yesno",
//         asset: "BTC",
//         isLive: true,
//         volume: 7200000,
//         outcomes: [
//             { label: "Yes", percentage: 62 },
//             { label: "No", percentage: 38 },
//         ],
//     },

//     // ✅ UP / DOWN
//     {
//         id: "ud1",
//         title: "BTC Up or Down Today?",
//         category: "Crypto",
//         type: "updown",
//         asset: "BTC",
//         isLive: true,
//         volume: 5000000,
//         outcomes: [
//             { label: "Up", percentage: 58 },
//             { label: "Down", percentage: 42 },
//         ],
//     },

//     // ✅ ABOVE / BELOW
//     {
//         id: "ab1",
//         title: "ETH above $3000?",
//         category: "Crypto",
//         type: "abovebelow",
//         asset: "ETH",
//         isLive: true,
//         volume: 4100000,
//         outcomes: [
//             { label: "Above", percentage: 55 },
//             { label: "Below", percentage: 45 },
//         ],
//     },

//     // ✅ RANGE
//     {
//         id: "r1",
//         title: "BTC price range today?",
//         category: "Crypto",
//         type: "range",
//         asset: "BTC",
//         isLive: false,
//         volume: 1900000,
//         outcomes: [
//             { label: "$60K-$65K", percentage: 40 },
//             { label: "$65K-$70K", percentage: 60 },
//         ],
//     },

//     // ✅ HIT PRICE
//     {
//         id: "h1",
//         title: "Will BTC hit $120K this year?",
//         category: "Crypto",
//         type: "hit",
//         asset: "BTC",
//         isLive: true,
//         volume: 8200000,
//         outcomes: [
//             { label: "Hit", percentage: 65 },
//             { label: "Not Hit", percentage: 35 },
//         ],
//     },
// ];



// Sample Market Data for All Types
// Import this and use with your MarketCard component
import { MockMarket } from "@/types";


// ✅ YES/NO MARKETS
export const yesNoMarkets: MockMarket[] = [
    {
        id: "btc-100k-2026",
        title: "Will Bitcoin hit $100K in 2026?",
        category: "Crypto",
        asset: "Bitcoin",
        type: "yesno",
        icon: "₿",
        isLive: true,
        volume: 7200000,
        outcomes: [
            { label: "Yes", percentage: 62 },
            { label: "No", percentage: 38 }
        ]
    },
    {
        id: "india-worldcup-2026",
        type: "yesno",
        title: "Will India win the World Cup 2026?",
        category: "Sports",
        icon: "B",
        isLive: true,
        volume: 8500000,
        outcomes: [
            { label: "Yes", percentage: 58 },
            { label: "No", percentage: 42 }
        ]
    },
    {
        id: "eth-3k-month",
        title: "Will Ethereum reach $3,000 this month?",
        category: "Crypto",
        asset: "Ethereum",
        type: "yesno",
        icon: "◆",
        isLive: true,
        volume: 4100000,
        outcomes: [
            { label: "Yes", percentage: 55 },
            { label: "No", percentage: 45 }
        ]
    },
    {
        id: "sol-200-may",
        title: "Will Solana cross $200 in May?",
        category: "Crypto",
        asset: "Solana",
        type: "yesno",
        icon: "◎",
        isLive: true,
        volume: 1900000,
        outcomes: [
            { label: "Yes", percentage: 48 },
            { label: "No", percentage: 52 }
        ]
    }
];

// 🔵 UP/DOWN MARKETS
export const upDownMarkets: MockMarket[] = [
    {
        id: "btc-updown-daily",
        title: "BTC Up or Down Daily",
        category: "Crypto",
        asset: "Bitcoin",
        type: "updown",
        icon: "₿",
        isLive: true,
        volume: 5000000,
        outcomes: [
            { label: "Up", percentage: 82 },
            { label: "Down", percentage: 18 }
        ]
    },
    {
        id: "eth-updown-daily",
        title: "ETH Up or Down Daily",
        category: "Crypto",
        asset: "Ethereum",
        type: "updown",
        icon: "◆",
        isLive: true,
        volume: 3500000,
        outcomes: [
            { label: "Up", percentage: 81 },
            { label: "Down", percentage: 19 }
        ]
    },
    {
        id: "xrp-updown-daily",
        title: "XRP Up or Down Daily",
        category: "Crypto",
        asset: "XRP",
        type: "updown",
        icon: "✕",
        isLive: true,
        volume: 2200000,
        outcomes: [
            { label: "Up", percentage: 65 },
            { label: "Down", percentage: 35 }
        ]
    }
];

// 🟣 ABOVE/BELOW MARKETS
export const aboveBelowMarkets: MockMarket[] = [
    {
        id: "btc-above-below-may5",
        title: "Bitcoin above ___ on May 5?",
        category: "Crypto",
        asset: "Bitcoin",
        type: "abovebelow",
        icon: "₿",
        isLive: true,
        volume: 5400000,
        outcomes: [
            { label: "66,000", percentage: 100 },
            { label: "68,000", percentage: 100 }
        ]
    },
    {
        id: "eth-above-below-may5",
        title: "Ethereum above ___ on May 5?",
        category: "Crypto",
        asset: "Ethereum",
        type: "abovebelow",
        icon: "◆",
        isLive: true,
        volume: 3800000,
        outcomes: [
            { label: "1,800", percentage: 100 },
            { label: "1,900", percentage: 100 }
        ]
    },
    {
        id: "fdv-above-below",
        title: "Billions FDV above ___ one day after launch?",
        category: "Crypto",
        asset: "FDV",
        type: "abovebelow",
        icon: "🅑",
        isLive: true,
        volume: 622000,
        outcomes: [
            { label: "$50M", percentage: 100 },
            { label: "$100M", percentage: 100 }
        ]
    }
];

// 🟡 PRICE RANGE MARKETS
export const priceRangeMarkets: MockMarket[] = [
    {
        id: "btc-price-range-may5",
        title: "Bitcoin price on May 5?",
        category: "Crypto",
        asset: "Bitcoin",
        type: "range",
        icon: "₿",
        isLive: true,
        volume: 6800000,
        outcomes: [
            { label: "80,000-82,000", percentage: 78 },
            { label: "78,000-80,000", percentage: 16 }
        ]
    },
    {
        id: "eth-price-range-may5",
        title: "Ethereum price on May 5?",
        category: "Crypto",
        asset: "Ethereum",
        type: "range",
        icon: "◆",
        isLive: true,
        volume: 5200000,
        outcomes: [
            { label: "2,300-2,400", percentage: 78 },
            { label: "2,400-2,500", percentage: 21 }
        ]
    },
    {
        id: "sol-price-range-may",
        title: "Solana price on May 1?",
        category: "Crypto",
        asset: "Solana",
        type: "range",
        icon: "◎",
        isLive: true,
        volume: 2100000,
        outcomes: [
            { label: "175-200", percentage: 60 },
            { label: "150-175", percentage: 30 }
        ]
    }
];

// 🔴 HIT PRICE MARKETS
export const hitPriceMarkets: MockMarket[] = [
    {
        id: "btc-hit-price-may",
        title: "What price will Bitcoin hit in May?",
        category: "Crypto",
        asset: "Bitcoin",
        type: "hit",
        icon: "₿",
        isLive: true,
        volume: 8500000,
        outcomes: [
            { label: "↑ 85,000", percentage: 62 },
            { label: "↓ 75,000", percentage: 51 }
        ]
    },
    {
        id: "eth-hit-price-may",
        title: "What price will Ethereum hit in May?",
        category: "Crypto",
        asset: "Ethereum",
        type: "hit",
        icon: "◆",
        isLive: true,
        volume: 6200000,
        outcomes: [
            { label: "↑ 2,400", percentage: 93 },
            { label: "↓ 2,200", percentage: 59 }
        ]
    },
    {
        id: "sol-hit-price-may",
        title: "What price will Solana hit in May?",
        category: "Crypto",
        asset: "Solana",
        type: "hit",
        icon: "◎",
        isLive: true,
        volume: 3800000,
        outcomes: [
            { label: "↑ 90", percentage: 66 },
            { label: "↓ 80", percentage: 65 }
        ]
    },
    {
        id: "xrp-hit-price-may",
        title: "What price will XRP hit in May?",
        category: "Crypto",
        asset: "XRP",
        type: "hit",
        icon: "✕",
        isLive: true,
        volume: 2500000,
        outcomes: [
            { label: "↑ 1.60", percentage: 30 },
            { label: "↓ 1.20", percentage: 23 }
        ]
    }
];

// 📊 ALL MARKETS COMBINED
export const allMarkets: MockMarket[] = [
    ...yesNoMarkets,
    ...upDownMarkets,
    ...aboveBelowMarkets,
    ...priceRangeMarkets,
    ...hitPriceMarkets
];

// 🔍 Helper Functions

/**
 * Get markets by type
 */
export function getMarketsByType(type: MockMarket['type']) {
    return allMarkets.filter(m => m.type === type);
}

/**
 * Get markets by category
 */
export function getMarketsByCategory(category: string) {
    console.log("category", category);
    return allMarkets.filter(m => m.category === category);
}

/**
 * Get markets by asset
 */
export function getMarketsByAsset(asset: string) {
    return allMarkets.filter(m => m.asset === asset);
}

/**
 * Get live markets
 */
export function getLiveMarkets() {
    return allMarkets.filter(m => m.isLive);
}

/**
 * Get trending markets (sorted by volume)
 */
export function getTrendingMarkets(limit = 10) {
    return [...allMarkets]
        .sort((a, b) => b.volume - a.volume)
        .slice(0, limit);
}

/**
 * Search markets
 */
export function searchMarkets(query: string) {
    const lowerQuery = query.toLowerCase();
    return allMarkets.filter(m =>
        m.title.toLowerCase().includes(lowerQuery) ||
        m.category.toLowerCase().includes(lowerQuery) ||
        m.asset?.toLowerCase().includes(lowerQuery)
    );
}

/**
 * Get market by ID
 */
export function getMarketById(id: string) {
    return allMarkets.find(m => m.id === id);
}



