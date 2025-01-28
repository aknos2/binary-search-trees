import { driverScript } from "./driverScript.js";

export class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

export class Tree {
    constructor(array) {
        const sortedArray = [...new Set(array)].sort((a, b) => a - b); // Sort and remove duplicates
        this.root = this.buildTree(sortedArray); 
    }

    buildTree(array) {
        if (array.length === 0) return null;

        const mid = Math.floor(array.length / 2);
        const root = new Node(array[mid]);

        root.left = this.buildTree(array.slice(0, mid));
        root.right = this.buildTree(array.slice(mid + 1));

        return root;
    }

    insert(value, node = this.root) {
        if (node === null) {
            return new Node(value);
        }

        if (value < node.data) {
            node.left = this.insert(value, node.left);  // Traverse to the left subtree
        } else if (value > node.data) {
            node.right = this.insert(value, node.right); // Traverse to the right subtree
        }
        return node;
    }

    delete(value, node = this.root) {
       if (node === null) return node;

       if (value < node.data) {
        node.left = this.delete(value, node.left);
       } else if (value > node.data) {
        node.right = this.delete(value, node.right);
       } else {

        if (node.left === null && node.right === null) {
            return null;
        }

        if (node.left === null) {
            return node.right;
        }
        if (node.right === null) {
            return node.left;
        }

        // Case 3: Two children
        // Find the smallest value in the right subtree
        const minValue = this.findMin(node.right);
        node.data = minValue; // Replace the current node's data with the smallest value
        node.right = this.delete(minValue, node.right); // Delete the smallest value from the right subtree
    }
        
        return node;
    }

    findMin(node) {
        while (node.left !== null) {
            node = node.left; // Keep traversing left to find the smallest value
        }
        return node.data;
    }

    find(value, node = this.root) {
        if (node === null) return false;

        if (value === node.data) return true;

        if (value < node.data) {
            return this.find(value, node.left);
        } else if (value > node.data) {
            return this.find(value, node.right);
        }
    }

    levelOrder(callback) {
        if (typeof callback !== 'function') {
            throw new Error("Error: Callback function is required for levelOrder.");
        }
    
        const queue = [];
        this._levelOrderHelper(this.root, 0, queue, callback);
        return queue; // Return the queue after processing
    }
    
    _levelOrderHelper(node, level, queue, callback) {
        if (node === null) return;
    
        // Ensure that there's an array for the current level
        if (queue.length <= level) {
            queue.push([]);
        }
    
        // Call the callback with node data and level
        callback(node, level, queue);
    
        // Traverse left and right subtrees
        this._levelOrderHelper(node.left, level + 1, queue, callback);
        this._levelOrderHelper(node.right, level + 1, queue, callback);
    }
    
    
    inOrder(callback) {
        if (typeof callback !== 'function') {
            throw new Error("Callback function is required for inOrder.");
        }
    
        const result = [];
        this._inOrder(this.root, callback, result);  // Start the in-order traversal and pass the result array
        console.log(result.join(' ')); // Join the result array into a single string and print it
    }
    
    _inOrder(node, callback, result) {
        if (node === null) return;
    
        // Traverse the left subtree
        this._inOrder(node.left, callback, result);
    
        // Process the current node
        callback(node, result);
    
        // Traverse the right subtree
        this._inOrder(node.right, callback, result);
    }

    preOrder(callback) {
        if (typeof callback !== 'function') {
            throw new Error("Callback function is required for preOrder.");
        }

        const result = [];
        this._preOrder(this.root, callback, result); 
        console.log(result.join(' ')); 
    }

    _preOrder(node, callback, result) {
        if (node === null) return;

        callback(node, result);
        this._preOrder(node.left, callback, result);
        this._preOrder(node.right, callback, result);
    }


    postOrder(callback) {
        if (typeof callback !== 'function') {
            throw new Error("Callback function is required for postOrder.");
        }

        const result = [];
        this._postOrder(this.root, callback, result); 
        console.log(result.join(' ')); 
    }

    _postOrder(node, callback, result) {
        if (node === null) return;

        this._postOrder(node.left, callback, result);
        this._postOrder(node.right, callback, result);
        callback(node, result);
    }

    height(node = this.root) {
        if (node === null) return -1; // Base case: height of empty tree is -1.
    
        // Recursively calculate the height of the left and right subtrees.
        let leftHeight = this.height(node.left);
        let rightHeight = this.height(node.right);
    
        // Height is the maximum depth of the subtrees + 1 (for the current node).
        return Math.max(leftHeight, rightHeight) + 1;
    }

    depth(nodeValue, node = this.root, currentDepth = 0) {
        if (node === null) return null;
    
        if (node.data === nodeValue) {
            return currentDepth; // Found the node, return the depth
        }
        // Traverse left if the value is smaller
        if (nodeValue < node.data) {
            return this.depth(nodeValue, node.left, currentDepth + 1);
        }
        // Traverse right if the value is larger
        else if (nodeValue > node.data) {
            return this.depth(nodeValue, node.right, currentDepth + 1);
        }
    }
    
    isBalanced(node = this.root) {
        if (node === null) return true; // An empty tree is balanced
    
        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);
    
        // Check if the current node is balanced
        const isCurrentNodeBalanced = Math.abs(leftHeight - rightHeight) <= 1;
    
        // Recursively check if the left and right subtrees are balanced
        return (
            isCurrentNodeBalanced &&
            this.isBalanced(node.left) &&
            this.isBalanced(node.right)
        );
    }
    
    rebalance() {
        // Perform an in-order traversal to get the sorted array of node values
        const newArray = [];
        this.inOrder((node) => {
            newArray.push(node.data);
        });
    
        this.root = this.buildTree(newArray);
    }
    

    prettyPrint() {
        const prettyPrintHelper = (node, prefix = "", isLeft = true) => {
            if (node === null) {
                return;
            }
            if (node.right !== null) {
                prettyPrintHelper(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
            }
            console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
            if (node.left !== null) {
                prettyPrintHelper(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
            }
        };

        prettyPrintHelper(this.root); // Call the helper function with the root node
    }
}

driverScript();