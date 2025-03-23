"use client";

import { Command as CommandPrimitive } from "cmdk";
import {
  KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import { cn } from "@/src/lib/utils";
import { CommandEmpty } from "../../ui/command";
import { TransactionOption } from "../../../helpers/searchComboxOptionExpander";
import { Command, CommandGroup, CommandItem, CommandList } from "./command";
import { GroupOption, QuickFindAndMatchComboBoxProps } from "./types";
import { removePickedOption, transToGroupOption, useDebounce } from "./utils";
import { useReconciliation } from "@/src/context/ReconciliationProvider";
import { SearchIcon } from "@/src/components/Icon/Icons";

export interface QuickFindAndMatchComboBoxRef {
  selectedValue: TransactionOption | null;
  input: HTMLInputElement;
  focus: () => void;
  reset: () => void;
}

const QuickFindAndMatchComboBox = ({
  value,
  onChange,
  placeholder,
  defaultOptions: arrayDefaultOptions = [],
  options: arrayOptions,
  delay,
  onSearch,
  onSearchSync,
  loadingIndicator,
  emptyIndicator,
  disabled,
  groupBy,
  className,
  selectFirstItem = true,
  creatable = false,
  triggerSearchOnFocus = false,
  commandProps,
  inputProps,
  onConfirm,
}: QuickFindAndMatchComboBoxProps) => {
  const { isMatching } = useReconciliation();
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [onScrollbar, setOnScrollbar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [selected, setSelected] = useState<TransactionOption | null>(
    value || null
  );
  const [options, setOptions] = useState<GroupOption>(
    transToGroupOption(arrayDefaultOptions, groupBy)
  );
  const [inputValue, setInputValue] = useState("");
  const debouncedSearchTerm = useDebounce(inputValue, delay || 500);

  const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      inputRef.current &&
      !inputRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
      inputRef.current.blur();
    }
  };

  const handleUnselect = useCallback(() => {
    setSelected(null);
    onChange?.(null);
  }, [onChange]);

  // const handleConfirm = useCallback(() => {
  //   if (selected) {
  //     onConfirm?.(selected);
  //   }
  // }, [onConfirm, selected]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "" && selected) {
            handleUnselect();
          }
        }
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    [handleUnselect, selected]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchend", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchend", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchend", handleClickOutside);
    };
  }, [open]);

  useEffect(() => {
    if (value) {
      setSelected(value);
      onConfirm?.(value);
    }
  }, [value, onConfirm]);

  useEffect(() => {
    /** If `onSearch` is provided, do not trigger options updated. */
    if (!arrayOptions || onSearch || onSearchSync) {
      return;
    }
    const newOption = transToGroupOption(arrayOptions || [], groupBy);
    if (JSON.stringify(newOption) !== JSON.stringify(options)) {
      setOptions(newOption);
    }
  }, [
    arrayDefaultOptions,
    arrayOptions,
    groupBy,
    onSearch,
    onSearchSync,
    options,
  ]);

  useEffect(() => {
    /** sync search */
    const doSearchSync = () => {
      if (!onSearchSync) return;
      // When search is empty, reset to default options
      if (!debouncedSearchTerm.trim()) {
        setOptions(transToGroupOption(arrayDefaultOptions, groupBy));
        return;
      }
      const res = onSearchSync(debouncedSearchTerm);
      setOptions(transToGroupOption(res || [], groupBy));
    };

    const exec = async () => {
      if (!onSearchSync || !open) return;

      // Always run search when input changes, not just on focus
      doSearchSync();
    };

    void exec();
  }, [
    debouncedSearchTerm,
    groupBy,
    onSearchSync,
    open,
    triggerSearchOnFocus,
    arrayDefaultOptions,
  ]);

  useEffect(() => {
    /** async search */
    const doSearch = async () => {
      if (!onSearch) return;
      setIsLoading(true);
      const res = await onSearch(debouncedSearchTerm);
      setOptions(transToGroupOption(res || [], groupBy));
      setIsLoading(false);
    };

    const exec = async () => {
      if (!onSearch || !open) return;

      if (triggerSearchOnFocus || debouncedSearchTerm) {
        await doSearch();
      }
    };

    void exec();
  }, [debouncedSearchTerm, groupBy, onSearch, open, triggerSearchOnFocus]);

  const EmptyItem = useCallback(() => {
    if (!emptyIndicator) return undefined;

    // For async search that showing emptyIndicator
    if ((onSearch || onSearchSync) && Object.keys(options).length === 0) {
      return (
        <CommandItem value="-" disabled>
          {emptyIndicator}
        </CommandItem>
      );
    }

    return <CommandEmpty>{emptyIndicator}</CommandEmpty>;
  }, [emptyIndicator, onSearch, onSearchSync, options]);

  const selectables = useMemo<GroupOption>(
    () => removePickedOption(options, selected),
    [options, selected]
  );

  /** Avoid Creatable Selector freezing or lagging when paste a long string. */
  const commandFilter = useCallback(() => {
    if (commandProps?.filter) {
      return commandProps.filter;
    }

    if (creatable) {
      return (value: string, search: string) => {
        return value.toLowerCase().includes(search.toLowerCase()) ? 1 : -1;
      };
    }
    // Using default filter in `cmdk`. We don&lsquo;t have to provide it.
    return undefined;
  }, [creatable, commandProps?.filter]);

  return (
    <Command
      ref={dropdownRef}
      {...commandProps}
      onKeyDown={(e) => {
        handleKeyDown(e);
        commandProps?.onKeyDown?.(e);
      }}
      className={cn(
        "h-auto overflow-visible !bg-white !w-full",
        commandProps?.className
      )}
      shouldFilter={
        commandProps?.shouldFilter !== undefined
          ? commandProps.shouldFilter
          : !onSearchSync // Only filter if `onSearchSync` is not provided
      }
      filter={commandFilter()}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div
            className={cn(
              "border-input focus-within:border-ring focus-within:ring-ring/50 dark:has-aria-invalid:ring-destructive/40 has-aria-invalid:border-destructive relative min-h-[38px] rounded-md border text-sm transition-[color,box-shadow] outline-none focus-within:ring-[3px] has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:opacity-50",
              {
                "p-1": selected !== null,
                "cursor-text": !disabled && selected !== null,
              },
              {
                "animate-pulse bg-gray-100": isMatching,
              },
              className
            )}
            onClick={() => {
              if (disabled) return;
              inputRef?.current?.focus();
            }}
          >
            <div className="flex flex-wrap gap-1 items-center">
              {/* {selected && (
                <div
                  key={selected.value}
                  className={cn(
                    "animate-fadeIn bg-background text-secondary-foreground hover:bg-background relative flex h-7 w-full cursor-default items-center justify-between rounded-md border ps-2 pe-14 pl-2 text-xs font-medium transition-all disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 data-fixed:pe-2",
                    badgeClassName
                  )}
                  data-fixed={selected.fixed}
                  data-disabled={disabled || undefined}
                >
                  <div className="flex items-center gap-2">
                    {selected.label}
                  </div>
                  <div>
                    <button
                      type="button"
                      className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute -inset-y-px -end- flex size-7 items-center justify-center border border-transparent p-0 outline-hidden transition-[color,box-shadow] outline-none focus-visible:ring-[3px]"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          // handleConfirm();
                        }
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        // handleConfirm();
                      }}
                      aria-label="Confirm Match"
                    >
                      <Check className="h-3.5 w-3.5 text-primary" />
                    </button>
                    <button
                      type="button"
                      className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute -inset-y-px -end-px flex size-7 items-center justify-center rounded-e-md border border-transparent p-0 outline-hidden transition-[color,box-shadow] outline-none focus-visible:ring-[3px]"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleUnselect();
                        }
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onClick={() => {
                        handleUnselect();
                        setTimeout(() => {
                          if (inputRef.current) {
                            inputRef.current.focus();
                            setOpen(true);
                          }
                        }, 0);
                      }}
                      aria-label="Remove"
                    >
                      <X size={14} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              )} */}
              {selected === null && (
                <div className="relative flex w-full items-center">
                  <SearchIcon className="absolute left-3 size-5" />
                  <CommandPrimitive.Input
                    {...inputProps}
                    ref={inputRef}
                    value={inputValue}
                    disabled={disabled}
                    onValueChange={(value) => {
                      setInputValue(value);
                      // If using sync search, trigger it immediately
                      if (onSearchSync) {
                        const res = onSearchSync(value);
                        setOptions(transToGroupOption(res || [], groupBy));
                      }
                      inputProps?.onValueChange?.(value);
                    }}
                    onBlur={(event) => {
                      if (!onScrollbar) {
                        setOpen(false);
                      }
                      inputProps?.onBlur?.(event);
                    }}
                    onFocus={(event) => {
                      setOpen(true);
                      if (triggerSearchOnFocus) {
                        onSearchSync?.(debouncedSearchTerm);
                      }
                      inputProps?.onFocus?.(event);
                    }}
                    onClick={(event) => {
                      event.stopPropagation();
                    }}
                    placeholder={placeholder}
                    className={cn(
                      "placeholder:italic placeholder:text-muted-foreground/80 flex-1 outline-hidden disabled:cursor-not-allowed h-9 px-3 pl-9 w-full",
                      inputProps?.className
                    )}
                  />
                </div>
              )}
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="max-w-[600px] min-w-[345px] overflow-hidden p-0 z-40 sm:!min-w-[500px]"
          align="start"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <CommandList
            className="bg-popover text-popover-foreground max-h-[300px] overflow-y-auto p-0 !w-full"
            onMouseLeave={() => {
              setOnScrollbar(false);
            }}
            onMouseEnter={() => {
              setOnScrollbar(true);
            }}
            onMouseUp={() => {
              inputRef?.current?.focus();
            }}
          >
            {isLoading ? (
              <>{loadingIndicator}</>
            ) : (
              <>
                {EmptyItem()}
                {!selectFirstItem && (
                  <CommandItem value="-" className="hidden" />
                )}
                {Object.entries(selectables).map(([key, dropdowns]) => (
                  <CommandGroup
                    key={key}
                    heading={key}
                    className="overflow-hidden [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground !w-full"
                  >
                    {dropdowns.map((option, index) => {
                      return (
                        <CommandItem
                          key={option.value}
                          value={option.value}
                          disabled={option.disable}
                          onMouseDown={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                          onSelect={() => {
                            setInputValue("");
                            setSelected(option);
                            onConfirm?.(option);
                            onChange?.(option);
                            setOpen(false);
                          }}
                          className={cn(
                            "cursor-pointer px-2 py-2 border-b last:border-0 h-12",
                            index % 2 === 0 ? "bg-muted/30" : "bg-background",
                            option.disable &&
                              "pointer-events-none cursor-not-allowed opacity-50"
                          )}
                        >
                          <div className="grid grid-cols-7 divide-x !w-full md:grid-cols-4">
                            <div className="pr-2 col-span-2 text-xs sm:text-sm md:col-span-1">
                              {option.date}
                            </div>
                            <div className="pl-2 text-xs sm:text-sm truncate text-wrap line-clamp-2 col-span-4 max-md:pl-2 md:col-span-2">
                              {option.description}
                            </div>
                            <div className="text-xs sm:text-sm text-right">
                              {option.amount}
                            </div>
                          </div>
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                ))}
              </>
            )}
          </CommandList>
        </PopoverContent>
      </Popover>
    </Command>
  );
};

QuickFindAndMatchComboBox.displayName = "QuickFindAndMatchComboBox";
export default QuickFindAndMatchComboBox;
