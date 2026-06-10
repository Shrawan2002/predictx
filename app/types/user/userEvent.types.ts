// ── Asset (crypto coin info) ───────────────────────────────
export interface Asset {
    id: number;
    symbol: string;   // "BTC", "ETH"
    name: string;   // "Bitcoin", "Ethereum"
    icon: string;   // full URL from coingecko
}

// ── userEvent type────────────
export interface UserEvent {
    id: number;
    slug: string;
    title: string;
    description: string;
    image: string | null;
    imageUrl: string | null;
    categoryId: number;
    subcategoryId: number;
    eventType: "up-down" | "above-below" | "price-range" | "hit-price";
    assetId: number;
    quoteCurrency: string;   // "USD"
    targetPrice: string | null;
    rangeLow: string | null;
    rangeHigh: string | null;
    referencePrice: string | null;
    direction: "up" | "down" | null;
    tradingStartsAt: string;
    tradingEndsAt: string;
    resolvesAt: string;
    bParam: string;
    qYes: string;
    qNo: string;
    initialSubsidy: string;
    feeBps: number;
    minTradeAmount: string;
    maxTradeAmount: string;
    prizePool: string | null;
    totalParticipant: string;
    currentParticipant: string;
    status: number;
    statusLabel: string;    // "active" | "pending" | "ended"
    isFeatured: number;    // 0 or 1
    isPublic: number;    // 0 or 1
    isFeaturedBool: boolean;
    isPublicBool: boolean;
    totalVolume: string;
    totalTrades: number;
    uniqueTraders: number;
    lastTradeAt: string | null;
    createdByAdminId: number;
    outcome: string | null;
    resolvedAt: string | null;
    createdAt: string;
    updatedAt: string;

    // Joined
    asset: Asset;
}

// ── API wrapper ────────────────────────────────────────────
export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

export interface SubCategory {
    id: number;
    name: string;
    slug: string;
    categoryId: number;
    createdAt: string;
    updatedAt: string;
    icon?: string; //change in database
}

export interface Category {
    id: number;
    name: string;
    slug: string;
    icon: string;
    createdAt: string;
    updatedAt: string;
    subCategories?: SubCategory[];
}

export interface UserEventStoreState {
    userEvents: UserEvent[];
    categories: Category[];
    subCategories: SubCategory[];
    loading: boolean;
    error: string | null;
    search: string;
    selectedCategoryId: number | null;
    selectedSubCategoryId: number | null;
    selectedEventType: string;
    clearError: () => void;
    getAllSubCategories: () => Promise<void>;
    getAllUserEvents: () => Promise<void>;
    fetchCategories: () => Promise<void>;
    setSearch: (search: string) => void;
    setSelectedEventType: (type: string) => void;
    setSelectedCategoryId: (categoryId: number | null) => void;
    setSelectedSubCategoryId: (subcategoryId: number | null) => void;
}

