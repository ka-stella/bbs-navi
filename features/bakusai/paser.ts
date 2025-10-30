import {
  findAllElementsByClass,
  findDirectChild,
  findElementByClass,
  getTextContent,
} from "@/lib/html-utils";
import {
  type AreaData,
  type Category,
  type SubCategory,
} from "@/types/bakusai";
import type { Element } from "domhandler";
import { parseDocument } from "htmlparser2";

//地域ページからデータを抽出
export const extractAreaDataFromHTML = (html: string): AreaData[] => {
  const areaDataList: AreaData[] = [];

  // DOMを解析
  const dom = parseDocument(html);

  // class="index_area_wrapper" のdiv要素をすべて探す
  const areaWrappers = findAllElementsByClass(dom, "div", "index_area_wrapper");

  //各ラッパー要素からエリアデータを抽出
  areaWrappers.forEach((wrapper: Element) => {
    const areaData = extractAreaDataFromWrapper(wrapper);
    if (areaData) {
      areaDataList.push(areaData);
    }
  });

  return areaDataList;
};

/**
 * ラッパー要素から地域データを抽出
 */
const extractAreaDataFromWrapper = (wrapper: Element): AreaData | null => {
  try {
    //ID取得
    const id = wrapper.attribs?.id || "";

    //aタグを探す（直接の子要素から
    const anchor = findDirectChild(wrapper, "a");
    if (!anchor) return null;

    const url = anchor.attribs?.href || "";

    // area_nameを探す
    const areaNameSpan = findElementByClass(anchor, "span", "area_name");
    const name = getTextContent(areaNameSpan) || "";

    // 投稿数の数値部分を探す
    const areaPostsCountSpan = findElementByClass(
      anchor,
      "span",
      "area_posts_count",
    );
    let postsCount = "";

    if (areaPostsCountSpan) {
      const firstP = findDirectChild(areaPostsCountSpan, "p");
      if (firstP && !firstP.attribs?.class?.includes("area_posts_count")) {
        postsCount = getTextContent(firstP).trim();
      }
    }

    return {
      id,
      name,
      url,
      postsCount,
    };
  } catch (error) {
    console.error("ラッパー要素からエリアデータの取得に失敗しました。:", error);
    return null;
  }
};

//カテゴリページからデータを抽出
export const extractCategoryFromHTML = (html: string): Category[] => {
  const categoryList: Category[] = [];

  // DOMを解析
  const dom = parseDocument(html);

  // class="ctg_box" のdiv要素をすべて探す 大カテゴリの要素を取得
  let categoryWrappers = findAllElementsByClass(dom, "div", "ctg_box");

  // id="landscape_area_ctg" のものを除外
  categoryWrappers = categoryWrappers.filter(
    (elm) => elm.attribs?.id !== "landscape_area_ctg",
  );

  console.log(categoryWrappers.length);

  //各ラッパー要素からエリアデータを抽出
  categoryWrappers.forEach((categoryElm: Element) => {
    const category = extractCategoryFromWrapper(categoryElm);
    if (category) {
      categoryList.push(category);
    }
  });

  return categoryList;
};

//大カテゴリからデータを抽出
const extractCategoryFromWrapper = (wrapper: Element): Category | null => {
  try {
    //カテゴリ名取得 div class="ctgTitle"を取得
    const categoryNameDiv = findElementByClass(wrapper, "div", "ctgTitle");
    const categoryName = getTextContent(categoryNameDiv) || "";

    if (categoryName === "") return null;

    const skipCategories = ["全部から検索", "最新", "ピックアップ"];
    if (skipCategories.some((kw) => categoryName.includes(kw))) return null;
    //サブカテゴリを取得
    const subCategories = extractSubCategoryFromWrapper(wrapper);

    return {
      name: categoryName,
      subCategories,
    };
  } catch (error) {
    console.error("ラッパー要素からカテゴリの取得に失敗しました。:", error);
    return null;
  }
};

//サブカテゴリのデータを取得
const extractSubCategoryFromWrapper = (wrapper: Element): SubCategory[] => {
  const subCategories: SubCategory[] = [];

  try {
    // <a class="ctg_menu_list_link"> をすべて取得
    const linkElements = findAllElementsByClass(
      wrapper,
      "a",
      "ctg_menu_list_link",
    );

    for (const link of linkElements) {
      const url = link.attribs?.href || "";

      // 通常は <span class="ctg_menu_list_title"> を探す
      let name = "";
      const span = findElementByClass(link, "span", "ctg_menu_list_title");

      if (span) {
        name = getTextContent(span)?.trim() || "";
      } else {
        // <span>がない場合は <p class="ctg_menu_list_container"> のテキストを取得
        const p = findElementByClass(link, "p", "ctg_menu_list_container");
        if (p) {
          name = getTextContent(p)?.trim() || "";
        }
      }

      if (name && url) {
        subCategories.push({ name, url });
      }
    }
  } catch (error) {
    console.error("サブカテゴリ抽出に失敗しました:", error);
  }

  return subCategories;
};
