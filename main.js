
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

function ShowAdvancedStats()
{
  let updateNames = GetLabels();
  
  let index = GetIndexOfHighestInDataSet( GetAggregateData() );
  
  let highest = GetHighestOfDataSet( GetAggregateData() );
  
  let amount = GetTotalDataPatchShifted()[index];
  
  let days = Math.round(GetDayDifferences()[index]);
  
  document.getElementById("StatsTextExtra").innerHTML = document.getElementById("StatsTextExtra").innerHTML.replace("$VALUE1$", highest).replace("$VALUE2$", amount).replace("$VALUE3$", days).replace("$UPDATENAME$", updateNames[index]);
  document.getElementById("AggregateLink").setAttribute( 'href', TruncateUpdateName( updateNames[index] ) );
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

function GetDateLabels()
{
  var headers = document.getElementsByClassName("header");
  
  let DateLabels = [];
  
  for ( var i = 0; i < headers.length; i++ )
  {
    var children = headers[i].children;
    
    for ( var j = 0; j < children.length; j++ )
    {
      var child = children[j];

      if ( child.nodeName == "P" )
      {
        DateLabels.push( child.innerHTML );
      }
    }
  }
  
  return DateLabels.reverse();
}
  
function GetDates()
{
  let DateLabels = GetDateLabels();
  let Dates = [];
  
  for ( var i = 0; i < DateLabels.length; i++ )
  {
    // this splits the date like so: April / 26th / 2023
    var split = DateLabels[i].split(" ");
    
    // day in just numbers
    var day = split[1].replace(/[^0-9]/g,"");
    // add leading 0
    if ( day.length == 1 )
    {
      day = "0" + day;
    }
    
    // first three characters
    var month = split[0].slice(0,3);
    
    // the year
    var year = split[2];
    
    var date = Date.parse( day + " " + month + " " + year + " 00:12:00 GMT" );
    
    Dates.push( date );
  }
  
  return Dates.reverse();
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

function GetYearLabels()
{
  var headers = document.getElementsByClassName( "header" );
  
  let years = [];
  
  for ( var i = 0; i < headers.length; i++ )
  {
    var children = headers[i].children;

    for ( var j = 0; j < children.length; j++ )
    {
      var child = children[j];

      if ( child.nodeName == "P" )
      {
        // grab the year
        var year = child.innerHTML.substr(-4);
        if ( !years.includes( year ) )
        {
          years.push( year );
        }
      }
    }
  }
  
  return years.reverse();
}

function GetYears()
{
  var headers = document.getElementsByClassName( "header" );
  
  let years = [];
  
  for ( var i = 0; i < headers.length; i++ )
  {
    var children = headers[i].children;

    for ( var j = 0; j < children.length; j++ )
    {
      var child = children[j];

      if ( child.nodeName == "P" )
      {
        // grab the year
        var year = child.innerHTML.substr(-4);
        years.push( year );
      }
    }
  }
  
  return years.reverse();
}

function GetFeatureDataByClassNameByYear( ClassName )
{
  // a list of years for each update
  var years = GetYears().reverse();
  
  // a list of years, no duplicates
  var labels = GetYearLabels().reverse();
  
  var features = document.getElementsByClassName( ClassName );
  
  let featureData = [];
  
  // add in 0 at each year index
  for ( var i = 0; i < labels.length; i++ )
  {
    featureData.push( 0 );
  }
  
  for ( var i = 0; i < features.length; i++ )
  {
    var children = features[i].children;
    
    // get the year for this update
    var year = years[i];
    
    // find the index of the year in the label list
    var index = labels.indexOf( year );
    
    for ( var j = 0; j < children.length; j++ )
    {
      var child = children[j];

      if ( child.nodeName == "UL" )
      {
        featureData[index] = featureData[index] + child.childElementCount;
      }
    }
  }

  return featureData.reverse();
}

function GetPatchDataByClassName( ClassName )
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
    else
    {
      var count = 0;
      
      for ( var j = 0; j < children.length; j++ )
      {
        var child = children[j];

        if ( child.nodeName == "UL" )
        {
          var subchildren = child.children;
          
          for ( var k = 0; k < subchildren.length; k++ )
          {
            var subchild = subchildren[k];
            
            if ( subchild.className == "patch" )
            {
              count++;
            }
          }
        }
      }
      
      featureData.push( count );
    }
  }

  return featureData.reverse();
}

