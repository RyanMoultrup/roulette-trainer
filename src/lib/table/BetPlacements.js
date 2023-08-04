export const placements = [
    'sgl_1',
    'sgl_2',
    'sgl_3',
    'sgl_4',
    'sgl_5',
    'sgl_6',
    'sgl_7',
    'sgl_8',
    'sgl_9',
    'sgl_10',
    'sgl_11',
    'sgl_12',
    'sgl_13',
    'sgl_14',
    'sgl_15',
    'sgl_16',
    'sgl_17',
    'sgl_18',
    'sgl_19',
    'sgl_20',
    'sgl_21',
    'sgl_22',
    'sgl_23',
    'sgl_24',
    'sgl_25',
    'sgl_26',
    'sgl_27',
    'sgl_28',
    'sgl_29',
    'sgl_30',
    'sgl_31',
    'sgl_32',
    'sgl_33',
    'sgl_34',
    'sgl_35',
    'sgl_36',
    'dbl_3_6',
    'dbl_6_9',
    'dbl_9_12',
    'dbl_12_15',
    'dbl_15_18',
    'dbl_18_21',
    'dbl_21_24',
    'dbl_24_27',
    'dbl_27_30',
    'dbl_30_33',
    'dbl_33_36',
    'dbl_3_2',
    'sqr_3_6_2_5',
    'dbl_6_5',
    'sqr_6_9_5_8',
    'dbl_9_8',
    'sqr_9_12_8_11',
    'dbl_12_11',
    'sqr_12_15_11_14',
    'dbl_15_14',
    'sqr_15_18_14_17',
    'dbl_18_17',
    'sqr_18_21_17_20',
    'dbl_21_20',
    'sqr_21_24_20_23',
    'dbl_24_23',
    'sqr_24_27_23_26',
    'dbl_27_26',
    'sqr_27_30_26_29',
    'dbl_30_29',
    'sqr_30_33_29_32',
    'dbl_33_32',
    'sqr_33_36_32_35',
    'dbl_36_35',
    'dbl_2_5',
    'dbl_5_8',
    'dbl_8_11',
    'dbl_11_14',
    'dbl_14_17',
    'dbl_17_20',
    'dbl_20_23',
    'dbl_23_26',
    'dbl_26_29',
    'dbl_29_32',
    'dbl_32_35',
    'dbl_2_1',
    'sqr_2_5_1_4',
    'dbl_5_4',
    'sqr_5_8_4_7',
    'dbl_8_7',
    'sqr_8_11_7_10',
    'dbl_11_10',
    'sqr_11_14_10_13',
    'dbl_14_13',
    'sqr_14_17_13_16',
    'dbl_17_16',
    'sqr_17_20_16_19',
    'dbl_20_19',
    'sqr_20_23_19_22',
    'dbl_23_22',
    'sqr_23_26_22_25',
    'dbl_26_25',
    'sqr_26_29_25_28',
    'dbl_29_28',
    'sqr_29_32_28_31',
    'dbl_32_31',
    'sqr_32_35_31_34',
    'dbl_35_34',
    'dbl_1_4',
    'dbl_4_7',
    'dbl_7_10',
    'dbl_10_13',
    'dbl_13_16',
    'dbl_16_19',
    'dbl_19_22',
    'dbl_22_25',
    'dbl_25_28',
    'dbl_28_31',
    'dbl_31_34',
    'str_3_2_1',
    'line_3_6_2_5_1_4',
    'str_6_5_4',
    'line_6_9_5_8_4_7',
    'str_9_8_7',
    'line_9_12_8_11_7_10',
    'str_12_11_10',
    'line_12_15_11_14_10_13',
    'str_15_14_13',
    'line_15_18_14_17_13_16',
    'str_18_17_16',
    'line_18_21_17_20_16_19',
    'str_21_20_19',
    'line_21_24_20_23_19_22',
    'str_24_23_22',
    'line_24_27_23_26_22_25',
    'str_27_26_25',
    'line_27_30_26_29_25_28',
    'str_30_29_28',
    'line_30_33_29_32_28_31',
    'str_33_32_31',
    'line_33_36_32_35_31_34',
    'str_36_35_34',
    'twelve_first',
    'twelve_second',
    'twelve_third',
    'one_18',
    'odd',
    'even',
    'red',
    'black',
    'nineteen_36',
    'row_first',
    'row_second',
    'row_third',
    'dbl_0_3',
    'str_0_3_2',
    'dbl_0_2',
    'str_0_2_1',
    'dbl_0_1',
    'sgl_37'
];

export const odds = {
    sgl: {
        name: 'Single 35:1',
        category: 'inside',
        payout: '35:1',
        odds: {
            american: 2.6,
            european: 2.7
        }
    },
    dbl: {
        name: 'Split 17:1',
        category: 'inside',
        payout: '17:1',
        odds: {
            american: 5.3,
            european: 5.4
        }
    },
    sqr: {
        name: 'Square 8:1',
        category: 'inside',
        payout: '8:1',
        odds: {
            american: 10.5,
            european: 10.8
        }
    },
    line: {
        name: 'Six Line 5:1',
        category: 'inside',
        payout: '5:1',
        odds: {
            american: 15.8,
            european: 16.2
        }
    },
    str: {
        name: 'Street 11:1',
        category: 'inside',
        payout: '11:1',
        odds: {
            american: 7.9,
            european: 8.1
        }
    },
    twelve: {
        name: 'Twelve 2:1',
        category: 'outside',
        payout: '2:1',
        odds: {
            american: 31.6,
            european: 32.4
        }
    },
    row: {
        name: 'Row 2:1',
        category: 'outside',
        odds: {
            american: 2.6,
            european: 2.7
        }
    },
    red: {
        name: 'Red 1:1',
        category: 'outside',
        payout: '1:1',
        odds: {
            american: 47.37,
            european: 48.65
        }
    },
    black: {
        name: 'Black 1:1',
        category: 'outside',
        payout: '1:1',
        odds: {
            american: 47.37,
            european: 48.65
        }
    },
    even: {
        name: 'Even 1:1',
        category: 'outside',
        payout: '1:1',
        odds: {
            american: 47.37,
            european: 48.65
        }
    },
    odd: {
        name: 'Odd 1:1',
        category: 'outside',
        payout: '1:1',
        odds: {
            american: 47.37,
            european: 48.65
        }
    },
    one: {
        name: '1 To 18 1:1',
        category: 'outside',
        payout: '1:1',
        odds: {
            american: 47.37,
            european: 48.65
        }
    },
    nineteen: {
        name: '19 To 36 1:1',
        category: 'outside',
        payout: '1:1',
        odds: {
            american: 47.37,
            european: 48.65
        }
    }
}
export const names = {
    'sgl': 'Single 35:1',
    'dbl': 'Split 17:1',
    'sqr': 'Square 8:1',
    'line': 'Six Line 5:1',
    'str': 'Street 11:1',
    'twelve': 'Twelve 2:1',
    'row': 'Row 2:1',
    'red': 'Red 1:1',
    'black': 'Black 1:1',
    'even': 'Even 1:1',
    'odd': 'Odd 1:1',
    'one': '1 To 18 1:1',
    'nineteen': '19 To 36 1:1'
}

export default placements;
