import type { Element, Node, Text } from "domhandler";
import { isTag as isElement } from "domhandler";

/**
 * 型ガード
 * @param node
 * @returns
 */
export const isTextNode = (node: Node): node is Text => {
  return node.type === "text";
};

/**
 * 特定のクラス名を持つ要素をすべて探す
 */
export const findAllElementsByClass = (
  root: Node | Node[],
  tagName: string,
  className: string,
): Element[] => {
  const results: Element[] = [];

  const search = (nodes: Node[]): void => {
    for (const node of nodes) {
      // Documentノードなら子要素を処理
      if (node.type === "root" && (node as any).children) {
        search((node as any).children);
      }
      // Elementノードならチェック
      else if (node.type === "tag") {
        const element = node as Element;

        // タグ名とクラス名が一致するかチェック
        if (element.name === tagName) {
          const classAttr = element.attribs?.class;
          if (classAttr && classAttr === className) {
            results.push(element);
          }
        }

        // 子要素を探索
        if (element.children) {
          search(element.children);
        }
      }
    }
  };

  const nodes = Array.isArray(root) ? root : [root];
  search(nodes);

  return results;
};

/**
 * 要素内から特定のクラス名を持つタグを再帰的に探索
 */
export const findElementByClass = (
  parent: Element,
  tagName: string,
  className: string,
): Element | null => {
  if (!parent.children) return null;

  for (const child of parent.children) {
    if (isElement(child) && child.name === tagName) {
      const classAttr = child.attribs?.class ?? "";
      if (classAttr.split(/\s+/).includes(className)) {
        return child;
      }
    }

    const found = isElement(child)
      ? findElementByClass(child, tagName, className)
      : null;
    if (found) return found;
  }

  return null;
};

/**
 * 直接の子要素から特定のタグを探す
 */
export const findDirectChild = (
  parent: Element,
  tagName: string,
): Element | null => {
  if (!parent.children) return null;

  for (const child of parent.children) {
    if (isElement(child) && child.name === tagName) {
      return child;
    }
  }

  return null;
};

/**
 * テキスト内容を取得
 */
export const getTextContent = (node: Node | null): string => {
  if (!node) return "";

  if (isTextNode(node)) {
    return node.data || "";
  }

  if (isElement(node) && node.children) {
    return node.children.map((child) => getTextContent(child)).join("");
  }

  return "";
};

// テスト用：DOM構造を表示
export const debugDOMStructure = (
  root: Node | Node[],
  maxDepth: number = 3,
): void => {
  const nodes = Array.isArray(root) ? root : [root];

  console.log("=== DOM STRUCTURE ===");

  const printNode = (node: Node, depth: number = 0): void => {
    if (depth > maxDepth) return;

    const indent = "  ".repeat(depth);

    debugNodeType(node);

    if (isElement(node)) {
      console.log(`${indent}<${node.name}>`, {
        id: node.attribs?.id,
        class: node.attribs?.class,
        children: node.children?.length || 0,
      });

      if (node.children) {
        node.children.forEach((child) => printNode(child, depth + 1));
      }
    } else if (node.type === "text") {
      const text = (node as Text).data.trim();
      if (text) {
        console.log(
          `${indent}"${text.substring(0, 30)}${text.length > 30 ? "..." : ""}"`,
        );
      }
    }
  };

  nodes.forEach((node) => printNode(node));
};

const debugNodeType = (node: Node): void => {
  console.log("=== Node Debug Info ===");
  console.log("Node type:", node.type);
  console.log("Node keys:", Object.keys(node));

  if (node.type === "tag") {
    console.log("Tag name:", (node as any).name);
    console.log("Attributes:", (node as any).attribs);
  }

  if (node.type === "text") {
    console.log("Text content:", (node as any).data);
  }

  console.log("=======================");
};
