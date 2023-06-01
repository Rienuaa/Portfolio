
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
  
  SetupGraph();
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
  let total = GetTotalEntries();
  let headlines = GetTotalFeaturesByClassName("features");
  let balance = GetTotalFeaturesByClassName("balance");
  let bugs = GetTotalFeaturesByClassName("bugfixes");
  let engineering = GetTotalFeaturesByClassName("engineering");
  
  let updateNames = GetLabels();
  let totalupdates = updateNames.length;
  
  var average = Math.floor( bugs / totalupdates );
  
  document.getElementById("StatsHeader").innerHTML = document.getElementById("StatsHeader").innerHTML.replace("$VALUE1$", total).replace("$VALUE2$", totalupdates);
  
  document.getElementById("StatsHeadline").innerHTML = document.getElementById("StatsHeadline").innerHTML.replace("$VALUE1$", headlines);
  document.getElementById("StatsBalance").innerHTML = document.getElementById("StatsBalance").innerHTML.replace("$VALUE1$", balance);
  document.getElementById("StatsBugs").innerHTML = document.getElementById("StatsBugs").innerHTML.replace("$VALUE1$", bugs);
  document.getElementById("StatsEngineering").innerHTML = document.getElementById("StatsEngineering").innerHTML.replace("$VALUE1$", engineering);
  
  document.getElementById("StatsTextHeadline").innerHTML = document.getElementById("StatsTextHeadline").innerHTML.replace("$VALUE1$", GetHighestValue("features")).replace("$UPDATENAME$", UpdateNameWithHighestValue("features"));
  document.getElementById("StatsTextBalance").innerHTML = document.getElementById("StatsTextBalance").innerHTML.replace("$VALUE1$", GetHighestValue("balance")).replace("$UPDATENAME$", UpdateNameWithHighestValue("balance"));
  document.getElementById("StatsTextBugs").innerHTML = document.getElementById("StatsTextBugs").innerHTML.replace("$VALUE1$", GetHighestValue("bugfixes")).replace("$UPDATENAME$", UpdateNameWithHighestValue("bugfixes"));
  document.getElementById("StatsTextEngineering").innerHTML = document.getElementById("StatsTextEngineering").innerHTML.replace("$VALUE1$", GetHighestValue("engineering")).replace("$UPDATENAME$", UpdateNameWithHighestValue("engineering"));
  
  document.getElementById("StatsTextTotal").innerHTML = document.getElementById("StatsTextTotal").innerHTML.replace("$VALUE1$", average);
  
  document.getElementById("StatsLink").setAttribute( 'href', TruncateUpdateName( UpdateNameWithHighestValue("features") ) );
  document.getElementById("BalanceLink").setAttribute( 'href', TruncateUpdateName( UpdateNameWithHighestValue("balance") ) );
  document.getElementById("BugsLink").setAttribute( 'href', TruncateUpdateName( UpdateNameWithHighestValue("bugfixes") ) );
  document.getElementById("EngineeringLink").setAttribute( 'href', TruncateUpdateName( UpdateNameWithHighestValue("engineering") ) );
}

function TruncateUpdateName( UpdateName )
{
  var split = UpdateName.split(" ");
  var string = split[1];
  string = "#U" + string;
  return string;  
}

function GetHighestValue( ClassName )
{
  var features = document.getElementsByClassName(ClassName);
  
  let highest = 0;
  
  for ( var i = 0; i < features.length; i++ )
  {
    var children = features[i].children;
    
    for ( var j = 0; j < children.length; j++ )
    {
      var child = children[j];

      if ( child.nodeName == "UL" )
      {
        if ( child.childElementCount > highest )
        {
          highest = child.childElementCount;
        }
      }
    }
  }

  return highest;
}

function UpdateNameWithHighestValue( ClassName )
{
  var features = document.getElementsByClassName(ClassName);
  
  let highest = 0;
  let index = 0;
  
  for ( var i = 0; i < features.length; i++ )
  {
    var children = features[i].children;
    
    for ( var j = 0; j < children.length; j++ )
    {
      var child = children[j];

      if ( child.nodeName == "UL" )
      {
        if ( child.childElementCount > highest )
        {
          highest = child.childElementCount;
          index = i;
        }
      }
    }
  }
  
  let UpdateNames = GetLabels().reverse();

  return UpdateNames[index];
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
    
    document.getElementById("GraphButton").innerHTML = "Hide Statistics";
    
    SetupGraph();
  }
  else
  {
    graph.style.display = "none";
    
    document.getElementById("GraphButton").innerHTML = "Show Statistics";
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
  
  var chart = new Highcharts.Chart('Graph', {
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
    }
  });
  
  if ( document.getElementById("MainFeaturesCheckbox").checked )
  {
    chart.addSeries({                        
      name: 'Headline Features',
      data: HeadlineData,
      color: '#f22760'
      }, false);
  }
  
  if ( document.getElementById("BalanceCheckbox").checked )
  {
    chart.addSeries({                        
      name: 'Balance and Small Features',
      data: SmallFeatureData,
      color: '#f7ae2f'
      }, false);
  }
  
  if ( document.getElementById("BugfixCheckbox").checked )
  {
    chart.addSeries({                        
      name: 'Bug Fixes',
      data: BugfixData,
      color: '#3ef7aa'
      }, false);
  }
  
  if ( document.getElementById("EngineeringCheckbox").checked )
  {
    chart.addSeries({                        
      name: 'Engineering Changes',
      data: EngineeringData,
      color: '#5289ff'
      }, false);
  }
  
  chart.redraw();
}