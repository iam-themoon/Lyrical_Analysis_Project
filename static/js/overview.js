const bestsellingAlAr = "http://flask-env1.eba-3bijvs3t.us-east-1.elasticbeanstalk.com/api/v1.0/bestsellingalbumsbyartist";
const bestsellers = "http://flask-env1.eba-3bijvs3t.us-east-1.elasticbeanstalk.com/api/v1.0/albumbestsellers"
const bestByYear = "http://flask-env1.eba-3bijvs3t.us-east-1.elasticbeanstalk.com/api/v1.0/albumbestsellers"
const eminem = "http://flask-env1.eba-3bijvs3t.us-east-1.elasticbeanstalk.com/api/v1.0/albumbestsellers"
const mariah = "http://flask-env1.eba-3bijvs3t.us-east-1.elasticbeanstalk.com/api/v1.0/albumbestsellers"

const bestsellingAlArPromise = d3.json(bestsellingAlAr);
const bestsellersPromise = d3.json(bestsellers);
const bestByYearPromise = d3.json(bestByYear)
const eminemPromise = d3.json(eminem);
const mariahPromise = d3.json(mariah);

var palette = ["rgb(58, 50, 168)",
  "rgb(73, 57, 174)",
  "rgb(86, 65, 181)",
  "rgb(99, 73, 187)",
  "rgb(111, 81, 194)",
  "rgb(122, 89, 200)",
  "rgb(133, 97, 207)",
  "rgb(144, 106, 214)",
  "rgb(155, 114, 220)",
  "rgb(166, 123, 227)"]

d3.json(bestsellingAlAr).then(function(data) { 
  let dataSorted = data.sort(function (a,b) {return d3.descending(a.sum, b.sum);});
  var x = [];
  var y = [];
  for (var i = 0; i < dataSorted.length; i++) {
    x.push((dataSorted[i].artist));
    y.push((dataSorted[i].sum));
  }
  var bestSellingAlArTrace = [
    {
      x,
      y,
      type: 'bar',
      marker: {
        color: 'rgb(41,34,133)'
      }
    }
  ];
  var bestSellingAlArLayout = {
    title: 'Best Selling Artist by Album',
    font:{
      family: 'Raleway, sans-serif'
    },
    bargap: 0.10
  };
  Plotly.newPlot('bestSellingAlArDiv', bestSellingAlArTrace, bestSellingAlArLayout);
});

d3.json(bestsellers).then(function(data) {
    let dataNew = data.filter(function(d){ return d.claimed_sales_millions != 2520 })
    var x = [];
    var y = [];
    for (var i = 0; i < dataNew.length; i++) {
        if (dataNew[i].claimed_sales_millions > 39 ){
            x.push((dataNew[i].album));
            y.push((dataNew[i].claimed_sales_millions));
              }};
    
    var bestsellersTrace = [
      {
        x,
        y,
        type:  'bar',
        marker: {
          color: palette
        }
      }
    ];
    var bestsellersLayout = {
      title: 'Top 10 Best Selling Albums',
      font:{
        family: 'Raleway, sans-serif'
      },
      bargap: 0.10
    };
    Plotly.newPlot('bestsellersDiv', bestsellersTrace, bestsellersLayout);
});

// d3.json(bestByYear).then(function(data) {
//     // let sum = 0;
//     var year = data.map(function (i) {return parseInt(i.released); })
//     // console.log(year)
//     let yearSorted = year.sort(function (a,b) {return d3.ascending(a, b);});

//     // yearSorted = d3.bin()
//     // console.log(yearSorted)
//     var svg = d3.select("bestByYearDiv")
//     let start = 0
//     let end = 10
//     let uniqueYears =  [...new Set(yearSorted)]
//     bin1 = d3.histogram();
//     buckets = bin1(uniqueYears);
//     console.log(buckets)

//     svg.selectAll("bestByYearDiv")
//     .data(buckets)
//     .enter()
//     .append("rect")
//       .attr("x", 1)
//       .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
//       .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
//       .attr("height", function(d) { return height - y(d.length); })
//       .style("fill", "#69b3a2")