function GetTotalDataPatchShifted()
{
  // first lets get all of the lists
  var HeadlineData = GetFeatureDataByClassName("features");
  var SmallFeatureData = GetFeatureDataByClassName("balance");
  var BugfixData = GetFeatureDataByClassName("bugfixes");
  var EngineeringData = GetFeatureDataByClassName("engineering");
  
  var HeadlinePatch = GetPatchDataByClassName("features");
  var SmallFeaturePatch = GetPatchDataByClassName("balance");
  var BugfixPatch = GetPatchDataByClassName("bugfixes");
  var EngineeringPatch = GetPatchDataByClassName("engineering");
  
  var TotalData = [];
  var prevPatch = 0;
  
  for ( var i = 0; i < HeadlineData.length; i++ )
  {
    var total = HeadlineData[i] + SmallFeatureData[i] + BugfixData[i] + EngineeringData[i];
    
    // now, for each entry, we subtract the patch value of the current iteration, and add the patch value of the previous
    // the first entry here is going to be 0, though!
    var thispatch = HeadlinePatch[i] + SmallFeaturePatch[i] + BugfixPatch[i] + EngineeringPatch[i];
    
    if ( i > 0 )
    {
      prevPatch = HeadlinePatch[i - 1] + SmallFeaturePatch[i - 1] + BugfixPatch[i - 1] + EngineeringPatch[i - 1];
    }

    total = total - thispatch + prevPatch;
    
    TotalData.push(total);
  }
  
  
  
  return TotalData;
}

function GetHighestOfDataSet( DataSet )
{
  let highest = 0;
  
  for ( var i = 0; i < DataSet.length; i++ )
  {
    if ( DataSet[i] > highest )
    {
      highest = DataSet[i];
    }
  }

  return highest;
}

function GetIndexOfHighestInDataSet( DataSet )
{
  let highest = 0;
  let index = 0;
  
  for ( var i = 0; i < DataSet.length; i++ )
  {
    if ( DataSet[i] > highest )
    {
      highest = DataSet[i];
      index = i;
    }
  }
  
  return index;
}

function GetAggregateData()
{
  // this is a list of total changes, with each entry divided by the total days since the previous entry
  // the first entry is instead divided by a flat 3 months
  // for example, update 150 had 50 total changes and was 50 days after the release of the previous update, for an aggregate score of 1
  
  var Data = GetTotalDataPatchShifted();
  var Differences = GetDayDifferences();
  
  var TotalData = [];

  for (var i = 0; i < Data.length; i++ )
  {
    // this is the total changes divided by the difference in days
    var data = Data[i] / Differences[i];
    
    // now we round by doing some sneaky bad math
    data = Math.round( data * 100 ) / 100;
    
    TotalData.push(data);
  }
  
  return TotalData;
}

function GetDayDifferences()
{
  var days = [];
  var Dates = GetDates();
  var firstEntry = 90;
  
  for (var i = 0; i < Dates.length; i++ )
  {
    // this is the date of the update's release
    var updateDate = Dates[i];
    
    // this is the difference in days between this update and the previous (or the first entry's static amount)
    var difference = firstEntry;
    if ( i != 0 )
    {
      difference = DaysBetween( Dates[i], Dates[ i - 1 ] );
    }
    
    // remove the weekends = multiply by 5/7
    difference = ( difference * 5 ) / 7;
    
    days.push(difference);
  }
  
  return days;
}

function DaysBetween( date1, date2 )
{
  var day = 24 * 60 * 60 * 1000;
  
  var diff = date2 - date1;
  
  diff = Math.round( diff / day );
  
  return diff;
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
  
  SetupAdditionalGraph();
}

function SetupAdditionalGraph()
{
  var GraphLabels = GetYearLabels();
  
  var HeadlineData = GetFeatureDataByClassNameByYear("features");
  var SmallFeatureData = GetFeatureDataByClassNameByYear("balance");
  var BugfixData = GetFeatureDataByClassNameByYear("bugfixes");
  var EngineeringData = GetFeatureDataByClassNameByYear("engineering");
  
  var chart = new Highcharts.Chart('Graph3', {
    chart: {
        type: 'area'
    },
    title: {
        text: 'Changes by Year',
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

function ShowExtraGraphButton(checkboxElement)
{
  // hide button
  document.getElementById("ExtraGraphButton").style.display = "none";
  // show div
  document.getElementById("MoreInfo").style.display = "block";
  
  ShowAdvancedStats();
  
  // this graph shows changes / day sorted by release date
  var GraphLabels = GetLabels();
  
  var GraphData = GetAggregateData();
  
  var chart = new Highcharts.Chart('Graph2', {
    chart: {
        type: 'area'
    },
    title: {
        text: 'Changes per Day',
        align: 'left'
    },
    legend: {
        enabled: false
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
  
  chart.addSeries({                        
      name: 'Changes per Day',
      data: GraphData,
      color: '#f22760'
      }, false);
  
  chart.redraw();
}