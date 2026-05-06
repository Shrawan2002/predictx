// // export type MarketCategory = "crypto" | "sports" | "politics";

// // export interface Outcome {
// //     label: string;
// //     price: number;
// // }

// // export interface Market {
// //     id: string;
// //     title: string;
// //     category: MarketCategory;
// //     outcomes: Outcome[];
// //     volume: number;
// //     isLive: boolean;
// // }



// export type MarketCategory = "crypto" | "sports" | "politics";

// export interface Outcome {
//     id: string;
//     label: string;
//     price: number; // probability (0-1)
//     change24h?: number; // 🔥 new
// }

// export interface Market {
//     id: string;
//     title: string;
//     category: MarketCategory;

//     outcomes: Outcome[];

//     volume: number;
//     liquidity?: number; // 🔥 important for real feel

//     isLive: boolean;

//     endTime?: string; // 🔥 countdown timer

//     participants?: number; // 🔥 social proof

//     createdAt?: string;
// }

export type MarketType = "updown" | "abovebelow" | "range" | "hit" | "yesno";

export interface Outcome {
    label: string;
    percentage: number;
}

export interface MockMarket {
    id: string;
    title: string;
    category: string;
    type: MarketType;
    asset?: string;
    volume: number;
    outcomes: Outcome[];
    isLive: boolean;
}