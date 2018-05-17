/*串*/
// 存储方式分为线性和链式
// 即为数组（利用率高）和链表（利用率低）
// 为了提高利用率，大段文本，以行位单位链式存储，行中进行顺序存储 

/*串的模式匹配(在a串中找b串)*/
/*Brute-Force BF算法*/
function BruteForce(s1,s2){
	let i = 0,
		j = 0,
		len1 = s1.length,
		len2 = s2.length;
	while(i<len1 && j<len2){
		if(s1[i] === s2[j]){
			++i;
			++j;
		}else{
			i = i-j+1;
			j=0;
		}
	}
	if(j===len2){
		return i-j+1;
	}else{
		return -1;
	}
}

/*KMP算法*/
// 求next数组
function next(str){
	let next = [-1],
		k=-1,
		j=0;
	while(j<str.length-1){
		let strj = str[j],strk = str[k];
		if(k===-1 || strj === strk){
			++j;
			++k;
			next[j] = k;
		}else{
			k = next[k];
		}
	}
	return next;
}
// 减少回溯降低复杂度
function KMP(s,t){
	let i = 0,
		j = 0;
	while(i<s.length && j<t.length){
		if(j === -1 || s[i]===t[j]){
			++i;
			++j;
		}else{
			j = next(t)[j];
		}
	}
	console.log(i,j)
	if(j>=t.length){
		return i-t.length;
	}else{
		return -1;
	}
}