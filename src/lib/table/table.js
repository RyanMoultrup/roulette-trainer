const firstRow = [
    {
        class: 'spot _0 pt-16 cell border-t-3 outside-cell align-text-middle row-span-3 rounded-tl rounded-bl left-border-cell bottom-border-cell top-border-cell',
        text: '0'
    },
    {
        class: 'spot _3 cell left-border-cell red-cell top-border-cell',
        text: '3'
    },
    {
        class: 'spot _6 cell black-cell top-border-cell',
        text: '6'
    },
    {
        class: 'spot _9 cell red-cell top-border-cell',
        text: '9'
    },
    {
        class: 'spot _12 cell red-cell top-border-cell',
        text: '12'
    },
    {
        class: 'spot _15 cell black-cell top-border-cell',
        text: '15'
    },
    {
        class: 'spot _18 cell red-cell top-border-cell',
        text: '18'
    },
    {
        class: 'spot _21 cell red-cell top-border-cell',
        text: '21'
    },
    {
        class: 'spot _24 cell black-cell top-border-cell',
        text: '24'
    },
    {
        class: 'spot _27 cell red-cell top-border-cell',
        text: '27'
    },
    {
        class: 'spot _30 cell red-cell top-border-cell',
        text: '30'
    },
    {
        class: 'spot _33 cell black-cell top-border-cell',
        text: '33'
    },
    {
        class: 'spot _36 cell cell right-border-cell border-t-3 red-cell top-border-cell',
        text: '36'
    },
]

const secondRow = [
    {
        class: 'spot _2 cell cell left-border-cell black-cell',
        text: '2'
    },
    {
        class: 'spot _5 cell red-cell',
        text: '5'
    },
    {
        class: 'spot _8 cell black-cell',
        text: '8'
    },
    {
        class: 'spot _11 cell black-cell',
        text: '11'
    },
    {
        class: 'spot _14 cell red-cell',
        text: '14'
    },
    {
        class: 'spot _17 cell black-cell',
        text: '17'
    },
    {
        class: 'spot _20 cell black-cell',
        text: '20'
    },
    {
        class: 'spot _23 cell red-cell',
        text: '23'
    },
    {
        class: 'spot _26 cell black-cell',
        text: '26'
    },
    {
        class: 'spot _29 cell black-cell',
        text: '29'
    },
    {
        class: 'spot _32 cell red-cell',
        text: '32'
    },
    {
        class: 'spot _35 cell right-border-cell black-cell',
        text: '35'
    }
]

const thirdRow = [
    {
        class: 'spot _1 cell left-border-cell red-cell bottom-border-cell',
        text: '1'
    },
    {
        class: 'spot _4 cell black-cell bottom-border-cell',
        text: '4'
    },
    {
        class: 'spot _7 cell red-cell bottom-border-cell',
        text: '7'
    },
    {
        class: 'spot _10 cell black-cell bottom-border-cell',
        text: '10'
    },
    {
        class: 'spot _13 cell black-cell bottom-border-cell',
        text: '13'
    },
    {
        class: 'spot _16 cell red-cell bottom-border-cell',
        text: '16'
    },
    {
        class: 'spot _19 cell red-cell bottom-border-cell',
        text: '19'
    },
    {
        class: 'spot _22 cell black-cell bottom-border-cell',
        text: '22'
    },
    {
        class: 'spot _25 cell red-cell bottom-border-cell',
        text: '25'
    },
    {
        class: 'spot _28 cell black-cell bottom-border-cell',
        text: '28'
    },
    {
        class: 'spot _31 cell black-cell bottom-border-cell',
        text: '31'
    },
    {
        class: 'spot _34 cell right-border-cell red-cell bottom-border-cell',
        text: '34'
    }
]

const firstColumn = {
    class: 'spot cell outside-cell text-base rounded-tr rounded-br top-border-cell right-border-cell',
    text: '2/1'
}

const secondColumn = {
    class: 'spot cell outside-cell text-base right-border-cell rounded-br rounded-tr',
    text: '2/1'
}

const thirdColumn = {
    class: 'spot cell outside-cell text-base rounded-br rounded-tr bottom-border-cell right-border-cell',
    text: '2/1'
}

export const outsideSpots = [
    {
        class: 'spot cell outside-cell text-large col-span-4 col-start-2 left-border-cell rounded-tl',
        text: '1ST 12'
    },
    {
        class: 'spot cell outside-cell text-large col-span-4',
        text: '2ND 12'
    },
    {
        class: 'spot cell outside-cell text-large col-span-4 right-border-cell rounded-tr',
        text: '3RD 12'
    },

    {
        class: 'spot cell pt-4 outside-cell text-xl col-span-2 col-start-2 rounded-bl bottom-border-cell left-border-cell',
        text: '1 TO 18'
    },
    {
        class: 'spot cell outside-cell col-span-2 bottom-border-cell',
        text: 'EVEN'
    },

    {
        class: 'spot cell red-cell col-span-2 bottom-border-cell',
        text: 'RED'
    },
    {
        class: 'spot cell p-2 pt-4 black-cell col-span-2 bottom-border-cell',
        text: 'BLACK'
    },
    {
        class: 'spot cell outside-cell text-opacity-70 col-span-2 bottom-border-cell',
        text: 'ODD'
    },
    {
        class: 'spot cell p-2 pt-4 outside-cell text-xl col-span-2 rounded-br right-border-cell bottom-border-cell',
        text: '19 TO 36'
    }
]

export const tableSpots = [
    ...firstRow,
    firstColumn,
    ...secondRow,
    secondColumn,
    ...thirdRow,
    thirdColumn,
    ...outsideSpots
]

export const insideTable = [...firstRow, ...secondRow, ...thirdRow]