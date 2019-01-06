function SArray(){
	let arr = new Array();
	Array.prototype.push.apply(arr,arguments);
	arr.bubbleSort = bubbleSort;
	arr.betterBubbleSort = betterBubbleSort;
	arr.selectSort = selectSort;
	arr.insertSort = insertSort;
	return arr;
}

// 冒泡排序
function bubbleSort(){
	let arr = Object.assign([],this);
	let temp;
	for(let i=0,len=arr.length;i<len;i++){
		for(let j=0;j<len-i;j++){
			if(arr[j]>arr[j+1]){
				temp = arr[j];
				arr[j] = arr[j+1];
				arr[j+1] = temp;
			}
		}
	}
	return arr;
}
function betterBubbleSort(){
	let arr = Object.assign([],this),
		temp,
		exchange = false;
	for(let i=0,len=arr.length;i<len;i++){
		exchange = false;
		for(let j=0;j<len-i;j++){
			if(arr[j]>arr[j+1]){
				temp = arr[j];
				arr[j] = arr[j+1];
				arr[j+1] = temp;
			}else{
				exchange = true;
			}
		}
		if(!exchange){
			break;
		}
	}
	return arr;
}

// 选择排序
function selectSort(){
	let arr = Object.assign([],this);
	let temp;
	for(let i=0,len=arr.length;i<len-1;i++){
		for(let j=i+1;j<len;j++){
			if(arr[i]>arr[j]){
				temp = arr[i];
				arr[i] = arr[j];
				arr[j] = temp;
			}
		}
	}
	return arr;
}

// 插入排序 -- 取数再插入
function insertSort(){
	var arr = Object.assign([],this);
	for(let i=1,len=arr.length;i<len;i++){
		let temp = arr[i];
		let j = i-1;
		while(temp<arr[j]&&j>=0){
			arr[j+1] = arr[j];
			j--;
		}
		arr[j+1] = temp;
	}
	return arr;
}