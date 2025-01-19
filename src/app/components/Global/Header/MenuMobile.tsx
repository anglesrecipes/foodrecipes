import React from "react";
import Link from "next/link";
import { getMenuByName, MenuItem } from "@/services/menus";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const hasChildItems = (
  item: MenuItem
): item is MenuItem & { childItems: { nodes: MenuItem[] } } => {
  return !!item.childItems && item.childItems.nodes.length > 0;
};

const cleanCategoryPath = (path: string): string => {
  if (path.startsWith("/category/")) {
    return "/" + path.split("/").slice(2).join("/");
  }
  return path;
};

const MenuItemComponent = ({ item }: { item: MenuItem }) => {
  const rawHref =
    item.path ||
    item.url ||
    item.uri ||
    `/${item.label.toLowerCase().replace(/\s+/g, "-")}`;
  const href = cleanCategoryPath(rawHref);

  return (
    <li className="relative group no-last-gap">
      <Link
        href={href}
        className={`font-semibold text-white hover:text-amber-500 uppercase transition-all text-md py-[19px]`}
      >
        {item.label}
        {hasChildItems(item) && (
          <MdOutlineKeyboardArrowDown className="inline-block size-5 relative -top-[1px] -ml-0.5 -mr-1" />
        )}
      </Link>
      {hasChildItems(item) && (
        <ul
          className={`absolute left-0 mt-[15px] min-w-max bg-gray-800 shadow hidden group-hover:block z-40`}
        >
          {item.childItems.nodes.map((childItem: MenuItem) => (
            <li key={childItem.id}>
              <Link
                href={cleanCategoryPath(
                  childItem.path ||
                    childItem.url ||
                    childItem.uri ||
                    `/${childItem.label.toLowerCase().replace(/\s+/g, "-")}`
                )}
                className={`block text-white hover:text-amber-500 text-sm py-2 px-3 border-b-[1px] border-slate-200 uppercase font-semibold`}
              >
                {childItem.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default async function Menu() {
  const menuItems = await getMenuByName("Primary");

  if (!menuItems || typeof menuItems === "string") {
    return <div>ADD A MENU</div>;
  }

  const topLevelItems: MenuItem[] = menuItems.filter((item: MenuItem) => !item.parentId);

  return (
    <nav className="hidden lg:block">
      <ul className="flex justify-center items-center gap-5">
        {topLevelItems.map((item: MenuItem) => (
          <MenuItemComponent key={item.id} item={item} />
        ))}
      </ul>
    </nav>
  );
}