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
  changeRoleOfMe: User;
  createPost: Post;
  createTag: Tag;
  deleteAllPosts: Scalars['Boolean'];
  deleteAllUsers: Scalars['Boolean'];
  deletePost: Scalars['Boolean'];
  savePost: Post;
};


export type MutationChangeRoleOfMeArgs = {
  role: Scalars['String'];
};


export type MutationCreateTagArgs = {
  name: Scalars['String'];
};


export type MutationDeletePostArgs = {
  id: Scalars['String'];
};


export type MutationSavePostArgs = {
  id?: InputMaybe<Scalars['String']>;
  published: Scalars['Boolean'];
  subtitle?: InputMaybe<Scalars['String']>;
  tagIds?: InputMaybe<Array<Scalars['String']>>;
  text?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  publishDate?: Maybe<Scalars['DateTime']>;
  published: Scalars['Boolean'];
  subtitle?: Maybe<Scalars['String']>;
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
  getPost: Post;
  getPosts: Array<Post>;
  getPublishedPosts: Array<Post>;
  getTags: Array<Tag>;
  hello: Scalars['Boolean'];
};


export type QueryGetPostArgs = {
  id: Scalars['String'];
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

export type PostFragment = { __typename?: 'Post', id: string, createdAt: any, updatedAt: any, title: string, text: string, subtitle?: string | null, publishDate?: any | null, published: boolean, tags?: Array<{ __typename?: 'Tag', name: string, id: string }> | null };

export type PostSnippetFragment = { __typename?: 'Post', id: string, createdAt: any, updatedAt: any, title: string, subtitle?: string | null, publishDate?: any | null, published: boolean, tags?: Array<{ __typename?: 'Tag', name: string, id: string }> | null };

export type TagFragment = { __typename?: 'Tag', name: string, id: string };

export type DeletePostMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: boolean };

export type SavePostMutationVariables = Exact<{
  title: Scalars['String'];
  subtitle?: InputMaybe<Scalars['String']>;
  text?: InputMaybe<Scalars['String']>;
  published: Scalars['Boolean'];
  tagIds?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
}>;


export type SavePostMutation = { __typename?: 'Mutation', savePost: { __typename?: 'Post', id: string, createdAt: any, updatedAt: any, title: string, text: string, subtitle?: string | null, publishDate?: any | null, published: boolean, tags?: Array<{ __typename?: 'Tag', name: string, id: string }> | null } };

export type GetPostQueryVariables = Exact<{
  getPostId: Scalars['String'];
}>;


export type GetPostQuery = { __typename?: 'Query', getPost: { __typename?: 'Post', id: string, createdAt: any, updatedAt: any, title: string, text: string, subtitle?: string | null, publishDate?: any | null, published: boolean, tags?: Array<{ __typename?: 'Tag', name: string, id: string }> | null } };

export type GetPostsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Float']>;
  page?: InputMaybe<Scalars['Float']>;
}>;


export type GetPostsQuery = { __typename?: 'Query', getPosts: Array<{ __typename?: 'Post', id: string, createdAt: any, updatedAt: any, title: string, subtitle?: string | null, publishDate?: any | null, published: boolean, tags?: Array<{ __typename?: 'Tag', name: string, id: string }> | null }> };

export type GetPublishedPostsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Float']>;
  page?: InputMaybe<Scalars['Float']>;
}>;


export type GetPublishedPostsQuery = { __typename?: 'Query', getPublishedPosts: Array<{ __typename?: 'Post', id: string, createdAt: any, updatedAt: any, title: string, subtitle?: string | null, publishDate?: any | null, published: boolean, tags?: Array<{ __typename?: 'Tag', name: string, id: string }> | null }> };

export type GetTagsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTagsQuery = { __typename?: 'Query', getTags: Array<{ __typename?: 'Tag', name: string, id: string }> };

export const TagFragmentDoc = gql`
    fragment Tag on Tag {
  name
  id
}
    `;
export const PostFragmentDoc = gql`
    fragment Post on Post {
  id
  createdAt
  updatedAt
  title
  text
  subtitle
  publishDate
  published
  tags {
    ...Tag
  }
}
    ${TagFragmentDoc}`;
export const PostSnippetFragmentDoc = gql`
    fragment PostSnippet on Post {
  id
  createdAt
  updatedAt
  title
  subtitle
  publishDate
  published
  tags {
    ...Tag
  }
}
    ${TagFragmentDoc}`;
export const DeletePostDocument = gql`
    mutation DeletePost($id: String!) {
  deletePost(id: $id)
}
    `;

export function useDeletePostMutation() {
  return Urql.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument);
};
export const SavePostDocument = gql`
    mutation SavePost($title: String!, $subtitle: String, $text: String, $published: Boolean!, $tagIds: [String!], $id: String) {
  savePost(
    title: $title
    text: $text
    tagIds: $tagIds
    published: $published
    subtitle: $subtitle
    id: $id
  ) {
    ...Post
  }
}
    ${PostFragmentDoc}`;

export function useSavePostMutation() {
  return Urql.useMutation<SavePostMutation, SavePostMutationVariables>(SavePostDocument);
};
export const GetPostDocument = gql`
    query GetPost($getPostId: String!) {
  getPost(id: $getPostId) {
    ...Post
  }
}
    ${PostFragmentDoc}`;

export function useGetPostQuery(options: Omit<Urql.UseQueryArgs<GetPostQueryVariables>, 'query'>) {
  return Urql.useQuery<GetPostQuery>({ query: GetPostDocument, ...options });
};
export const GetPostsDocument = gql`
    query getPosts($limit: Float, $page: Float) {
  getPosts(limit: $limit, page: $page) {
    ...PostSnippet
  }
}
    ${PostSnippetFragmentDoc}`;

export function useGetPostsQuery(options?: Omit<Urql.UseQueryArgs<GetPostsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetPostsQuery>({ query: GetPostsDocument, ...options });
};
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
export const GetTagsDocument = gql`
    query GetTags {
  getTags {
    ...Tag
  }
}
    ${TagFragmentDoc}`;

export function useGetTagsQuery(options?: Omit<Urql.UseQueryArgs<GetTagsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetTagsQuery>({ query: GetTagsDocument, ...options });
};