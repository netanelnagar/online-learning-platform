import React, { useRef, useState } from "react";

interface TabProps {
    className?: string;
    tabs: { label: string; content: React.ReactNode }[];
}

export const Tabs: React.FC<TabProps> = ({ tabs, className }) => {
    const [activeTab, setActiveTab] = useState(0);
    const tabsContainerRef = useRef<HTMLDivElement | null>(null);

  

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    if (tabsContainerRef.current) {
      const tab = tabsContainerRef.current.children[index] as HTMLElement;
      tab?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  };
    return (
        <div className={`${className}`}>
            <div className="flex items-center gap-2">
                <div
                    ref={tabsContainerRef}
                    className="flex gap-2 overflow-x-auto scrollbar-hide"
                >
                    {tabs.map((tab, index) => (
                        <button
                            key={index}
                            className={`px-4 py-2 whitespace-nowrap ${activeTab === index
                                    ? "text-primary border-b-2 border-primary"
                                    : "text-gray-500"
                                }`}
                            onClick={() => handleTabClick(index)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>
            <div className="relative mt-4 overflow-x-hidden">
                <div
                    className="flex transition-transform duration-300"
                    style={{ transform: `translateX(-${activeTab * 100}%)` }}
                >
                    {tabs.map((tab, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 w-full px-4 py-6"
                        >
                            {tab.content}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
