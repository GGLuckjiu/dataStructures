/*二维数组转一维数组*/
/*对称矩阵压缩 二维对角对称矩阵*/
// 1 2 3 4
// 2 3 4 5
// 3 4 5 6
// 4 5 6 7
// 二维坐标和一维的对应关系
// a[i][j] ==> b[k]
// k=  i*(i+1)/2+j i>=j
//     j*(j+1)/2+i i<j
/*压缩为一维数组*/
function transform(source){
	let dest = [];
	for(let i = 0,len = source.length;i<len;i++){
		for(let j = 0;j<=i;j++){
			dest.push(dest[i][j]);
		}
	}
	return dest;
}
/*二维对应一维关系*/
function Mapping(i,j){
	if(i<=j){
		return i*(i+1)/2+j;
	}else{
		return j*(j+1)/2+i;
	}
}

/*上三角矩阵-上面数据不同下面为同一个值*/
// 1 0 0
// 2 3 0
// 4 5 6
function transform(source){
	let dest = [];
	for(let i = 0,len = source.length;i<len;i++){
		for(let j = 0;j<=i;j++){
			dest.push(dest[i][j]);
		}
	}
	dest.push(source[0][source[0].length]);
	return dest;
}
/*二维对应一维关系*/
function Mapping(i,j,dest){
	if(i<=j){
		return dest[i*(i+1)/2+j];
	}else{
		return dest[source.length-1];
	}
}

/*对角矩阵 奇数对角线*/
// x x o o
// x x x o
// o x x x
// o o x x
// function transform(source){
// 	let dest = [],
// 		k = ensuerK(source);
// 	for(let i = 0,len = source.length;i<len;i++){
// 		for(let j = 0;j<=i;j++){
// 			if(Math.abs(i-j)<=(k-1)/2){
// 				dest.push(dest[i][j]);
// 			}
// 		}
// 	}
// 	if((k+1)/2<source[0].length){
// 		dest.push(source[0][source[0].length]);
// 	}
// 	return dest;
// }
// function ensuerK(source){
// 	let ary = source[0],count=0,template=ary[0];
// 	for(let i = 0,len = source.length;i<len;i++){
// 		if(template === ary[i]){
// 			++count;
// 		}
// 	}
// 	return 2*count-1;
// }
// /*二维对应一维关系*/
// function Mapping(i,j,source,dest){
// 	let k = ensuerK(source)
// 		n = source[0].length;
// 	if(Math.abs(i-j)<=(k-1)/2){
// 		k*i
// 		return 
// 	}else{
// 		return dest[0][(k+1)/2];
// 	}
// }

/*矩阵逆置算法*/
// 非零元素节点类
function Node(row,col,number){
	this.row = row;
	this.col = col;
	this.number = number;
}
function matrix(rows,cols,number,nonZero){
	this.rows = rows;
	this.cols = cols;
	this.number = number;
	this.nonZero = nonZero;
}
/*朴素逆置*/
// 时间复杂度 cols*n n如果是rows*cols的话最差
matrix.prototype.trans = function(){
	let dest = new matrix(this.cols,this.rows,this.number,[]);
	for(let col = 0;col<this.cols;col++){
		for(let j = 0;j<this.number;j++){
			if(col === this.nonZero[j].col){
				dest.nonZero.push(new Node(this.nonZero[j].col,this.nonZero[j].row,this.nonZero[j].number));
			}
		}
	}
}
/*快速逆置*/
// 时间复杂度 n+cols+n
matrix.prototype.transfast = function(){
	let dest = new matrix(this.cols,this.rows,this.number,[]),
		nums = [],
		pos = [0];
	for(let num = 0;num<this.number;num++){
		if(nums[this.nonZero[num]] === undefined){
			nums[this.nonZero[num]] = 1;
		}else{
			++nums[this.nonZero[num]];
		}
	}
	for(let col = 1;col<this.cols;col++){
		if(nums[col-1] === undefined){
			nums[col] = 0;
		}
		pos[col] = pos[col-1] + nums[col-1];
	}
	for(let count = 0;count<this.number;count++){
		let col = this.nonZero[count].col,
			pos = pos[col];
		dest.nonZero[pos] = new Node(this.nonZero[count].row,this.nonZero[count].col,this.nonZero[count].number);
		++pos[col];
	}
}