  /*单链表*/
  // 用一组物理上不一定相邻的存储单元来存储线性关系的数据
  // 结构：除了存储自身数据以外，还包含一个指向后继的指针
  function Node(data,next){
    this.data = data;
    this.next = next;
  }
  /*初始化*/
  // 构建的链表分为有头结点和没有头结点（以下都没有头结点）
  /*尾插法*/
  // 构建链表时，每次都在链表的末尾添加节点
  function NodeList(arr){
    this._head = new Node(null,null);
    this._tail = this._head;
    for(var i of arr){
      var node = new Node(i,null);
      this._tail.next = node;
      this._tail = this._tail.next;
    }
    this._head = this._head.next;
  }
  /*头插法*/
  // 构建链表时，每次都在链表最前端的元素前面插入节点
  function NodeList(arr){
    var node,count = 0;
    this._head = new Node(null,null);
    this._tail = this._head;
    for(var i of arr){
      node = new Node(i,this._head);
      this._head = node;
      if(count === 0){
        this._head.next = null;
        this._tail = this._head;
        ++count;
      }
    }
  }
  /*插入算法*/
  // 插入算法分为前插和后插 节点p,带插入的节点为node
  // 前插 将节点插入到p节点的前面
  // 后插 将节点插入到p节点的后面
  // 对比，因为单链表是单向的，所以前插法时间复杂度O(n),后插法时间复杂度O(1)
  /*逆置单链表 -前插*/
  NodeList.prototype.reverse = function(){
    let re_head = null,re_tail = re_head;
    while(this._head){
      if(re_tail){
        re_head = new Node(this._head.data,re_head);
      }else{
        re_head = new Node(this._head.data,null);
        re_tail = re_head;
      }
      this._head = this._head.next;
    }
    this._head = re_head;
    this._tail = re_tail;
  }

  /*特定位置插入 -后插*/
  NodeList.prototype.insert =function(index,data){
    var count = 0,
        node = this._head,
        curNode = new Node(data,null);
    while(count < index-1 && node){
      if(count!=0){
        node = node.next;
      }
      ++count;
    }
    if(count === 0){
      curNode.next = this._head;
      this._head = curNode;
    }else if(node){
      curNode.next = node.next;
      node.next = curNode;
    }else{
      this._tail.next = curNode;
      this._tail = curNode;
    }
  }
  /*删除算法*/
  NodeList.prototype.delete =function(index){
    var count = 0,
        node = this._head,
        delnode;
    while(count < index-1 && node){
      if(count!=0){
        node = node.next;
      }
      ++count;
    }
    if(count === 0){
      this._head = this._head.next;
    }else if(node.next){
      if(node.next === this._tail){
        this._tail = node;
      }
      node.next = node.next.next;
    }
  }

  /*合并有序列表*/
  // 1->2->3->9   1->4->5->6
  // 两个指针指向链表头,互相比较，较小者插入结果链表的末尾，相同则合并
  function merge(list1,list2){}

  /*一元多项式相加*/
  /*ax^n*/
  function Item(a,n,next){
    this.a = a;
    this.n = n;
    this.next = next;
  }

  function mergePolynomial(p1,p2){
    var _head = new Item(),_tail = _head,sum;
    debugger;
    while(p1&&p2){
      if(p1.n < p2.n){
        _tail.next = new Item(p1.a,p1.n,null);
        p1 = p1.next;
        _tail = _tail.next;
      }else if(p1.n === p2.n){
        sum = p1.a + p2.a;
        if(sum != 0){
          _tail.next = new Item(sum,p1.n,null);
          _tail = _tail.next;
        }
        p1 = p1.next;
        p2 = p2.next;
      }else if(p1.n > p2.n){
        _tail.next = new Item(p2.a,p2.n,null);
        p2 = p2.next;
        _tail = _tail.next;
      }
    }
    while(p1){
      _tail.next = new Item(p1.a,p1.n,null);
      p1 = p1.next;
    }
    while(p2){
      _tail.next = new Item(p2.a,p2.n,null);
      p2 = p2.next;
    }
    return _head;
  }

  /*双向链表*/
  function TNode(pre,data,next){
    this.pre = pre;
    this.data = data;
    this.next = next;
  }