
import React, { createContext, useContext, useState } from "react";

type TabContextType = {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export const TabContext = createContext<TabContextType | undefined>(undefined);

export const TabProvider = ({ children }: { children: React.ReactNode }) => {
    const [activeTab, setActiveTab] = useState<string>("all");

    return (
        <TabContext.Provider value={{ activeTab, setActiveTab }}>
            {children}
        </TabContext.Provider>
    )
}

//custome hook to use the tab context
export const useTab = () => {

    const context = useContext(TabContext);

    if (!context) {
        throw new Error("useTab must be used within a TabProvider");
    }

    return context;
}

