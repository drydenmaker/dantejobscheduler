function LoadXCalendar(sLeague, sTarget)
{
	XCalendar.load(sLeague, sTarget);
}

XCalendar = {
		
	sTarget : '#main'
	,iMonth : 0
	,sLeague: ''
	,sURL : '/league/calendar/all/'
	,sLoadingMessage : '<div class="xcalender_loading"></div>'
	,load : function(sLeague, sTarget)
	{
		this.sLeague = (sLeague == undefined) ? this.sLeague : sLeague ;
		this.sTarget = (sTarget == undefined) ? this.sTarget : sTarget ;
		$(this.sTarget).html(this.sLoadingMessage).load(this.sURL + this.sLeague, {'addmonth': this.iMonth}, function(){
			XCalendar.setClicks();
		});
	}

	,setClicks : function()
	{
		$this = this;
		$($this.sTarget +' .calendar_next').bind('click', function(){
			$this.loadNext();
		});
		
		$($this.sTarget +' .calendar_previous').bind('click', function(){
			$this.loadPrevious();
		});
	}
	
	,loadNext : function()
	{
		this.iMonth++;
		this.load();
	}
	
	,loadPrevious : function()
	{
		this.iMonth--;
		if (this.iMonth < 0)
		{
			this.iMonth = 0
		}
		this.load();			
	}
		
	
}