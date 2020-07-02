function Node(value) {
  this.value = value;
  this.children = [];
}
Node.prototype.add = function(item) {
  if (Object.prototype.toString.call(item) === '[Object Array]') {
    this.children = this.children.concat(item);
  }
  if (item instanceof this.constructor) {
    this.children.push(item);
  }
};

// 遍历树 深度
function print(node) {
  if (!node) {
    return;
  }
  console.log(node.value); //先序
  node.children.forEach(function(item) {
    print(item);
  });
  console.log(node.value); //后序
}
function print(node) {
  let queue = [node];
  let item;
  while (queue.length) {
    item = queue.shift();
    console.log(item.value);
    queue = item.children.concat(queue);
  }
}
// 层次遍历 广度
function levelPrint(node) {
  let queue = [node];
  let item;
  while (queue.length) {
    item = queue.shift();
    console.log(item.value);
    item.children.forEach(function(each) {
      queue.push(each);
    });
  }
}

function Node(value) {
  this.value = value;
  this.left = null;
  this.right = null;
}
// 先序遍历构造二叉树
// pre [abd**e**cf***]
function createByPre(nodes) {
  let value = nodes[window.count];
  window.count++;
  if (value === '*') {
    return null;
  }
  let node = new Node(value);
  debugger;
  node.left = createByPre(nodes);
  node.right = createByPre(nodes);
  return node;
}

function create() {
  let nodes = ['a', 'b', 'd', '*', '*', 'e', '*', '*', 'c', 'f', '*', '*', '*'];
  window.count = 0;
  return createByPre(nodes);
}
// 先序+中序构造二叉树
function createByPreMid(pre, mid, i, j, count) {
  if (count === 0) {
    return null;
  }
  let node = new Node(pre[i]);
  let len = 0;
  while (len < count && pre[i] !== mid[j + len]) {
    len++;
  }
  // for (;len<count;len++) {
  // 	if(pre[i]===mid[j+len]){
  // 		break;
  // 	}
  // }
  node.left = createByPreMid(pre, mid, i + 1, j, len);
  node.right = createByPreMid(
    pre,
    mid,
    i + 1 + len,
    j + 1 + len,
    count - 1 - len
  );
  return node;
}
function create() {
  let pre = 'abhfdeckg',
    mid = 'hbdfaekcg';
  return createByPreMid(pre, mid, 0, 0, pre.length);
}
// 计算节点数
function countNodes(node) {
  if (!node) {
    return 0;
  }
  let left = countNodes(node.left);
  let right = countNodes(node.right);
  return left + right + 1;
}
// 计算高度
function countHeight(node) {
  if (!node) {
    return 0;
  }
  let left = countHeight(node.left);
  let right = countHeight(node.right);
  return left > right ? left + 1 : right + 1;
}

// 查找节点
function searchNode(node, value) {
  if (!node) {
    return null;
  }
  if (node.value === value) {
    return node;
  }
  let res = searchNode(node.left, value);
  if (res) {
    return res;
  }
  return searchNode(node.right, value);
}
// 查找父节点
function searchParent(node, value) {
  if (!node) {
    return null;
  }
  if (
    (node.left && node.left.value === value) ||
    (node.right && node.right.value === value)
  ) {
    return node;
  }
  let res = searchParent(node.left, value);
  if (res) {
    return res;
  }
  return searchParent(node.right, value);
}

// 线索二叉树-先序中序后序线索二叉树
function CluerNode(value) {
  this.value = value;
  this.left = null;
  this.right = null;
  this.ltype = 0;
  this.rtype = 0;
}
// 普通树转化为前序线索树结构
function cluerTree(node) {
  if (!node) {
    return;
  }
  if (node.left) {
    node.ltype = 0;
  } else {
    node.ltype = 1;
    node.left = window.node;
  }
  if (node.right) {
    node.rtype = 0;
  } else {
    node.rtype = 1;
  }

  if (window.node && window.node.rtype === 1) {
    window.node.right = node;
  }
  window.node = node;
  if (node.ltype === 0) {
    cluerTree(node.left);
  }
  if (node.rtype === 0) {
    cluerTree(node.right);
  }
}
// 线索树查查找 前驱 后继
function searchBefore(node) {}
function searchAfter() {}

