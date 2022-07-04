import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: Post;
  createTag: Tag;
  deleteAllPosts: Scalars['Boolean'];
  savePost: Post;
};


export type MutationCreateTagArgs = {
  name: Scalars['String'];
};


export type MutationSavePostArgs = {
  id?: InputMaybe<Scalars['String']>;
  published: Scalars['Boolean'];
  tagIds?: InputMaybe<Array<Scalars['String']>>;
  text: Scalars['String'];
  title: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  publishDate?: Maybe<Scalars['DateTime']>;
  published: Scalars['Boolean'];
  tags?: Maybe<Array<Tag>>;
  text: Scalars['String'];
  textSnippet: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Query = {
  __typename?: 'Query';
  checkSession: Scalars['Boolean'];
  getAllUsers: Array<User>;
  getPosts: Array<Post>;
  getPublishedPosts: Array<Post>;
  getTags: Array<Tag>;
  hello: Scalars['Boolean'];
};


export type QueryGetPostsArgs = {
  limit?: InputMaybe<Scalars['Float']>;
  page?: InputMaybe<Scalars['Float']>;
};


export type QueryGetPublishedPostsArgs = {
  limit?: InputMaybe<Scalars['Float']>;
  page?: InputMaybe<Scalars['Float']>;
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['String'];
  name: Scalars['String'];
  posts?: Maybe<Array<Post>>;
};

export type User = {
  __typename?: 'User';
  class?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  role: Scalars['String'];
};

export type PostSnippetFragment = { __typename?: 'Post', id: string, createdAt: any, updatedAt: any, title: string, textSnippet: string, tags?: Array<{ __typename?: 'Tag', name: string, id: string }> | null };

export type TagFragment = { __typename?: 'Tag', name: string, id: string };

export type GetPublishedPostsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Float']>;
  page?: InputMaybe<Scalars['Float']>;
}>;


export type GetPublishedPostsQuery = { __typename?: 'Query', getPublishedPosts: Array<{ __typename?: 'Post', id: string, createdAt: any, updatedAt: any, title: string, textSnippet: string, tags?: Array<{ __typename?: 'Tag', name: string, id: string }> | null }> };

export const TagFragmentDoc = gql`
    fragment Tag on Tag {
  name
  id
}
    `;
export const PostSnippetFragmentDoc = gql`
    fragment PostSnippet on Post {
  id
  createdAt
  updatedAt
  title
  textSnippet
  tags {
    ...Tag
  }
}
    ${TagFragmentDoc}`;
export const GetPublishedPostsDocument = gql`
    query GetPublishedPosts($limit: Float, $page: Float) {
  getPublishedPosts(limit: $limit, page: $page) {
    ...PostSnippet
  }
}
    ${PostSnippetFragmentDoc}`;

export function useGetPublishedPostsQuery(options?: Omit<Urql.UseQueryArgs<GetPublishedPostsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetPublishedPostsQuery>({ query: GetPublishedPostsDocument, ...options });
};