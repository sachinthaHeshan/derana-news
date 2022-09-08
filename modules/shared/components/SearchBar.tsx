interface SearchBarProps {
  className?: string;
}

export const SearchBar = ({ className }: SearchBarProps) => (
  <div className={`flex rounded-md bg-white-alpha-30 px-4 py-1.5 ${className}`}>
    <input placeholder="Search here..." className="bg-transparent  outline-none text-white" type="text" />
    <img src="/images/search-Icon.svg" alt="" />
  </div>
);
