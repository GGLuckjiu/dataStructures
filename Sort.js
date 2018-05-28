function SArray(){
	let arr = new Array();
	Array.prototype.push.apply(arr,arguments);
	arr.bubbleSort = bubbleSort;
	return arr;
}

// 冒泡排序
function bubbleSort(){
	let arr = Object.assign([],this);
	for(let i=0,i=arr.length;i<len;i++){
		for(let j=i+1;j<len;j++){

		}
	}
}