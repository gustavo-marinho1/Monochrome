import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";
import { OptionColor } from "./option-color";
import type { FilterSearch } from "@/lib/search";
import { OptionSort } from "./option-sort";
import { SlidersHorizontal } from "lucide-react";
import { colors_products } from "@/lib/products";

interface Props {
  filter: FilterSearch,
  changeFilter: (color: string | null, sort: string | null) => void,
  disabled: boolean
}

const ModalFilter = ({filter, changeFilter, disabled}: Props) => {
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState(filter.color || null);
  const [sort, setSort] = useState(filter.sort || null);

  const [qtd, setQtd] = useState(0);

  useEffect(() => {
    let qtd = 0;
    if (color) qtd++;
    if (sort) qtd++;
    setQtd(qtd);
  }, [color, sort]);

  useEffect(() => {
    if (!open) return
    setColor(filter.color || null);
    setSort(filter.sort || null);
  }, [open]);

  const clear = () => {
    setColor(null);
    setSort(null);
  }

  const apply = () => {
    if (disabled) return
    changeFilter(color, sort);
    setOpen(false);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>

      <Button variant="outline" onClick={() => { if (!disabled) setOpen(true) }}>
        <SlidersHorizontal className="h-4 w-4" /> Filter
      </Button>

      <SheetContent className="gap-0">
        <SheetHeader className="p-4">
          <SheetTitle className="uppercase font-semibold">Filters</SheetTitle>
        </SheetHeader>

        <hr />

        <div className="flex-[1] flex flex-col gap-6 p-5">

          <div className="flex flex-col gap-2">
            <span className="font-semibold">Color</span>
            <div className="grid grid-cols-2 gap-2">
              {colors_products.map((c) => (
                <OptionColor
                  key={c.value}
                  color={c.value}
                  label={c.label}
                  setColor={() => setColor(c.value)}
                  isActive={c.value === color}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-semibold">Sort by</span>
            <div className="grid grid-cols-2 gap-2">
              <OptionSort label="Price ascending"  setSort={() => setSort("price_asc")}  isActive={sort === "price_asc"}  />
              <OptionSort label="Price descending" setSort={() => setSort("price_desc")} isActive={sort === "price_desc"} />
            </div>
          </div>

        </div>

        <hr />

        <SheetFooter className="p-4">
          <div className="w-full flex gap-2">
            <Button onClick={clear} variant="outline" className="flex-[1]">Clear {qtd ? "(" + qtd + ")" : ""}</Button>
            <Button onClick={apply} className="flex-[1]">Apply</Button>
          </div>
        </SheetFooter>
      </SheetContent>

    </Sheet>
  )
}

export { ModalFilter }