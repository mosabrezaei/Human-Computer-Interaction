import define1 from "./309c76100e0d1941@1257.js";

function _1(htl){return(
htl.html`<style>
  .left-info {
    color: black;}
  
  .right-info {
    color: black; 
    font-style: italic;
    font-weight: bold;}

  .sub-title {
    color: black;}
  
  #info {
    display: flex;
    justify-content: space-between;}
}
</style>

<div id="info"> 
  
  <div class="left">
    <h3 class="left-info"> Mosab Rezaei (Z1905541) </h3>
  </div>
  
  <div class="right">
    <h3 class="right-info"> Human Computer Interaction (Project 3) </h3>
  </div>
  
</div>`
)}

function _2(md){return(
md`Identify the importance of the Number of people that participate in the report:`
)}

function _measure(Inputs){return(
Inputs.radio(["Ignore", "Low", "Medium", "High"], {label: "Importance Level:", value: "Ignore"})
)}

function _chart(Scatterplot_d3,data){return(
Scatterplot_d3(data)
)}

function _5(htl){return(
htl.html`<div id="app1"></div>`
)}

function _data(FileAttachment){return(
FileAttachment("Dataset.json").json()
)}

function _Scatterplot_d3(dispatch,d3,Dis,xAxis,yAxis,grid,xScale,yScale,getPersonImportance,measure,s2ColorScale){return(
function Scatterplot_d3(data)
      {
        const updateText = (node) => {
          let divTag = "app1";
          dispatch.call("circle-clicked", null, { id: node.ID, text: node.Report, tag: divTag});
        }
        const svg = d3.create("svg")
           .attr("viewBox", [0, 0, Dis.width, Dis.height])
          
        svg.append("g")
        .call(xAxis)
        .append("text")
          .text("Reports →")
          .attr("x", Dis.width)
          .attr("y", Dis.marginBottom - 3)
          .attr("fill", "currentColor")
          .attr("text-anchor", "end")
          .attr("font-size", 5)
          
  
        svg.append("g")
          .call(yAxis)
          .append("text")
              .text("↑ Threat Level")
              .attr("x", -Dis.marginLeft)
              .attr("y", 8)
              .attr("fill", "currentColor")
              .attr("text-anchor", "start")
              .attr("font-size", 5)

        svg.append("g")
          .call(grid);
        
        svg.append("g")
             .attr("stroke-width", 0.2)
             .attr("stroke", "black")
          .selectAll("circle")
          .data(Object.values(data))
          .join("circle")
             .attr("cx", d => xScale(d.ID))
             .attr("cy", d => yScale(d[getPersonImportance(measure)]))
             .attr("fill", d => s2ColorScale(d[getPersonImportance(measure)])) 
             .attr("r", 2.2)
              .on("click", (event, d) => {
                    
                    updateText(d);
                })
          .append('title') 
             .text(d => [`ID: ${d.ID}\nThreat Score: ${d[getPersonImportance(measure)]}\nNumber of Persons: ${d.Persons_Num}`]) 

        return svg.node();
  }
)}

function _s2ColorScale(d3,score2){return(
d3.scaleQuantile()
    .domain([
        d3.quantileSorted(score2, 0.2),
        d3.quantileSorted(score2, 0.4),
        d3.quantileSorted(score2, 0.6),
        d3.quantileSorted(score2, 0.8),
        d3.max(score2)
    ])
    .range(["#FFD6D6", "#FFA3A3", "#FF7070", "#FF3D3D", "#8B0000"])
)}

function _xScale(d3,data,Dis){return(
d3.scaleLinear()
            .domain(d3.extent(Object.values(Object.values(data)), d => d.ID)).nice()
            .range([Dis.marginLeft, Dis.width - Dis.marginRight])
)}

function _yScale(d3,data,getPersonImportance,measure,Dis){return(
d3.scaleLinear()
            .domain(d3.extent(Object.values(data), d => d[getPersonImportance(measure)])).nice()      
            .range([Dis.height - Dis.marginBottom, Dis.marginTop])
)}

function _xAxis(Dis,d3,xScale){return(
g => g
    .attr("transform", `translate(0,${Dis.height - Dis.marginBottom})`)
    .call(d3.axisBottom(xScale))
    .attr("font-size", 5)
)}

function _yAxis(Dis,d3,yScale){return(
g => g
    .attr("transform", `translate(${Dis.marginLeft},0)`)
    .call(d3.axisLeft(yScale))
    .attr("font-size", 5)
)}

function _color(d3){return(
d3.scaleOrdinal(d3.schemeTableau10)
)}

function _grid(xScale,Dis,yScale){return(
g => g
    //.attr("stroke", "currentColor")
    .attr("stroke-opacity", 0.3)
    .attr("stroke-width", 0.5)
    .attr("stroke", "#ccc")


    .call(g => g.append("g")
      .selectAll("line")
      .data(xScale.ticks())
      .join("line")
        .attr("x1", d => 0.5 + xScale(d))
        .attr("x2", d => 0.5 + xScale(d))
        .attr("y1", Dis.marginTop)
        .attr("y2", Dis.height - Dis.marginBottom))
    .call(g => g.append("g")
      .selectAll("line")
      .data(yScale.ticks())
      .join("line")
        .attr("y1", d => 0.5 + yScale(d))
        .attr("y2", d => 0.5 + yScale(d))
        .attr("x1", Dis.marginLeft)
        .attr("x2", Dis.width - Dis.marginRight))
)}

