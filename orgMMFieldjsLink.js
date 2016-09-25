var orgMMField = orgMMField || {}; 
var fieldCount = 0;

// Create a function for customizing the Field Rendering of our fields 
orgMMField.CustomizeFieldRendering = function () {  
    var fieldJsLinkOverride = {};
    fieldJsLinkOverride.Templates = {};
    fieldJsLinkOverride.Templates.Fields = 
    { 
        'DocumentType': 
        { 
            'View': orgMMField.ShowTermLabel
        } 		
    }; 

    // Register the rendering template
    SPClientTemplates.TemplateManager.RegisterTemplateOverrides(fieldJsLinkOverride); 
}; 

orgMMField.ShowTermLabel = function (ctx)  
{ 
    var docTypePath = ctx.CurrentItem.DocumentType; 
	var termToShow = "";
	var fullPathTermToShow = "";
    
	if (docTypePath != undefined && docTypePath != "")
	{
	   fullPathTermToShow = docTypePath.Label.replace(/:/g,' <strong>&gt;</strong> ');
   	   var terms = docTypePath.Label.split(':');
	   termToShow = terms[terms.length-1];
	}
	var spanLabel = "termSpan" + fieldCount;
	fieldCount ++;
	return "<span class='orgSpanhover' onmouseover='ofSwitchTermDisplay(event,this,0)' onmouseout='ofSwitchTermDisplay(event,this,1)' term='" + termToShow + "' fullPath='" + fullPathTermToShow + "' id='" + spanLabel + "' >" + termToShow + "</span>";
	
	};
	
orgMMField.CustomizeFieldRendering();

function ofSwitchTermDisplay(event,x,show)
{
	var spanID = "#" + $(x).attr("id");
	var fullPath = $(x).attr("fullPath");
	var bottomTerm = $(x).attr("term");
	
    if (show == 0)
	{
		createTooltip(event,fullPath)
	}
	else
	{
		$('div.tooltip').hide();
	}
}

var firstToolTip = 0;
function createTooltip(event,fullPath){          
    if (firstToolTip == 0)
	{
       $('<div class="tooltip" style="color: #ffffff;background: #0072c6; border: 1px solid #cccccc;border-radius: 1px;">&nbsp;' + fullPath + '</div>').appendTo('body');
	   firstToolTip = 1;
	}
	else
	{
		$('div.tooltip').html(fullPath);
		$('div.tooltip').show();
	}
	
    positionTooltip(event);        
};
function positionTooltip(event){
    var tPosX = event.pageX - 10;
    var tPosY = event.pageY;
    $('div.tooltip').css({'position': 'absolute', 'top': tPosY, 'left': tPosX});
};