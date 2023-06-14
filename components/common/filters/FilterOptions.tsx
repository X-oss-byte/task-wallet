import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { RxChevronDown } from "react-icons/rx";
import { FaCheck } from "react-icons/fa";

type Props<T> = {
  onChange: (val: T) => void;
  onBlur: () => void;
  value: T;
  onFocus: () => void;
  options: { name: string }[];
  multiple: boolean;
  label: string;
  labelColor?: string;
};

const FilterOptions = <T,>(props: Props<T>) => {
  const { onChange, onBlur, value, onFocus, options, multiple } = props;

  return (
    <Listbox
      value={value}
      onChange={(val) => {
        if (val instanceof Array && val.length > 0) onChange(val);
        if (typeof val === "string") onChange(val);
      }}
      multiple={multiple}
    >
      <div className="relative flex flex-col gap-2 min-w-[9rem] max-w-[9rem]">
        <Listbox.Button
          onFocus={onFocus}
          onBlur={onBlur}
          className={`relative z-40 flex w-full min-w-[9rem] max-w-[9rem] items-center rounded-lg bg-bg-primary px-3 py-1.5 shadow-shadow-form-input outline-1 outline-offset-2 focus:!outline-blue-700`}
        >
          <span className="max-w-[94%] overflow-hidden text-ellipsis text-sm whitespace-nowrap">
            {(typeof value === "string" &&
              (value === "All" ? props.label : value)) ||
              (Array.isArray(value) &&
                value.map((person) => person).join(", "))}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <RxChevronDown
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-30 top-[100%] min-w-[9rem] max-w-[9rem] mt-1 max-h-60 w-full overflow-auto rounded-md bg-bg-primary-light text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {options.map((option, optionIdx) => (
              <Listbox.Option
                key={optionIdx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? "bg-gray-600" : "text-text-primary"
                  }`
                }
                // value={option.name}
                value={option.name}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {option.name}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                        <FaCheck
                          className="h-5 w-5 fill-green-600"
                          aria-hidden="true"
                        />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default FilterOptions;
