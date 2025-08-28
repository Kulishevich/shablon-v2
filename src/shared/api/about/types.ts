export type AboutBlockType = {
  about: {
    content_blocks: (ContentImageBlock | ContentFeatureBlock)[];
  }
}

export type ContentImageBlock = {
  type: "image_text",
  content: {
    image_path: string;
    image_position: "left" | "right";
    text: string;
  }
};

export type ContentFeatureBlock = {
  type: "feature_section",
  content: {
    title: string;
    image_path: string;
    text_primary: string;
    text_secondary: string;
  }
}