import availableChips from "@/lib/table/chips";

const getTotalChipValues = chips => chips.reduce((r, c) => r + +c.value, 0);

const findChips = (value, avaiableChips, newChips) => {
    const rChips = availableChips.filter(c => c.value <= value);

    // the potential chip
    const newChip = rChips.pop();
    newChips.push(newChip);

    if (newChip.value === value) {
        return newChips; // we are done this is the only new chip needed
    }

    return findChips(+value - +newChip.value, rChips, newChips);
}

const getNewChips = chips => {
    const total = getTotalChipValues(chips);
    return findChips(total, availableChips, []);
}

export default getNewChips;