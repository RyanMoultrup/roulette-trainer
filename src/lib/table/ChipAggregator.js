import availableChips from "@/lib/table/chips";

const getTotalChipValues = chips => chips.reduce((r, c) => r + +c.value, 0);

const findChips = (value, avaiableChips, newChips) => {
    const rChips = availableChips.filter(c => c.value <= value);

    const newChip = rChips.pop();
    newChips.push(newChip);

    if (newChip.value === value) {
        return newChips;
    }

    return findChips(+value - +newChip.value, rChips, newChips);
}

const getNewChips = chips => {
    return findChips(getTotalChipValues(chips), availableChips, []);
}

export default getNewChips;
