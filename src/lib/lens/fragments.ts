import { graphql } from "@lens-protocol/react";
import {
    ArticleMetadataFragment,
    AudioMetadataFragment,
    TextOnlyMetadataFragment,
    ImageMetadataFragment,
    VideoMetadataFragment,
} from "@lens-protocol/react";
import type { FragmentOf } from "@lens-protocol/react-web";

export const AccountMetadataFragment = graphql(`
  fragment AccountMetadata on AccountMetadata {
    name
    bio
    thumbnail: picture(
      request: { preferTransform: { fixedSize: { height: 128, width: 128 } } }
    )
    picture
  }
`);

export const AccountFragment = graphql(`
  fragment Account on Account {
    __typename
    username {
      localName
      domain
    }
    address
    metadata {
      ...AccountMetadata
    }
  }
`, [AccountMetadataFragment]);

export const PostMetadataFragment = graphql(
    `
      fragment PostMetadata on PostMetadata {
        __typename
        ... on ArticleMetadata {
          ...ArticleMetadata
        }
        ... on AudioMetadata {
          ...AudioMetadata
        }
        ... on TextOnlyMetadata {
          ...TextOnlyMetadata
        }
        ... on ImageMetadata {
          ...ImageMetadata
        }
        ... on VideoMetadata {
          ...VideoMetadata
        }
      }
    `,
    [
      ArticleMetadataFragment,
      AudioMetadataFragment,
      TextOnlyMetadataFragment,
      ImageMetadataFragment,
      VideoMetadataFragment,
    ]
  );

export const PostFragment = graphql(`
  fragment Post on Post {
    __typename
    id
    metadata {
      ...PostMetadata
    }
    author {
      ...Account
    }
  }
`, [PostMetadataFragment, AccountFragment]); 

export const MediaImageFragment = graphql(
    `
      fragment MediaImage on MediaImage {
        __typename
  
        full: item
  
        large: item(request: { preferTransform: { widthBased: { width: 2048 } } })
  
        thumbnail: item(
          request: { preferTransform: { fixedSize: { height: 128, width: 128 } } }
        )
  
        altTag
        license
        type
      }
    `
  );

export type CustomAccount = {
  __typename: "Account";
  username: {
    localName: string;
    domain: string;
  };
  address: string;
  metadata: CustomAccountMetadata;
};

export type CustomAccountMetadata = {
  name?: string;
  bio?: string;
  thumbnail?: string;
  picture?: string;
};

export type CustomMediaImage = {
  __typename: "MediaImage";
  full: string;
  large: string;
  thumbnail: string;
  altTag?: string;
  license?: string;
  type: string;
};

export type CustomPostMetadata = {
  __typename: "PostMetadata";
  content?: string;
  media?: Array<{
    url: string;
    mimeType: string;
  }>;
  createdAt: string;
};

export const fragments = [
  AccountFragment,
  PostMetadataFragment,
  MediaImageFragment,
];
  