
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
  
  var commentary = document.getElementsByClassName("commentary");
  for ( var i = 0; i < commentary.length; i++ )
  {
    if ( IsChecked )
    {
      commentary[i].style.display = "block";
    }
    else
    {
      commentary[i].style.display = "none";
    }
  }
}