const { iterator } = require("core-js/fn/symbol");

let root = undefined;
let values = Array.from('5372468');

let queueArray = [10];
let newArray = [];
let markNumbers = {10:1}
while(queueArray.length>0){
    const genValue = queueArray.pop();
    const median = genValue>>1;
    const left = genValue-median;
    const right = genValue+median;
    [left,right].forEach((x)=>{
         if(x>0 && x<20 && !markNumbers[x]){
        queueArray.unshift(x);
         newArray.push(x);
            markNumbers[x] = 1
    }
    })
}
console.log(newArray)
let node = {
    height:0,
    left:undefined,
    right:undefined,
    left_h:1,
    right_h:1,
    value:0
}
let clone = (value)=>JSON.parse(JSON.stringify(value));
let insert = (value)=>{
    const newNode = clone(node);
    newNode.value = value;
    if(root === undefined){
      root = newNode;
      return;
    }
    const stackNodes = [];
    let sNode = root; 
    while(sNode){
       stackNodes.push({
           sNode: sNode,
           post: sNode.value > value ? 'left':'right'
       })
       sNode = sNode.value > value ? sNode.left:sNode.right;
    }
    prev = stackNodes[stackNodes.length-1].sNode;
    if(prev.value>newNode.value){
        prev.left = newNode;
        prev.left_h++;
    }else{
        prev.right = newNode;
        prev.right_h++;
    }
   while(stackNodes.length>=2){
       const stackSize = stackNodes.length;
       const {sNode,post} = stackNodes[stackSize-1];
       const {sNode:sNode2,post:post2} = stackNodes[stackSize-2];
       const postHMap = {
           left:'left_h',
           right:'right_h'
       }
       sNode2[postHMap[post2]] = Math.max(sNode2[postHMap[post2]],sNode[postHMap[post]]+1);
       stackNodes.pop();
   }
}

newArray.forEach(v=>insert(v))
const tree = root;
const inorder = (root) => {
    if (root !== undefined) {
        inorder(root.left);
    console.log(root.value);
    inorder(root.right);
    }
    
}
const preorder = (root) => {
    if (root !== undefined) {
        console.log(root.value);
        preorder(root.left);
        preorder(root.right);
    }
    
}
const postorder = (root) => {
    if (root !== undefined) {
        postorder(root.left);
        postorder(root.right);
        console.log(root.value);
    }
}
// console.log("inorder");
// inorder(root);
console.log("preorder");
preorder(root);
// console.log('postorder');
// postorder(root);
const itInorder = (root) => {
    const stack = []
    let node = root;
    while (true) {
        while (node !== undefined) { 
            stack.push(node);
            node = node.left;
        }
        node = stack.pop();
        if (!node) break;
        console.log(node.value);
        node = node.right;
    }
}
// itInorder(root);
const itPreorder = (root) => {
    const stack = []
    let node = root;
    while (true) {
        while (node !== undefined) { 
            stack.push(node);
            console.log(node.value)
            node = node.left;
        }
        node = stack.pop();
         if (!node) break;
        node = node.right;
    }
}
itPreorder(root);
