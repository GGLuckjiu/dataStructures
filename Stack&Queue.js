  // 栈=>先进后出的数据结构
  // 队列=>先进先出的数据结构
  /*单链表*/
  function Node(data,next){
    this.data = data;
    this.next = next;
  }
  /*栈*/
  function Stack(){
    /*带头结点*/
    // this._head = new Node(null,null);
    /*不带头结点*/
    this._head = null;
    this._tail = this._head;
  }
  Stack.prototype.length = function(){
    var num=0,
        node = this._head;
    while(node){
      node = node.next;
      ++num;
    }
    return num;
  }
  Stack.prototype.push = function(data){
    if(this._tail){
      this._tail.next = new Node(data,null);
      this._tail = this._tail.next;
    }else{
      this._tail = new Node(data,null);
      this._head = this._tail;
    }
  };
  Stack.prototype.pop = function(){
    if(this._head == null){
      return null;
    }
    var node = this._tail,head = this._head;
    if(this._head === this._tail){
      this._head = null;
      this._tail = this._head;
      return node.data;
    }else{
      while(head.next != this._tail){
        head = head.next;
      }
      this._tail = head;
      return node.data;
    }
  };
  Stack.prototype.top = function(){
    if(this._tail){
      return this._tail.data;
    }else{
      return null;
    }
  };
  Stack.prototype.empty = function(){
    return this._head == null;
  };
  /*队列*/
  function Queue(){
    this._head = null;
    this._tail = this._head;
  }
  Queue.prototype.length = function(){
    var num=0,
        node = this._head;
    while(node){
      node = node.next;
      ++num;
    }
    return num;
  }
  Queue.prototype.enQueue = function(data){
    if(!this._head){
      this._head = new Node(data,null);
      this._tail = this._head;
    }else{
      this._tail.next = new Node(data,null);
      this._tail = this._tail.next;
    }
  };
  Queue.prototype.deQueue = function(){
    if(!this._head){
      return null;
    }else{
      var node = this._head;
      this._head = this._head.next;
      return node.data;
    }
  };
  Queue.prototype.empty = function(){
    return this._head === null;
  };

  /*双向链表*/
  function TNode(pre,data,next){
    this.pre = pre;
    this.data = data;
    this.next = next;
  }
  /*栈*/
  function TStack(){
    this._head = null;
    this._tail = null;
  }
  TStack.prototype.length = function(){
    var num=0,
        node = this._head;
    while(node){
      node = node.next;
      ++num;
    }
    return num;
  }
  TStack.prototype.push = function(data){
    if(this._head){
      this._tail.next = new TNode(this._tail,data,null);
      this._tail = this._tail.next;
    }else{
      this._head = new TNode(null,data,null);
      this._tail = this._head;
    }
  };
  TStack.prototype.pop = function(){
    var node = this._tail;
    if(this._tail === null){
      return null;
    }
    if(this._head === this._tail){
      this._head = null;
      this._tail = null;
      return node.data;
    }
    this._tail = this._tail.pre;
    this._tail.next = null;
    return node.data;
  };
  TStack.prototype.top = function(){
    if(this._tail === null){
      return null;
    }
    return this._tail.data;
  };
  TStack.prototype.empty = function(){
    return this._head === null;
  };
  /*队列*/
  function TQueue(){
    this._head = null;
    this._tail = null;
  }

  TQueue.prototype.enQueue = function(data){
    if(this._head){
      this._tail.next = new TNode(this._tail,data,null);
    }else{
      this._head = new TNode(null,data,null);
      this._tail = this._head;
    }
  }

  TQueue.prototype.deQueue = function(){
    var node;
    if(!this._head){
      return null;
    }
    if(this._head === this._tail){
      node = this._tail;
      this._head = null;
      this._tail = null;
      return node.data;
    }
    node = this._head;
    this._head = this._head.next;
    return node.data;
  }

  /*简单算术表达式运算 栈*/
  // i\o + - * /
  //   + > > < <
  //   - > > < <
  //   * > > > >
  //   / > > > >
  // i\o + - * /
  //   + 1 1 0 0
  //   - 1 1 0 0
  //   * 1 1 1 1
  //   / 1 1 1 1
  // 1+10.3*3/3
function priority(o,i){
  let symbol = ['+','-','*','/'],
      priority = [[1,1,0,0],[1,1,0,0],[1,1,1,1],[1,1,1,1]];
  return priority[symbol.indexOf(i)][symbol.indexOf(o)];
}
function cal(n1,n2,s){
  n1 = parseFloat(n1);
  n2 = parseFloat(n2);
  switch(s){
    case '+':
      return n1+n2+'';
    case '-':
      return n1-n2+'';
    case '*':
      return n1*n2+'';
    case '/':
      return n1/n2+'';
  }
}
function calculate(format){
  let symbol = new Stack(),
      number = new Stack(),
      character,n1,n2,s;
  format = format.replace(/\s*/g,'');
  for(let i in format){
    character = format[i];
    if(character === '.'){
      character = number.pop() + '.';
      number.push(character);
    }else if(new RegExp("^[^\\d]$").test(character)){
      while(symbol.top() != null && priority(character,symbol.top())){
        n1 = number.pop();
        n2 = number.pop();
        s = symbol.pop();
        number.push(cal(n2,n1,s));
      }
      symbol.push(character);
    }else{
      if(number.top() != null && new RegExp("^[\\d\\.]$").test(format[i-1])){
        character = number.pop() + character;
      }
      number.push(character);
    }
    // 最后一步清空栈
    if(i == format.length-1){
      while(!symbol.empty()){
        n1 = number.pop();
        n2 = number.pop();
        s = symbol.pop();
        number.push(cal(n2,n1,s));
      }
    }
  }
  return number.pop();
}

  /*报数问题 队列*/
  // 一队人，0 1间隔报数 报到0的出列 全部人最后的出列顺序
function QueueOut(arr){
  let queue = new Queue(),
      order = 1;
  for(let item in arr){
    queue.enQueue(arr[item]);
  }
  while(!queue.empty()){
    if(order%2 === 1){
      console.log(queue.deQueue());
    }else{
      let temp = queue.deQueue();
      (temp!=null)&&(queue.enQueue(temp));
    }
    ++order;
  }
}