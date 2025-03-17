import type { Command as CommandPrimitive } from "cmdk";
import type React from "react";
import { TransactionOption } from "../../helpers/searchComboxOptionExpander";
import type { Command } from "../command";

export interface Option {
  value: string;
  label: string;
  disable?: boolean;
  /** fixed option that can't be removed. */
  fixed?: boolean;
  // /** Group the options by providing key. */
  key?: string;
}

export interface GroupOption {
  [key: string]: TransactionOption[];
}

export interface QuickFindAndMatchComboBoxProps {
  value?: TransactionOption | null;
  defaultOptions?: TransactionOption[];
  /** manually controlled options */
  options?: TransactionOption[];
  placeholder?: string;
  /** Loading component. */
  loadingIndicator?: React.ReactNode;
  /** Empty component. */
  emptyIndicator?: React.ReactNode;
  /** Debounce time for async search. Only work with `onSearch`. */
  delay?: number;
  /**
   * Only work with `onSearch` prop. Trigger search when `onFocus`.
   * For example, when user click on the input, it will trigger the search to get initial options.
   **/
  triggerSearchOnFocus?: boolean;
  /** async search */
  onSearch?: (value: string) => Promise<TransactionOption[]>;
  /**
   * sync search. This search will not showing loadingIndicator.
   * The rest props are the same as async search.
   * i.e.: creatable, groupBy, delay.
   **/
  onSearchSync?: (value: string) => TransactionOption[];
  onChange?: (option: TransactionOption | null) => void;
  /** Hide the placeholder when there is an option selected. */
  hidePlaceholderWhenSelected?: boolean;
  disabled?: boolean;
  /** Group the options base on provided key. */
  groupBy?: string;
  className?: string;
  badgeClassName?: string;
  /**
   * First item selected is a default behavior by cmdk. That is why the default is true.
   * This is a workaround solution by add a dummy item.
   *
   * @reference: https://github.com/pacocoursey/cmdk/issues/171
   */
  selectFirstItem?: boolean;
  /** Allow user to create option when there is no option matched. */
  creatable?: boolean;
  /** Props of `Command` */
  commandProps?: React.ComponentPropsWithoutRef<typeof Command>;
  /** Props of `CommandInput` */
  inputProps?: Omit<
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>,
    "value" | "placeholder" | "disabled"
  >;
  onConfirm?: (option: TransactionOption) => void;
}

export interface SingleSelectorRef {
  selectedValue: Option | null;
  input: HTMLInputElement;
  focus: () => void;
  reset: () => void;
}
