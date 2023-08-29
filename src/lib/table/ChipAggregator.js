import availableChips from "@/lib/table/chips"

const getTotalChipValues = chips => chips.reduce((r, c) => r + +c.value, 0)

const findChips = (value, newChips = []) => {
    const rChips = availableChips.filter(c => c.value <= value)

    const newChip = rChips.pop()
    newChips.push(newChip)

    if (newChip.value === value) {
        return newChips
    }

    return findChips(+value - +newChip.value, newChips)
}

const getNewChips = chips => findChips(getTotalChipValues(chips))

export const getNewChipsFromValue = value => findChips(value)

export default getNewChips;
