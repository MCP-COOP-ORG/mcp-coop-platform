import React from "react";

export interface ProfileCategoriesProps {
  categories?: string[];
  className?: string;
}

export const ProfileCategories: React.FC<ProfileCategoriesProps> = ({ 
  categories = [], 
  className = "" 
}) => {
  if (!categories.length) return null;


  return (
    <div className={`truncate text-[14px] font-normal tracking-wide min-w-0 ${className}`}>
      {categories.map((cat, index) => (
        <React.Fragment key={`${index}-${cat}`}>
          <span>{cat}</span>
          {index < categories.length - 1 && (
            <span className="opacity-50 mx-2 select-none">|</span>
          )}
        </React.Fragment>      
      ))}
    </div>
  );
};
