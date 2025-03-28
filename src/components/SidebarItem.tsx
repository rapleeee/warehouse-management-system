import Link from "next/link";
import React, { ReactNode } from "react";

interface SidebarItemProps {
    icon: ReactNode;
    text: string;
    isOpen: boolean;
    href: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, text, isOpen, href }) => {
    return (
        <li>
            <Link 
                href={href} 
                className="flex items-center gap-4 p-3 hover:bg-neutral-700 rounded-md transition-all"
            >
                {icon}
                {isOpen && <span className="ml-3">{text}</span>}
            </Link>
        </li>
    );
};

export default SidebarItem;
