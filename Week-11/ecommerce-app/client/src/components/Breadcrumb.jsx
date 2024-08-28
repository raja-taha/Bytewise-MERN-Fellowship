import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();

  const generateBreadcrumbs = () => {
    const paths = location.pathname.split("/").filter((path) => path);

    const formatBreadcrumbName = (path) => {
      return path
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    };

    const breadcrumbs = paths.map((path, index) => {
      const href = `/${paths.slice(0, index + 1).join("/")}`;

      return {
        name: formatBreadcrumbName(path),
        href,
      };
    });

    return [{ name: "Home", href: "/" }, ...breadcrumbs];
  };

  const items = generateBreadcrumbs();

  return (
    <nav className="text-sm mb-4" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {items.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {index !== items.length - 1 ? (
              <>
                <Link
                  to={item.href}
                  className="text-gray-700 hover:text-blue-600 inline-flex items-center"
                >
                  {item.name}
                </Link>
                <span className="mx-2 text-gray-400">/</span>
              </>
            ) : (
              <span className="text-gray-900 font-bold">{item.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
export default Breadcrumb;
