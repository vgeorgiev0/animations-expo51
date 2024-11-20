import { Item } from '@/types/dnd';

/**
 * Creates a sectioned data array from the given sections object.
 *
 * @param sections - An object where the keys are section titles and the values are arrays of items belonging to those sections.
 * @returns An array of items where each section is represented by a section item followed by its corresponding items.
 *
 * @example
 * const sections = {
 *   "Fruits": [{ key: "apple", label: "Apple" }, { key: "banana", label: "Banana" }],
 *   "Vegetables": [{ key: "carrot", label: "Carrot" }, { key: "lettuce", label: "Lettuce" }]
 * };
 * const result = createSectionedData(sections);
 * // result will be:
 * // [
 * //   { key: "section-Fruits", label: "Fruits", isSection: true, sectionTitle: "Fruits" },
 * //   { key: "apple", label: "Apple", sectionTitle: "Fruits" },
 * //   { key: "banana", label: "Banana", sectionTitle: "Fruits" },
 * //   { key: "section-Vegetables", label: "Vegetables", isSection: true, sectionTitle: "Vegetables" },
 * //   { key: "carrot", label: "Carrot", sectionTitle: "Vegetables" },
 * //   { key: "lettuce", label: "Lettuce", sectionTitle: "Vegetables" }
 * // ]
 */
export default function createSectionedData(sections: {
  [key: string]: Item[];
}): Item[] {
  return Object.keys(sections).reduce((acc: Item[], sectionTitle) => {
    const sectionItem: Item = {
      key: `section-${sectionTitle}`,
      label: sectionTitle,
      isSection: true,
      sectionTitle,
    };

    const items = sections[sectionTitle].map((item) => ({
      ...item,
      sectionTitle,
    }));

    return [...acc, sectionItem, ...items];
  }, []);
}

export const dummyDNDListData: {
  [key: string]: { key: string; label: string }[];
} = {
  firstSection: [
    { key: 'item-1', label: '1' },
    { key: 'item-2', label: '2' },
    { key: 'item-3', label: '3' },
    { key: 'item-4', label: '4' },
  ],
  secondSection: [
    { key: 'item-5', label: '5' },
    { key: 'item-6', label: '6' },
    { key: 'item-7', label: '7' },
    { key: 'item-8', label: '8' },
  ],
};