function _15(dispatch,ReactDOM,React,showText){return(
dispatch.on("circle-clicked", (obj) => {
  ReactDOM.render(
    React.createElement(showText, obj),
    document.getElementById(obj.tag)
  );
})
)}

function _showText(data,React){return(
function showText(props) {
  let tid = props.id;
  let text = props.text;
  const keywords = Object.values(data)[tid].Keywords;
  const keywords_score = Object.values(data)[tid].Keywords_Score;

  // Create a map of keywords to their scores
  const keywordToScoreMap = {};
  keywords.forEach((keyword, index) => {
    keywordToScoreMap[keyword.toLowerCase()] = keywords_score[index];
  });

  // Function to calculate brightness based on score
  const calculateBrightness = (score) => {
    const maxBrightness = 100; // Maximum brightness for score 0
    const minBrightness = 40; // Higher minimum brightness to avoid very dark colors
    return maxBrightness - ((maxBrightness - minBrightness) * (score / 2));
  };

  // Split the text into words
  const words = text.split(" ");
  
  // Loop through each word and check if it's a keyword
  const highlightedWords = words.map((word, i) => {
    const lowerCaseWord = word.toLowerCase();
    if (keywordToScoreMap[lowerCaseWord] !== undefined) {
      const brightness = calculateBrightness(keywordToScoreMap[lowerCaseWord]);
      const backgroundColor = `hsl(0, 100%, ${brightness}%)`;
      // Set font color to white
      const style = { backgroundColor, color: "#fff" }; 
      return React.createElement("span", { key: i, style }, word + " ");
    } else {
      return React.createElement("span", { key: i }, word + " ");
    }
  });

  return React.createElement("div", null, highlightedWords);
}
)}

function _dispatch(d3){return(
d3.dispatch("circle-clicked")
)}

function _getPersonImportance(){return(
function getPersonImportance(measure) {
  if (measure === "Ignore") {
    return 'Threat_Score_Person_0';
  } else if (measure === "Low") {
    return 'Threat_Score_Person_3';
  } else if (measure === "Medium") {
    return 'Threat_Score_Person_6';
  } else {
    return 'Threat_Score_Person_10';
  }
}
)}

function _score2(data,getPersonImportance,measure){return(
Object.values(data).flatMap(d => d[getPersonImportance(measure)]).sort()
)}

function _Dis(){return(
{height:200, width:400, marginTop:20, marginRight:10, marginBottom:25, marginLeft:20}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["Dataset.json", {url: new URL("./files/f4a246e523b83aa1e8db9c7736f3d7b900ab5350ff038c0fce200d9ca473726b1e2cc55580146213b47ee1da619623c48b58e3423f3e82eefbb7c52d125bd797.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["htl"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("viewof measure")).define("viewof measure", ["Inputs"], _measure);
  main.variable(observer("measure")).define("measure", ["Generators", "viewof measure"], (G, _) => G.input(_));
  main.variable(observer("chart")).define("chart", ["Scatterplot_d3","data"], _chart);
  main.variable(observer()).define(["htl"], _5);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  main.variable(observer("Scatterplot_d3")).define("Scatterplot_d3", ["dispatch","d3","Dis","xAxis","yAxis","grid","xScale","yScale","getPersonImportance","measure","s2ColorScale"], _Scatterplot_d3);
  main.variable(observer("s2ColorScale")).define("s2ColorScale", ["d3","score2"], _s2ColorScale);
  main.variable(observer("xScale")).define("xScale", ["d3","data","Dis"], _xScale);
  main.variable(observer("yScale")).define("yScale", ["d3","data","getPersonImportance","measure","Dis"], _yScale);
  main.variable(observer("xAxis")).define("xAxis", ["Dis","d3","xScale"], _xAxis);
  main.variable(observer("yAxis")).define("yAxis", ["Dis","d3","yScale"], _yAxis);
  main.variable(observer("color")).define("color", ["d3"], _color);
  main.variable(observer("grid")).define("grid", ["xScale","Dis","yScale"], _grid);
  main.variable(observer()).define(["dispatch","ReactDOM","React","showText"], _15);
  main.variable(observer("showText")).define("showText", ["data","React"], _showText);
  main.variable(observer("dispatch")).define("dispatch", ["d3"], _dispatch);
  main.variable(observer("getPersonImportance")).define("getPersonImportance", _getPersonImportance);
  main.variable(observer("score2")).define("score2", ["data","getPersonImportance","measure"], _score2);
  main.variable(observer("Dis")).define("Dis", _Dis);
  const child1 = runtime.module(define1);
  main.import("render", child1);
  main.import("component", child1);
  main.import("jsx", child1);
  main.import("memo", child1);
  main.import("forwardRef", child1);
  main.import("React", child1);
  main.import("ReactDOM", child1);
  main.import("createElement", child1);
  main.import("Children", child1);
  main.import("createRef", child1);
  main.import("createContext", child1);
  main.import("lazy", child1);
  main.import("Fragment", child1);
  main.import("StrictMode", child1);
  main.import("Suspense", child1);
  main.import("cloneElement", child1);
  main.import("useCallback", child1);
  main.import("useContext", child1);
  main.import("useEffect", child1);
  main.import("useImperativeHandle", child1);
  main.import("useLayoutEffect", child1);
  main.import("useMemo", child1);
  main.import("useReducer", child1);
  main.import("useRef", child1);
  main.import("useState", child1);
  main.import("useDebugValue", child1);
  main.import("createPortal", child1);
  main.import("__SECRET_SWITCHER", child1);
  return main;
}
