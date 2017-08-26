


$(document).ready(function(){
	var test = window.location.href;
	console.log(test);
	var myChart = echarts.init(document.getElementById('table'));
	maketable();
	var days=['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
	var week = new Date().getDay(); 
	var url="https://api.seniverse.com/v3/weather/daily.json?key=0lljanxsvjzoofh4&location=ip&language=zh-Hans&unit=c&start=0&days=5";
	console.log(url);
	var htmlobj=$.ajax({
		type:"get",
		url:url,
		async:true,
		//dataType:"jsonp",
        success : function(data){
            getdata(data);
        },
        error:function(){
            console.log('fail');
        }
	});
	
	function getdata(data){
	
		var city=data.results[0].location.name+"市";
		console.log(city);
		var date=[];
		var high=[];
		var low=[];
		var dates=data.results[0].daily;
		for(var i=0;i<dates.length;i++){
			high.push(parseInt(dates[i].high));
			low.push(parseInt(dates[i].low));
		}
		var max=Math.max.apply(Math,high);
		var min=Math.min.apply(Math,low);
		myChart.hideLoading();
		myChart.setOption({
			title:{
				subtext:city
			},
			xAxis:{
				data:[days[week],days[(week+1)%7],days[(week+2)%7]]
			},
			yAxis:{
				min:min-1,
				max:max+1
			},
			series:[
				{
					name:'最高气温',
					data:high
				},
				{
					name:'最低气温',
					data:low
				},
			]
			
		})
		
	}
	
	function maketable(){
	
		option = {
			title:{
				text:'未来几天气温变化',
				subtext:''
			},		
			tooltip:{
				trigger :'axis'
			},
			legend:{
				data:['最高气温','最低气温']
			},
			toolbox:{
				show:true,
				feature:{
					dataView:{readOnly:false},
					magicType:{type:['line','bar']},
					restore:{},
					saveAsImage:{}
				}
			},
			xAxis: {
				type:'category',
				boundaryGap:false,
				data:[]
			},
			yAxis:{
				type:'value',
				scale: true,
				axisLabel:{
					formatter:'{value} °C'  
				}
			},
			series:[
				{
					name:'最高气温',
					type:'line',
					data:[],
					markPoint:{
						data:[
							{type:'max',name:'最大值'},
							{type:'min',name:'最小值'}
						]
					},
					markLine:{
						data:[
							{type:'average',name:'平均值'}
						]
					}
				},
				{
					name:'最低气温',
					type:'line',
					data:[],
					markPoint:{
						data:[
							{type:'max',name:'最大值'},
							{type:'min',name:'最小值'}
						]
					},
					markLine:{
						data:[
							{type:'average',name:'平均值'}
						]
					}
				}
			]
		}
		myChart.showLoading();
		myChart.setOption(option);

	}
	
});


