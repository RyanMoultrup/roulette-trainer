import { debounce } from "@/lib/Utils";

export const resize = (chart, ref, initWidth, initHeight) => {
    const chartPercentOfWidth = ref.clientWidth / window.innerWidth
    const chartPercentOfHeight = ref.clientHeight / window.innerHeight

    let lastResizeWidth = window.innerWidth
    let lastResizeHeight = window.innerHeight

    return debounce(context => {
        let chartWidth
        let chartHeight
        const newWindowWidth = context.target.innerWidth
        const newWindowHeight = context.target.innerHeight

        chartWidth = (newWindowWidth < lastResizeWidth)
            ? newWindowWidth * chartPercentOfWidth
            : initWidth

        chartHeight = (newWindowHeight < lastResizeHeight)
            ? newWindowHeight * chartPercentOfHeight
            : initHeight

        lastResizeWidth = newWindowWidth
        lastResizeHeight = newWindowHeight

        chart.rescale(chartWidth, chartHeight)
    }, 300)
}

export default resize
