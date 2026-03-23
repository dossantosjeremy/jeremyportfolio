"use client";

import { Button } from "./button";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover";
import { cn } from "../../lib/utils";
import { ListFilter } from "lucide-react";
import { nanoid } from "nanoid";
import * as React from "react";
import { AnimateChangeInHeight } from "./filters";
import Filters from "./filters";
import {
  Filter,
  FilterOperator,
  FilterOption,
  FilterType,
  filterViewOptions,
  filterViewToFilterOptions,
} from "./filters";

export function WorkFilters({
  filters,
  setFilters,
}: {
  filters: Filter[];
  setFilters: React.Dispatch<React.SetStateAction<Filter[]>>;
}) {
  const [open, setOpen] = React.useState(false);
  const [selectedView, setSelectedView] = React.useState<FilterType | null>(
    null
  );
  const [commandInput, setCommandInput] = React.useState("");
  const commandInputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="flex gap-2 flex-wrap items-center mb-8">
      <Filters filters={filters} setFilters={setFilters} />
      {filters.filter((filter) => filter.value?.length > 0).length > 0 && (
        <Button
          variant="ghost"
          size="sm"
          className="transition group h-8 text-xs items-center rounded-full text-gray-500 hover:text-gray-900"
          onClick={() => setFilters([])}
        >
          Clear
        </Button>
      )}
      <Popover
        open={open}
        onOpenChange={(open) => {
          setOpen(open);
          if (!open) {
            setTimeout(() => {
              setSelectedView(null);
              setCommandInput("");
            }, 200);
          }
        }}
      >
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            size="sm"
            className="transition group h-8 text-xs items-center rounded-full flex gap-1.5 border-dashed border-gray-300 hover:border-gray-400 bg-white/50 backdrop-blur-sm"
          >
            <ListFilter className="size-3.5 shrink-0 transition-all text-gray-500 group-hover:text-gray-900" />
            <span className="text-gray-600 group-hover:text-gray-900">Add Filter</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <AnimateChangeInHeight>
            <Command>
              <CommandInput
                placeholder={selectedView ? selectedView : "Filter..."}
                className="h-9"
                value={commandInput}
                onValueChange={setCommandInput}
                ref={commandInputRef}
              />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                {selectedView ? (
                  <CommandGroup>
                    {filterViewToFilterOptions[selectedView].map(
                      (filter: FilterOption) => (
                        <CommandItem
                          className="group text-muted-foreground flex gap-2 items-center"
                          key={filter.name}
                          value={filter.name}
                          onSelect={(currentValue) => {
                            const actualValue = filterViewToFilterOptions[selectedView].find(f => f.name.toLowerCase() === currentValue)?.name || currentValue;
                            setFilters((prev) => [
                              ...prev,
                              {
                                id: nanoid(),
                                type: selectedView,
                                operator: FilterOperator.IS,
                                value: [actualValue],
                              },
                            ]);
                            setTimeout(() => {
                              setSelectedView(null);
                              setCommandInput("");
                            }, 200);
                            setOpen(false);
                          }}
                        >
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
                      )
                    )}
                  </CommandGroup>
                ) : (
                  filterViewOptions.map(
                    (group: FilterOption[], index: number) => (
                      <React.Fragment key={index}>
                        <CommandGroup>
                          {group.map((filter: FilterOption) => (
                            <CommandItem
                              className="group text-muted-foreground flex gap-2 items-center"
                              key={filter.name}
                              value={filter.name}
                              onSelect={(currentValue) => {
                                const actualValue = Object.values(FilterType).find(v => v.toLowerCase() === currentValue) as FilterType || currentValue;
                                setSelectedView(actualValue);
                                setCommandInput("");
                                commandInputRef.current?.focus();
                              }}
                            >
                              {filter.icon}
                              <span className="text-accent-foreground">
                                {filter.name}
                              </span>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                        {index < filterViewOptions.length - 1 && (
                          <CommandSeparator />
                        )}
                      </React.Fragment>
                    )
                  )
                )}
              </CommandList>
            </Command>
          </AnimateChangeInHeight>
        </PopoverContent>
      </Popover>
    </div>
  );
}
