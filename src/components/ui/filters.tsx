import { Checkbox } from "./checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover";
import { cn } from "../../lib/utils";
import {
  Calendar,
  Check,
  Tag,
  X,
  Briefcase,
  Building,
  Building2,
  Globe,
  Search,
  Code,
  Folder,
  Layers,
  Wrench
} from "lucide-react";
import { Dispatch, SetStateAction, useRef, useState, useEffect } from "react";
import { Button } from "./button";
import { AnimatePresence, motion } from "motion/react";

interface AnimateChangeInHeightProps {
  children: React.ReactNode;
  className?: string;
}

export const AnimateChangeInHeight: React.FC<AnimateChangeInHeightProps> = ({
  children,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState<number | "auto">("auto");

  useEffect(() => {
    if (containerRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        const observedHeight = entries[0].contentRect.height;
        setHeight(observedHeight);
      });

      resizeObserver.observe(containerRef.current);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, []);

  return (
    <motion.div
      className={cn(className, "overflow-hidden")}
      style={{ height }}
      animate={{ height }}
      transition={{ duration: 0.1, dampping: 0.2, ease: "easeIn" }}
    >
      <div ref={containerRef}>{children}</div>
    </motion.div>
  );
};

export enum FilterType {
  DISCIPLINE = "Discipline",
  INDUSTRY = "Industry",
  COMPANY = "Company",
  MARKET = "Market",
  YEAR = "Year",
  METHODS = "Methods",
  STACK = "Stack",
  PROJECT_TYPE = "Project Type",
  WORK_TYPE = "Work Type",
}

export enum FilterOperator {
  IS = "is",
  IS_NOT = "is not",
  IS_ANY_OF = "is any of",
  INCLUDE = "include",
  DO_NOT_INCLUDE = "do not include",
  INCLUDE_ALL_OF = "include all of",
  INCLUDE_ANY_OF = "include any of",
  EXCLUDE_ALL_OF = "exclude all of",
  EXCLUDE_IF_ANY_OF = "exclude if any of",
  BEFORE = "before",
  AFTER = "after",
}

export enum Discipline {
  UX_RESEARCH = "UX Research",
  PRODUCT_DESIGN = "Product Design",
  AI_AUTOMATION = "AI Automation",
  PRODUCT_MANAGEMENT = "Product Management",
  HUMAN_FACTORS = "Human Factors",
}

export enum Industry {
  AUTOMOTIVE = "Automotive",
  ON_DEMAND_DELIVERY = "On-Demand Delivery",
  ECOMMERCE = "eCommerce",
  CONSUMER_APPS = "Consumer Apps",
  CONSUMER_ELECTRONICS = "Consumer Electronics",
  B2B_SAAS = "B2B SaaS",
  CONSULTING = "Consulting",
  MEDIA = "Media",
}

export enum Company {
  PSA = "PSA Peugeot Citroën",
  RENAULT = "Renault",
  GLOVO = "Glovo",
  HP = "HP",
  VD = "V+D",
  MOMENTUM = "Momentum",
  SOUNDJOURNEY = "SoundJourney",
  AAB = "AAB Media",
  CROWN_JEWEL = "Crown Jewel Marketing",
  WEOP = "WEOP",
}

export enum Market {
  GLOBAL = "Global",
  EUROPE = "Europe",
  FRANCE = "France",
  SPAIN = "Spain",
  USA = "USA",
  MULTIPLE = "Multiple",
}

export enum Year {
  Y2025 = "2025",
  Y2024 = "2024",
  Y2023 = "2023",
  Y2022 = "2022",
  Y2021 = "2021",
  Y2018 = "2018",
  Y2016 = "2016",
}

export enum Methods {
  USER_INTERVIEWS = "User Interviews",
  USABILITY_TESTING = "Usability Testing",
  CARD_SORTING = "Card Sorting",
  SURVEYS = "Surveys",
  TREE_TESTING = "Tree testing",
  EDA = "EDA",
  CONTEXTUAL_INQUIRY = "Contextual inquiry",
  COMPETITIVE_ANALYSIS = "Competitive analysis",
  CONCEPT_TESTING = "Concept testing",
  PROTOTYPE_TESTING = "Prototype testing",
}

export enum Stack {
  FIGMA = "Figma",
  N8N = "n8n",
  MAKE = "Make",
  GPT = "GPT",
  WHISPER = "Whisper",
  TYPEFORM = "Typeform",
  AIRTABLE = "Airtable",
  GOOGLE_SHEETS = "Google Sheets",
  HEYGEN = "HeyGen",
  REACT = "React",
  SPOTIFY_API = "Spotify API",
}

export enum ProjectType {
  RESEARCH = "Research",
  DESIGN = "Design",
  AUTOMATION = "Automation",
  DISCOVERY = "Discovery",
  EVALUATIVE = "Evaluative",
}

export enum WorkType {
  IN_HOUSE = "in-house",
  FREELANCE = "freelance",
  SIDE_PROJECT = "side-project",
}

export type FilterOption = {
  name: string;
  icon: React.ReactNode | undefined;
  label?: string;
};

export type Filter = {
  id: string;
  type: FilterType;
  operator: FilterOperator;
  value: string[];
};

const FilterIcon = ({
  type,
}: {
  type: FilterType | string;
}) => {
  switch (type) {
    case FilterType.DISCIPLINE:
      return <Layers className="size-3.5" />;
    case FilterType.INDUSTRY:
      return <Building className="size-3.5" />;
    case FilterType.COMPANY:
      return <Building2 className="size-3.5" />;
    case FilterType.MARKET:
      return <Globe className="size-3.5" />;
    case FilterType.YEAR:
      return <Calendar className="size-3.5" />;
    case FilterType.METHODS:
      return <Search className="size-3.5" />;
    case FilterType.STACK:
      return <Code className="size-3.5" />;
    case FilterType.PROJECT_TYPE:
      return <Folder className="size-3.5" />;
    case FilterType.WORK_TYPE:
      return <Briefcase className="size-3.5" />;
    default:
      return <Tag className="size-3.5" />;
  }
};

export const filterViewOptions: FilterOption[][] = [
  [
    { name: FilterType.DISCIPLINE, icon: <FilterIcon type={FilterType.DISCIPLINE} /> },
    { name: FilterType.PROJECT_TYPE, icon: <FilterIcon type={FilterType.PROJECT_TYPE} /> },
    { name: FilterType.WORK_TYPE, icon: <FilterIcon type={FilterType.WORK_TYPE} /> },
  ],
  [
    { name: FilterType.INDUSTRY, icon: <FilterIcon type={FilterType.INDUSTRY} /> },
    { name: FilterType.COMPANY, icon: <FilterIcon type={FilterType.COMPANY} /> },
    { name: FilterType.MARKET, icon: <FilterIcon type={FilterType.MARKET} /> },
  ],
  [
    { name: FilterType.METHODS, icon: <FilterIcon type={FilterType.METHODS} /> },
    { name: FilterType.STACK, icon: <FilterIcon type={FilterType.STACK} /> },
    { name: FilterType.YEAR, icon: <FilterIcon type={FilterType.YEAR} /> },
  ],
];

const createOptions = (enumObj: any): FilterOption[] => 
  Object.values(enumObj).map((val) => ({
    name: val as string,
    icon: <FilterIcon type={val as string} />,
  }));

export const filterViewToFilterOptions: Record<FilterType, FilterOption[]> = {
  [FilterType.DISCIPLINE]: createOptions(Discipline),
  [FilterType.INDUSTRY]: createOptions(Industry),
  [FilterType.COMPANY]: createOptions(Company),
  [FilterType.MARKET]: createOptions(Market),
  [FilterType.YEAR]: createOptions(Year),
  [FilterType.METHODS]: createOptions(Methods),
  [FilterType.STACK]: createOptions(Stack),
  [FilterType.PROJECT_TYPE]: createOptions(ProjectType),
  [FilterType.WORK_TYPE]: createOptions(WorkType),
};

const filterOperators = ({
  filterType,
  filterValues,
}: {
  filterType: FilterType;
  filterValues: string[];
}) => {
  switch (filterType) {
    case FilterType.DISCIPLINE:
    case FilterType.INDUSTRY:
    case FilterType.COMPANY:
    case FilterType.MARKET:
    case FilterType.PROJECT_TYPE:
    case FilterType.WORK_TYPE:
      if (Array.isArray(filterValues) && filterValues.length > 1) {
        return [FilterOperator.IS_ANY_OF, FilterOperator.IS_NOT];
      } else {
        return [FilterOperator.IS, FilterOperator.IS_NOT];
      }
    case FilterType.METHODS:
    case FilterType.STACK:
      if (Array.isArray(filterValues) && filterValues.length > 1) {
        return [
          FilterOperator.INCLUDE_ANY_OF,
          FilterOperator.INCLUDE_ALL_OF,
          FilterOperator.EXCLUDE_ALL_OF,
          FilterOperator.EXCLUDE_IF_ANY_OF,
        ];
      } else {
        return [FilterOperator.INCLUDE, FilterOperator.DO_NOT_INCLUDE];
      }
    case FilterType.YEAR:
      return [FilterOperator.IS, FilterOperator.IS_NOT, FilterOperator.BEFORE, FilterOperator.AFTER];
    default:
      return [];
  }
};

const FilterOperatorDropdown = ({
  filterType,
  operator,
  filterValues,
  setOperator,
}: {
  filterType: FilterType;
  operator: FilterOperator;
  filterValues: string[];
  setOperator: (operator: FilterOperator) => void;
}) => {
  const operators = filterOperators({ filterType, filterValues });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-transparent hover:bg-gray-100 px-2 py-1.5 text-gray-600 hover:text-gray-900 transition shrink-0 border-r border-gray-200">
        {operator}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-fit min-w-fit">
        {operators.map((operator) => (
          <DropdownMenuItem
            key={operator}
            onClick={() => setOperator(operator)}
          >
            {operator}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const FilterValueCombobox = ({
  filterType,
  filterValues,
  setFilterValues,
}: {
  filterType: FilterType;
  filterValues: string[];
  setFilterValues: (filterValues: string[]) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [commandInput, setCommandInput] = useState("");
  const commandInputRef = useRef<HTMLInputElement>(null);
  const nonSelectedFilterValues = filterViewToFilterOptions[filterType]?.filter(
    (filter) => !filterValues.includes(filter.name)
  );
  return (
    <Popover
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        if (!open) {
          setTimeout(() => {
            setCommandInput("");
          }, 200);
        }
      }}
    >
      <PopoverTrigger
        className="rounded-none px-2 py-1.5 bg-transparent hover:bg-gray-100 transition text-gray-600 hover:text-gray-900 shrink-0 border-r border-gray-200"
      >
        <div className="flex gap-1.5 items-center">
          <div className="flex items-center flex-row -space-x-1.5">
            <AnimatePresence mode="popLayout">
              {filterValues?.slice(0, 3).map((value) => (
                <motion.div
                  key={value}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <FilterIcon type={value} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          {filterValues?.length === 1
            ? filterValues?.[0]
            : `${filterValues?.length} selected`}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <AnimateChangeInHeight>
          <Command>
            <CommandInput
              placeholder={filterType}
              className="h-9"
              value={commandInput}
              onValueChange={setCommandInput}
              ref={commandInputRef}
            />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {filterValues.map((value) => (
                  <CommandItem
                    key={value}
                    className="group flex gap-2 items-center"
                    onSelect={() => {
                      setFilterValues(filterValues.filter((v) => v !== value));
                      setTimeout(() => {
                        setCommandInput("");
                      }, 200);
                      setOpen(false);
                    }}
                  >
                    <Checkbox checked={true} />
                    <FilterIcon type={value} />
                    {value}
                  </CommandItem>
                ))}
              </CommandGroup>
              {nonSelectedFilterValues?.length > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup>
                    {nonSelectedFilterValues.map((filter: FilterOption) => (
                      <CommandItem
                        className="group flex gap-2 items-center"
                        key={filter.name}
                        value={filter.name}
                        onSelect={(currentValue: string) => {
                          const actualValue = nonSelectedFilterValues.find(f => f.name.toLowerCase() === currentValue)?.name || currentValue;
                          setFilterValues([...filterValues, actualValue]);
                          setTimeout(() => {
                            setCommandInput("");
                          }, 200);
                          setOpen(false);
                        }}
                      >
                        <Checkbox
                          checked={false}
                          className="opacity-0 group-data-[selected=true]:opacity-100"
                        />
                        {filter.icon}
                        <span className="text-accent-foreground">
                          {filter.name}
                        </span>
                        {filter.label && (
                          <span className="text-muted-foreground text-xs ml-auto">
                            {filter.label}
                          </span>
                        )}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </AnimateChangeInHeight>
      </PopoverContent>
    </Popover>
  );
};

export default function Filters({
  filters,
  setFilters,
}: {
  filters: Filter[];
  setFilters: Dispatch<SetStateAction<Filter[]>>;
}) {
  return (
    <div className="flex gap-2 flex-wrap">
      {filters
        .filter((filter) => filter.value?.length > 0)
        .map((filter) => (
          <div key={filter.id} className="flex items-center text-xs rounded-full border border-gray-200 bg-white/70 backdrop-blur-md shadow-sm overflow-hidden">
            <div className="flex gap-1.5 shrink-0 bg-gray-50/50 px-3 py-1.5 items-center font-medium text-gray-700 border-r border-gray-200">
              <FilterIcon type={filter.type} />
              {filter.type}
            </div>
            <FilterOperatorDropdown
              filterType={filter.type}
              operator={filter.operator}
              filterValues={filter.value}
              setOperator={(operator) => {
                setFilters((prev) =>
                  prev.map((f) => (f.id === filter.id ? { ...f, operator } : f))
                );
              }}
            />
            <FilterValueCombobox
              filterType={filter.type}
              filterValues={filter.value}
              setFilterValues={(filterValues) => {
                setFilters((prev) =>
                  prev.map((f) =>
                    f.id === filter.id ? { ...f, value: filterValues } : f
                  )
                );
              }}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setFilters((prev) => prev.filter((f) => f.id !== filter.id));
              }}
              className="bg-transparent rounded-none h-auto py-1.5 px-2 text-gray-400 hover:text-red-600 hover:bg-red-50 transition shrink-0"
            >
              <X className="size-3.5" />
            </Button>
          </div>
        ))}
    </div>
  );
}
