import { debounce } from "@/lib/Utils";

export const resize = (chart, ref) => {
    const chartPercentOfWidth = ref.clientWidth / window.innerWidth
    const chartPercentOfHeight = ref.clientHeight / window.innerHeight

    let lastResizeWidth = window.innerWidth
    let lastResizeHeight = window.innerHeight

    return debounce(context => {
        let chartWidth
        let chartHeight
        const newWindowWidth = context.target.innerWidth
        const newWindowHeight = context.target.innerHeight

        chartWidth = newWindowWidth * chartPercentOfWidth
        chartHeight = newWindowHeight * chartPercentOfHeight

        lastResizeWidth = newWindowWidth
        lastResizeHeight = newWindowHeight

        chart.rescale(Math.round(chartWidth), Math.round(chartHeight))
    }, 300)
}

export default resize
