import { usePriceTable } from "@/components/Prices/PricesProvider";
import { priceKey } from "@/lib/priceTable";

// Price for the current calculator selection, from the Sanity price table
// ("ფასი") or the built-in fallback. 0 = no price for this combination.
function useCalculatePrice(
  courseTitle: string,
  selectedItems: {
    "გაკვეთილის ტიპი": string;
    "გაკვეთილის სიხშირე": string;
    "კურსის ფორმატი": string;
  },
) {
  const table = usePriceTable();
  const key = priceKey(
    courseTitle,
    selectedItems["კურსის ფორმატი"],
    selectedItems["გაკვეთილის ტიპი"],
    selectedItems["გაკვეთილის სიხშირე"],
  );
  return { price: table[key] || 0 };
}

export default useCalculatePrice;
