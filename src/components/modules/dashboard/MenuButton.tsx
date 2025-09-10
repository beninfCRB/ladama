function MenuButton({
  isActive,
  label,
  icon: Icon,
  isExpanded,
  isMobile,
  onClick,
}: {
  isActive: boolean;
  label: string;
  icon: React.ElementType;
  onClick: () => void;
  isExpanded?: boolean;
  isMobile?: boolean;
}) {
  return (
    <button
      className={`w-full flex items-center ${
        isExpanded || isMobile ? "justify-start px-3" : "justify-center"
      } h-12 rounded-lg transition-colors ${
        isActive
          ? "bg-blue-50 text-[#f9b128] hover:bg-blue-100"
          : "text-gray-50 hover:text-[#f9b128] hover:bg-gray-50"
      }`}
      onClick={onClick}
    >
      <Icon className="w-5 h-5" />
      {(isExpanded || isMobile) && (
        <span className="ml-3 text-sm font-medium">{label}</span>
      )}
    </button>
  );
}

export default MenuButton;
