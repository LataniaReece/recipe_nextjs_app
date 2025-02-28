"use client";

const categories = [
  { label: "Easy", value: "easy" },
  { label: "Breakfast", value: "breakfast" },
  { label: "Lunch", value: "lunch" },
  { label: "Dinner", value: "dinner" },
  { label: "Snacks", value: "snack" },
  { label: "Desserts", value: "desserts" },
];

interface CategoriesSearchButtonsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoriesSearchButtons: React.FC<CategoriesSearchButtonsProps> = ({
  activeCategory,
  onCategoryChange,
}) => {
  return (
    <div className="flex gap-3 flex-wrap mt-5 md:mt-10 px-4 md:px-6">
      {categories.map((category) => (
        <button
          key={category.value}
          className={`border border-textColorLight text-sm py-1 px-2 md:py-2 md:px-4 rounded-full transition duration-150 ${
            activeCategory === category.value
              ? "bg-textColor text-white"
              : "text-textColorLighter border-textColorLighter hover:bg-textColor hover:text-white hover:border-textColor"
          }`}
          onClick={() => onCategoryChange(category.value)}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
};

export default CategoriesSearchButtons;
