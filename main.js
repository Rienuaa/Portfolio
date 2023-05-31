
function CheckBoxFeature(checkboxElement, ClassName)
{
  var IsChecked = checkboxElement.checked;
  
  var features = document.getElementsByClassName(ClassName);
  for ( var i = 0; i < features.length; i++ )
  {
    if ( IsChecked )
    {
      features[i].style.display = "block";
    }
    else
    {
      features[i].style.display = "none";
    }
  }
}

function CheckBoxCommentary(checkboxElement)
{
  var IsChecked = checkboxElement.checked;
  
  var commentary = document.getElementsByTagName("li");
  for ( var i = 0; i < commentary.length; i++ )
  {
    if ( commentary[i].className != "commentary" )
    {
      if ( IsChecked )
      {
        commentary[i].style.display = "none";
      }
      else
      {
        commentary[i].style.display = "list-item";
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', function() {
    ShowStats();
}, false);

function ShowStats()
{
  let headlines = GetTotalFeaturesByClassName("features");
  let balance = GetTotalFeaturesByClassName("balance");
  let bugs = GetTotalFeaturesByClassName("bugfixes");
  let engineering = GetTotalFeaturesByClassName("engineering");
  
  document.getElementById("FeatureLabel").innerHTML = "Headline Features (" + headlines + ")";
  document.getElementById("BalanceLabel").innerHTML = "Balance Changes and Small Features (" + balance + ")";
  document.getElementById("BugfixLabel").innerHTML = "Bug Fixes (" + bugs + ")";
  document.getElementById("EngineeringLabel").innerHTML = "Engineering Work (" + engineering + ")";
}

function GetTotalEntries()
{
  let headline = GetTotalFeaturesByClassName("features");
  let balance = GetTotalFeaturesByClassName("balance");
  let bugs = GetTotalFeaturesByClassName("bugfixes");
  let engineering = GetTotalFeaturesByClassName("engineering");
  
  return headline + balance + bugs + engineering;
}

function GetTotalFeaturesByClassName( ClassName )
{
  var features = document.getElementsByClassName(ClassName);
  
  let total = 0;
  
  for ( var i = 0; i < features.length; i++ )
  {
    var children = features[i].children;
    
    for ( var j = 0; j < children.length; j++ )
    {
      var child = children[j];

      if ( child.nodeName == "UL" )
      {
        total += child.childElementCount;
      }
    }
  }

  return total;
}

function ShowGraphButton()
{
  var graph = document.getElementById("GraphSection");
  
  if ( graph.style.display == "none" )
  {
    graph.style.display = "block";
    
    document.getElementById("GraphButton").innerHTML = "Hide Graph";
    
    SetupGraph();
  }
  else
  {
    graph.style.display = "none";
    
    document.getElementById("GraphButton").innerHTML = "Show Graph";
  }
}

function GetLabels()
{
  var headers = document.getElementsByClassName("header");
  
  let labels = [];
  
  for ( var i = 0; i < headers.length; i++ )
  {
    var children = headers[i].children;
    
    for ( var j = 0; j < children.length; j++ )
    {
      var child = children[j];

      if ( child.nodeName == "H2" )
      {
        var split = child.innerHTML.split(":");
        labels.push( split[0] );
      }
    }
  }
  
  return labels.reverse();
}

function GetFeatureDataByClassName( ClassName )
{
  var features = document.getElementsByClassName( ClassName );
  
  let featureData = [];
  
  for ( var i = 0; i < features.length; i++ )
  {
    var children = features[i].children;
    
    if (children.length == 0)
    {
      featureData.push(0);
    }
    
    for ( var j = 0; j < children.length; j++ )
    {
      var child = children[j];

      if ( child.nodeName == "UL" )
      {
        featureData.push(child.childElementCount);
      }
    }
  }

  return featureData.reverse();
}

function SetupGraph()
{
  var GraphLabels = GetLabels();
  
  var HeadlineData = GetFeatureDataByClassName("features");
  var SmallFeatureData = GetFeatureDataByClassName("balance");
  var BugfixData = GetFeatureDataByClassName("bugfixes");
  var EngineeringData = GetFeatureDataByClassName("engineering");
  
  Highcharts.chart('Graph', {
    chart: {
        type: 'area'
    },
    title: {
        text: 'Changes by Update',
        align: 'left'
    },
    xAxis: {
      categories: GraphLabels
    },
    yAxis: {
        title: {
            useHTML: true,
            text: "Changes"
        }
    },
    tooltip: {
        shared: true,
        headerFormat: '<span style="font-size:12px"><b>{point.key}</b></span><br>'
    },
    plotOptions: {
        series: {
            //
        },
        area: {
            stacking: 'normal',
            lineColor: '#666666',
            lineWidth: 1,
            marker: {
                lineWidth: 1,
                lineColor: '#666666'
            }
        }
    },
    series: [{
        name: 'Headline Features',
        data: HeadlineData
    }, {
        name: 'Balance and Small Features',
        data: SmallFeatureData

    }, {
        name: 'Bug Fixes',
        data: BugfixData
    }, {
        name: 'Engineering Changes',
        data: EngineeringData

    }]
});
}