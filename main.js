
function CheckBoxHeadline(checkboxElement)
{
  var IsChecked = checkboxElement.checked;
  
  var features = document.getElementsByClassName("features");
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

function CheckBoxBalance(checkboxElement)
{
  var IsChecked = checkboxElement.checked;
  
  var balance = document.getElementsByClassName("balance");
  for ( var i = 0; i < balance.length; i++ )
  {
    if ( IsChecked )
    {
      balance[i].style.display = "block";
    }
    else
    {
      balance[i].style.display = "none";
    }
  }
}

function CheckBoxBugfix(checkboxElement)
{
  var IsChecked = checkboxElement.checked;
  
  var bugfixes = document.getElementsByClassName("bugfixes");
  for ( var i = 0; i < bugfixes.length; i++ )
  {
    if ( IsChecked )
    {
      bugfixes[i].style.display = "block";
    }
    else
    {
      bugfixes[i].style.display = "none";
    }
  }
}

function CheckBoxEngineering(checkboxElement)
{
  var IsChecked = checkboxElement.checked;
  
  var engineering = document.getElementsByClassName("engineering");
  for ( var i = 0; i < engineering.length; i++ )
  {
    if ( IsChecked )
    {
      engineering[i].style.display = "block";
    }
    else
    {
      engineering[i].style.display = "none";
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
  let headlines = GetTotalHeadlineFeatures();
  let balance = GetTotalBalanceChanges();
  let bugs = GetTotalBugfixes();
  let engineering = GetTotalEngineeringChanges();
  
  document.getElementById("FeatureLabel").innerHTML = "Headline Features (" + headlines + ")";
  document.getElementById("BalanceLabel").innerHTML = "Balance Changes and Small Features (" + balance + ")";
  document.getElementById("BugfixLabel").innerHTML = "Bug Fixes (" + bugs + ")";
  document.getElementById("EngineeringLabel").innerHTML = "Engineering Work (" + engineering + ")";
}

function GetTotalEntries()
{
  let headline = GetTotalHeadlineFeatures();
  let balance = GetTotalBalanceChanges();
  let bugs = GetTotalBugfixes();
  let engineering = GetTotalEngineeringChanges();
  
  return headline + balance + bugs + engineering;
}

function GetTotalHeadlineFeatures()
{
  var features = document.getElementsByClassName("features");
  
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

function GetTotalBalanceChanges()
{
  var balance = document.getElementsByClassName("balance");
  
  let total = 0;
  
  for ( var i = 0; i < balance.length; i++ )
  {
    var children = balance[i].children;
    
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

function GetTotalBugfixes()
{
  var bugfixes = document.getElementsByClassName("bugfixes");
  
  let total = 0;
  
  for ( var i = 0; i < bugfixes.length; i++ )
  {
    var children = bugfixes[i].children;
    
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

function GetTotalEngineeringChanges()
{
  var engineering = document.getElementsByClassName("engineering");
  
  let total = 0;
  
  for ( var i = 0; i < engineering.length; i++ )
  {
    var children = engineering[i].children;
    
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