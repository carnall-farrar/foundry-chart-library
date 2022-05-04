const d3 = require("d3");
const _ = require("lodash");

export const BarChart = ({ width, height, barPadding, data: originalData }) => {
  const chartContainerRef = React.useRef(null);
  const [data, setData] = React.useState(originalData);

  React.useEffect(() => {
    const chartContainer = chartContainerRef.current;
    if (!chartContainer) {
      return;
    }

    const svg = d3
      .select(chartContainer)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const bars = svg.selectAll("rect").data(data).enter().append("rect");

    bars
      .attr("x", function (d, i) {
        return i * (width / data.length);
      })
      .attr("y", function (d) {
        return height - d * 4;
      })
      .attr("width", width / data.length - barPadding)
      .attr("height", function (d) {
        return d * 4;
      })
      .attr("fill", "teal");

    svg
      .selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .text(function (d) {
        return d;
      })
      .attr("x", function (d, i) {
        return (
          i * (width / data.length) + (width / data.length - barPadding) / 2
        );
      })
      .attr("y", function (d) {
        return height - d * 4 + 14;
      })
      .attr("font-family", "sans-serif")
      .attr("font-size", "12px")
      .attr("font-weight", "bold")
      .attr("fill", "white")
      .attr("text-anchor", "middle");
  }, [data]);

  return (
    <div>
      <div ref={chartContainerRef} />
      <button
        onClick={() =>
          setData(Array.from({ length: 5 }, () => _.random(0, 50)))
        }
      >
        randomize
      </button>
    </div>
  );
};
