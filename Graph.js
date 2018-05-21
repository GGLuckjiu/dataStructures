// 图的邻接矩阵
//   a b c d e f
// a 0 3 2 I 1 I
// b 3 0 I 3 8 I
// c 2 I 0 7 I I
// d I 3 7 0 I I
// e 1 8 I I 0 I
// f I I I I I 0    I=Infinity 无向网

//   a b c d e f
// a 0 2 1 I I I
// b I 0 I I I I
// c 1 I 0 7 I I
// d I 2 I 0 I 6
// e I 3 I 4 0 5
// f I I I I I 0    I=Infinity 有向网

function Vertex(value){
	this.value = value;
	this.next = null;
}
function PosPoint(pos,weight){
	this.pos = pos;
	this.weight = weight;
	this.next = null;
}
function Graph(){
	this.vertexNum = 0;
	this.edgeNum = 0;
	this.graph = [];//主链表
	this.visited = {};//访问标志
	this.graphPos = {};//节点名称与节点位置的对应关系
	this.route = [];
}
// 初始化一些必要数据成员
Graph.prototype.init = function(){
	this.graph.forEach((item,index)=>{
		this.graphPos[item.value] = index;
		this.visited[item.value] = false;
	});
}
// 将图的邻接矩阵转化成邻接表
Graph.prototype.buildMap = function(vertexArr,edgeArr){
	this.vertexNum = vertexArr.length;
	vertexArr.forEach((item,index)=>{
		this.graph.push(new Vertex(item));
	});
	edgeArr.forEach((oItem,oIndex)=>{
		let head = this.graph[oIndex];
		edgeArr[oIndex].forEach((iItem,iIndex)=>{
			if(iItem===Infinity || iItem===0){
				return ;
			}
			head.next = new PosPoint(iIndex,iItem);
			head = head.next;
		});
	});
}
// 深度遍历
Graph.prototype.Deep = function deep(start){
	let _order = {};
	if(arguments.length === 0){
		start = 0;
		this.graph.forEach((item,index)=>{
			_order[item.value] = index;
			this.visited[item.value] = false;
		});
	}
	let point = this.graph[start];
	this.visited[point.value] = true;
	console.log(point.value);
	while(point.next){
		point = point.next;
		if(!this.visited[this.graph[point.pos]['value']]){
			deep.call(this,point.pos);
		}
	}

	// 非连通图 遍历剩下的节点
	if(JSON.stringify(_order)!=='{}'){
		for(let item in this.visited){
			if(!this.visited[item]){
				deep.call(this,_order[item]);
			}
		}
	}
}
// 广度遍历
Graph.prototype.Broad = function broad(start){
	let _order = {};
	if(arguments.length === 0){
		start = 0;
		this.graph.forEach((item,index)=>{
			_order[item.value] = index;
			this.visited[item.value] = false;
		});
	}
	let queue = [];
	this.visited[this.graph[start]['value']] = true;
	queue.push(start);
	while(queue.length>0){
		start = queue.shift();
		console.log(this.graph[start].value);
		start = this.graph[start];
		while(start.next){
			start = start.next;
			if(!this.visited[this.graph[start.pos]['value']]){
				this.visited[this.graph[start.pos]['value']] = true;
				queue.push(start.pos);
			}
		}
		if(queue.length===0){
			for(let item in this.visited){
				if(!this.visited[item]){
					this.visited[item] = true;
					queue.push(_order[item]);
					// 这里应该一个个添加
					break;
				}
			}
		}
	}
}
// 连通图 两个顶点之间的全部路径
Graph.prototype.Roads = function roads(start,end){
	let point = this.graph[this.graphPos[start]];
	this.visited[start] = true;
	this.route.push(start);
	if(start === end){
		console.log(this.route.join('-'));
		return ;
	}
	while(point.next){
		point = point.next;
		let vertex = this.graph[point.pos];
		if(!this.visited[vertex.value]){
			roads.call(this,vertex.value,end);
			this.route.pop();
			this.visited[vertex.value] = false;
		}
	}
}
//联通图 两点之长度为len的全部路径
Graph.prototype.distanceRoads = function distanceRoads(start,end,len){
	let point = this.graph[this.graphPos[start]];
	this.visited[start] = true;
	this.route.push(start);
	if(start === end && len === 0){
		console.log(this.route.join('-'));
		return ;
	}
	while(point.next){
		point = point.next;
		let vertex = this.graph[point.pos];
		if(!this.visited[vertex.value]){
			distanceRoads.call(this,vertex.value,end,len-point.weight);
			this.route.pop();
			this.visited[vertex.value] = false;
		}
	}
}

// 判断二部图（连通图？非连通，只有两种节点，0和1，同类节点之间没有路径）
Graph.prototype.halfGraph = function halfgraph(start){//start 数字
	let _order = {},_visited={};//-1-标记 0-未访问 1-标记
	this.graph.forEach((item,item)=>{
		_order[item.value]=item;
		_visited[item.value]=0;
	});
	let point = this.graph[start];
	_visited[point.value] = 1;
	let queue = [];
	queue.push(point);
	while(queue.length>0){
		point = queue.pop();
		let status = _visited[point.value];
		while(point.next){
			if(_visited[point.next.value]===0){
				point = point.next;
				_visited[point.value] = -(status);
			}else if(_visited[point.next.value] === point){
				return false;
			}
		}
		if(queue.length===0){
			for(let key in _visited){
				if(_visited[key]===0){
					queue.push(this.graph[_order[key]]);
					break;
				}
			}
		}
	}
	return true;
}

// 最小生成树
// prime算法 - 邻接矩阵方式 权重为0的是自身
Graph.prototype.getMinCostOrder = function(arr){
	let minOrder = 0;
	arr.forEach((item,index)=>{
		if(arr[index]['cost']<arr[minOrder]['cost'] && arr[index]['cost']!==0){
			minOrder = index;
		}
	});
	return minOrder;
}
Graph.prototype.minPrim = function minprim(vertex,graphMatrix,start) {
	let template = [];//{name:'a',cost:1}
	vertex.forEach((item,index)=>{
		template.push({
			name:item,
			cost:graphMatrix[start][0]
		});
	});
	for(let i=1,len=vertex.length;i<len;i++){
		let minOrder = this.getMinCostOrder(template);
		console.log(start,'-',template[minOrder]['name'],'-',template[minOrder]['cost']);
		template[minOrder]['cost'] = 0;
		for(let j=0;j<len;j++){
			if(graphMatrix[j][minOrder]<template[j]['cost']){
				template[j]['cost'] = graphMatrix[j][minOrder];
			}
		}
	}
}

function main(){
	let vertex = ['a','b','c','d','e','f'];
	let graphMatrix = [
	[0,3,2,Infinity,1,Infinity],
	[3,0,Infinity,3,8,Infinity],
	[2,Infinity,0,7,Infinity,Infinity],
	[Infinity,3,7,0,Infinity,Infinity],
	[1,8,Infinity,Infinity,0,Infinity],
	[Infinity,Infinity,Infinity,Infinity,Infinity,0]
	];
	let graph = new Graph();
	graph.buildMap(vertex,graphMatrix);
	console.log(graph);
	graph.Deep();
	graph.Broad();
	graph.init();
	graph.Roads('a','b');
	graph.distanceRoads('a','b',9);
}











