import { Tree, Node } from "./bst.js";

function generateRandomArray(size, max = 100) {
    return Array.from({ length: size }, () => Math.floor(Math.random() * max));
}

export function driverScript() {
    // Step 1: Create a binary search tree from an array of random numbers < 100
    const randomArray = generateRandomArray(15);
    const tree = new Tree(randomArray);

    const levelOrderResult = tree.levelOrder((node, level, queue) => {
        if (!queue[level]) queue[level] = []; // Ensure there's an array for the current level
        queue[level].push(node.data); // Collect the node data in the appropriate level array
    });
    

    console.log("Initial Tree:");
    tree.prettyPrint();

    // Step 2: Confirm that the tree is balanced
    console.log(`Is the tree balanced? ${tree.isBalanced()}`);

    // Step 3: Print out all elements in level, pre, post, and in order
    console.log("Level-order traversal:");
    console.log(levelOrderResult)
    console.log("\nPre-order traversal:");
    tree.preOrder((node) => process.stdout.write(node.data + " "));
    console.log("\nPost-order traversal:");
    tree.postOrder((node) => process.stdout.write(node.data + " "));
    console.log("\nIn-order traversal:");
    tree.inOrder((node) => process.stdout.write(node.data + " "));
    console.log();

    // Step 4: Unbalance the tree by adding several numbers > 100
    [150, 200, 250, 300].forEach((num) => tree.insert(num));

    console.log("\nTree after adding numbers > 100:");
    tree.prettyPrint();

    // Step 5: Confirm that the tree is unbalanced
    console.log(`Is the tree balanced? ${tree.isBalanced()}`);

    // Step 6: Balance the tree by calling rebalance
    tree.rebalance();

    console.log("\nTree after rebalancing:");
    tree.prettyPrint();

    // Step 7: Confirm that the tree is balanced
    console.log(`Is the tree balanced? ${tree.isBalanced()}`);

    // Step 8: Print out all elements in level, pre, post, and in order
    console.log("Level-order traversal:");
    console.log(levelOrderResult)
    console.log("\nPre-order traversal:");
    tree.preOrder((node) => process.stdout.write(node.data + " "));
    console.log("\nPost-order traversal:");
    tree.postOrder((node) => process.stdout.write(node.data + " "));
    console.log("\nIn-order traversal:");
    tree.inOrder((node) => process.stdout.write(node.data + " "));
    console.log();
}