//     // released1960s = [];
//     // released1970s = [];
//     // released1980s = [];
//     // released1990s = [];
//     // released2000s = [];
//     // released2010s = [];

//     //     // For loop to go through all movies
//     // for (let i = 0; i < data.length; i++) {
//     //     // Variable to hold current movie in loop
//     //     let album = data[i]
//     //     // Increment sum variable by amount of rating
//     //     sum += album.claimed_sales_millions

//     //       // Conditional statement to determine array assignment
//     //     if (album.released < 1960) {
//     //         released1960s.push(album);
//     //     } else if (album.released < 1970) {
//     //         released1970s.push(album);
//     //     } else if (album.released < 1980) {
//     //         released1980s.push(album);
//     //     } else if (album.released < 1990) {
//     //         released1990s.push(album);  
//     //     } else if (album.released < 2000) {
//     //         released2000s.push(album);        
//     //     } else {
//     //         released2010s.push(album);
//     //     }
//     // }

//     //     // Find the average rating
//     // let avg = sum / data.length;
    
//     //     // Print results
//     // console.log("---------");
//     // console.log(`${released1960s.length} of the top ten albums are from the 1960s.`);
//     // console.log(`${released1970s.length} of the top ten albums are from the 1970s.`);
//     // console.log(`${released1980s.length} of the top ten albums are from the 1980s.`);
//     // console.log(`${released1990s.length} of the top ten albums are from the 1990s.`);
//     // console.log(`${released2000s.length} of the top ten albums are from the 2000s.`);
//     // console.log(`${released2010s.length} of the top ten albums are from the 2010s.`);
//     // console.log(`The average album rating is ${avg}.`);
//     // console.log("---------");


//     // // let dataNew = data.filter(function(d){ return d.claimed_sales_millions != 2520 })
//     // // var x = [];
//     // var y = [];
//     // for (var i = 0; i < dataNew.length; i++) {
//     //     if (dataNew[i].claimed_sales_millions > 39 ){
//     //         x.push((dataNew[i].album));
//     //         y.push((dataNew[i].claimed_sales_millions));
//     //           }};
    
//     // var bestByYearTrace = [
//     //   {
//     //     x,
//     //     y,
//     //     type:  'bar'
//     //   }
//     // ];
//     // var bestByYearLayout = {
//     //   title: 'Best by Year (Excluding Elvis)',
//     //   font:{
//     //     family: 'Raleway, sans-serif'
//     //   },
//     //   bargap: 0.10
//     // };
//     // Plotly.newPlot('bestByYearDiv', bestByYearTrace, bestByYearLayout);
// });

d3.json(eminem).then(function(data) {
    let dataNew = data.filter(function(d){ return d.artist == "Eminem" })
    var x = [];
    var y = [];
    for (var i = 0; i < dataNew.length; i++) {{
            x.push((dataNew[i].album));
            y.push((dataNew[i].claimed_sales_millions));
              }};
    
    var eminemTrace = [
      {
        x,
        y,
        type:  'bar',
        marker: {
            color: 'rgb(58,50,168)'
          }
      }
    ];
    var eminemLayout = {
      title: 'Eminem Albums Sales (Millions)',
      font:{
        family: 'Raleway, sans-serif'
      },
      bargap: 0.10
    };
    Plotly.newPlot('eminemDiv', eminemTrace, eminemLayout);
});

d3.json(mariah).then(function(data) {
    let dataNew = data.filter(function(d){ return d.artist == "Mariah Carey" })
    var x = [];
    var y = [];
    for (var i = 0; i < dataNew.length; i++) {{
            x.push((dataNew[i].album));
            y.push((dataNew[i].claimed_sales_millions));
              }};
    
    var mariahTrace = [
      {
        x,
        y,
        type:  'bar',
        marker: {
            color: 'rgb(166,123,227)'
    }
      }
    ];
    var mariahLayout = {
      title: 'Mariah Carey Album Sales (Millions)',
      font:{
        family: 'Raleway, sans-serif'
      },
      bargap: 0.10
    };
    Plotly.newPlot('mariahDiv', mariahTrace, mariahLayout);
});