// huffmanTree
function Node(key, value) {
  this.key = key;
  this.value = value;
  this.left = null;
  this.right = null;
  this.parent = null;
}
// 计算字符串中字符的出现频率
function count(str) {
  let obj = {};
  for (let i = 0, len = str.length; i < len; i++) {
    if (obj[str[i]] === undefined) {
      obj[str[i]] = 1;
    } else {
      obj[str[i]] += 1;
    }
  }
  return obj;
}
// 取出出现频率最小的两个字符
function minTwo(obj) {
  let keys = Object.keys(obj);
  if (keys.length === 0) {
    return [];
  } else if (keys.length === 1) {
    return keys;
  } else if (keys.length === 2) {
    return obj[keys[0]] < obj[keys[1]] ? keys : keys.reverse;
  }
  let min1 = keys[0],
    min2 = keys[1];
  if (obj[min1] > obj[min2]) {
    min1 = keys[1];
    min2 = keys[0];
  }
  for (let i = 2, len = keys.length; i < len; i++) {
    let value = obj[keys[i]];
    if (value < obj[min1]) {
      min2 = min1;
      min1 = keys[i];
    } else if (value < obj[min2]) {
      min2 = keys[i];
    }
  }
  return [min1, min2];
}
// 构造huffmanTree
function buildHuffmanTree(obj) {
  let _obj = Object.assign({}, obj);
  let keys = Object.keys(_obj);
  let resObj = {},
    root = {};
  while (keys.length > 1) {
    let min2 = minTwo(_obj);
    let m1 = min2[0],
      m2 = min2[1],
      par;
    if (root[m1] === undefined) {
      m1 = new Node(m1, _obj[m1]);
      resObj[m1.key] = m1;
    } else {
      m1 = root[m1];
      delete root[m1.key];
    }
    if (root[m2] === undefined) {
      m2 = new Node(m2, _obj[m2]);
      resObj[m2.key] = m2;
    } else {
      m2 = root[m2];
      delete root[m2.key];
    }
    par = new Node(m1.key + '' + m2.key, m1.value + m2.value);
    par.left = m1;
    par.right = m2;
    m1.parent = m2.parent = par;

    root[par.key] = par;

    _obj[par.key] = par.value;
    delete _obj[m1.key];
    delete _obj[m2.key];
    keys = Object.keys(_obj);
  }
  return { root, resObj };
}
// 编码单个字符
function encodePoint(resObj, char) {
  let codeObj = resObj[char],
    code = '';
  while (codeObj.parent) {
    if (codeObj.parent.left === codeObj) {
      code += '0';
    } else if (codeObj.parent.right === codeObj) {
      code += '1';
    }
    codeObj = codeObj.parent;
  }
  return code
    .split('')
    .reverse()
    .join('');
}
// huffman串编码
function encodeHuffman(str) {
  let obj = count(str);
  let res = buildHuffmanTree(obj);
  let code = '';
  for (let i = 0, len = str.length; i < len; i++) {
    code += encodePoint(res.resObj, str[i]);
  }
  return code;
}

// 解码huffman
function decodeHuffman(root, str) {
  let node = Object.assign({}, root);
  let decode = '';
  str.split('').forEach((item, index) => {
    item = parseInt(item);
    if (item === 0) {
      node = node.left;
    } else if (item === 1) {
      node = node.right;
    }
    if (!node.left && !node.right) {
      decode += node.key;
      node = Object.assign({}, root);
    }
  });
  return decode;
}
function main() {
  let str = 'fdsae-q30=5lkngfhdoaiyf3827q5403=]gfdsnklfpwy';
  let obj = count(str);
  let res = buildHuffmanTree(obj);
  let encode = encodeHuffman(str);
  let decode = decodeHuffman(res.root[Object.keys(res.root)[0]], encode);
  console.log(str, '\r\n', obj, '\r\n', res, '\r\n', encode, '\r\n', decode);
}
