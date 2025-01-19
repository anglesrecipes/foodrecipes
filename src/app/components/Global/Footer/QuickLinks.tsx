import React from "react";
import Link from "next/link";
import { getMenuByName, MenuItem } from "@/services/menus";
import { FaCaretRight } from "react-icons/fa";

const cleanCategoryPath = (path: string): string => {
  return path.startsWith("/category/")
    ? "/" + path.split("/").slice(2).join("/")
    : path;
};

const MenuItemComponent = ({ item }: { item: MenuItem }) => {
  const rawHref =
    item.path ||
    item.url ||
    item.uri ||
    `/${item.label.toLowerCase().replace(/\s+/g, "-")}`;
  const href = cleanCategoryPath(rawHref);

  return (
    <li className="mb-2">
      <Link
        href={href}
        className="text-slate-700 font-semibold text-md hover:text-gray-900 transition-all"
      >
        <FaCaretRight className="inline-block size-4 text-amber-500 relative -top-[1px]" />
        {item.label}
      </Link>
    </li>
  );
};

const QuickLinks = async () => {
  const menuItems = await getMenuByName("Quick Links");

  if (!menuItems) {
    return <div>ADD A MENU</div>;
  }

  if (typeof menuItems === "string") {
    return <div>{menuItems}</div>;
  }

  // Specify the type of 'menuItems' instead of using 'any'
  const topLevelItems: MenuItem[] = menuItems.filter((item: MenuItem) => !item.parentId);

  return (
    <ul>
      {topLevelItems.map((item: MenuItem) => (
        <MenuItemComponent key={item.id} item={item} />
      ))}
    </ul>
  );
};

export default QuickLinks;