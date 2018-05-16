字符串匹配kmp算法
暴力匹配时，会产生回溯，父串中有类似字串较多时性能消耗比较大
在父子串匹配到某一位置时，发生不匹配情况，直接将字串指针进行移动不回溯，就能达到比较高的效率，
如何确定某一个位置失配后字串的指针应该移动到哪里呢。
假设
s0......si
  t0....tj
ij位置时开始失配则有 s(i-j)......s(i-1) == t0......t(j-1)
如果存在某个k位置，则将字串的指针移动到 t(k) 的位置与si进行比较
s0...s(i-k)...si
     t0.......tk
此时 s(i-k)...s(i-1) == t0...t(k-1)
j>k所以i-j<i-k
第一个表达式可以截取k个字符
s(i-k)...s(i-1) == t(j-k-1)...t(j-1)
可得
t0...t(k-1) == t(j-k-1)...t(j-1)
综上，要满足位移条件的话，就需要满足的是 字串中已匹配部分前k个和后k个字符相同，
个k就是字串失配后指针应该指向的地方
这样的话，那字串的每一个位置都应该有一个这样的k值，
表示匹配到这个位置时失配的话指针应该位移到哪个位置
对应就会有一个数组，权且叫他next数组，这个数组呢第一位永远是-1
 a b c a b a a c
-1 0 0 0 1 2 1 1

t0 t1 ... tj-1 tj 前k个和后k个相同 则 next[j] = k
已知 next[0] = -1 相当于就是 next[j]已知，所求的是 next[j+1]
若t[j]==t[k]则next[j+1]=k+1
否则k=next[k] //取 上一个 最长前后匹配串中找最长匹配串，
// 因为包含这种匹配串的串前后一样所以从中取的串满足条件

function getNext(str){
	let next = [-1];
	let i = 0;
	let k = -1;
	while(i<str.length-1){
		if(k===-1||str[i]===str[k]){
			next[++i] = ++k;
		}else{
			k = next[k];
		}
	}
	return next;
}
function kmp(s,t,next){
	let sl = s.length;
	let tl = t.length;
	let i = j = 0;
	while(i<sl && j<tl){
		if(j===-1||s[i]===t[j]){
			i++;
			j++;
		}else{
			j = next[j];
		}
	}

}
function getNext(str) {
	let next = [-1];
	let i = 1;
	let k = -1;
	while(i<str.length){
		if(k===-1||str[i-1]===str[k]){
			k++;
			next[i] = k;
			i++;
		}else{
			k = next[k];
		}
	}
	return next;
}