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

export type BothEvents = {
  __typename?: 'BothEvents';
  googleEvent: GoogleEvent;
  savedEvent?: Maybe<CalendarEvent>;
};

export type CalendarEvent = {
  __typename?: 'CalendarEvent';
  endDate: Scalars['DateTime'];
  googleId: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  isSaved?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  startDate: Scalars['DateTime'];
  tags?: Maybe<Array<Tag>>;
};

export type Category = {
  __typename?: 'Category';
  disciplines?: Maybe<Array<Discipline>>;
  id: Scalars['String'];
  name: Scalars['String'];
  tag: Tag;
};

export type Discipline = {
  __typename?: 'Discipline';
  category: Category;
  categoryId: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  posts?: Maybe<Array<Post>>;
  tag: Tag;
};

export type GoogleCalendar = {
  __typename?: 'GoogleCalendar';
  id: Scalars['String'];
  name: Scalars['String'];
};

export type GoogleEvent = {
  __typename?: 'GoogleEvent';
  endDate: Scalars['DateTime'];
  id: Scalars['String'];
  name: Scalars['String'];
  startDate: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changeRoleOfMe: User;
  createCategory: Category;
  createDiscipline: Discipline;
  createPost: Post;
  createTag: Tag;
  deleteAllPosts: Scalars['Boolean'];
  deleteAllUsers: Scalars['Boolean'];
  deleteCategory: Scalars['Boolean'];
  deleteDiscipline: Scalars['Boolean'];
  deletePost: Scalars['Boolean'];
  saveEvent: CalendarEvent;
  savePost: Post;
};


export type MutationChangeRoleOfMeArgs = {
  role: Scalars['String'];
};


export type MutationCreateCategoryArgs = {
  name: Scalars['String'];
};


export type MutationCreateDisciplineArgs = {
  categoryId: Scalars['String'];
  name: Scalars['String'];
};


export type MutationCreateTagArgs = {
  name: Scalars['String'];
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['String'];
};


export type MutationDeleteDisciplineArgs = {
  id: Scalars['String'];
};


export type MutationDeletePostArgs = {
  id: Scalars['String'];
};


export type MutationSaveEventArgs = {
  endDate: Scalars['DateTime'];
  googleId: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  startDate: Scalars['DateTime'];
  tagIds?: InputMaybe<Array<Scalars['String']>>;
};


export type MutationSavePostArgs = {
  id?: InputMaybe<Scalars['String']>;
  published: Scalars['Boolean'];
  subtitle?: InputMaybe<Scalars['String']>;
  tagIds?: InputMaybe<Array<Scalars['String']>>;
  text?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};

export type PaginatedPosts = {
  __typename?: 'PaginatedPosts';
  numOfPages: Scalars['Int'];
  posts: Array<Post>;
};

export type Post = {
  __typename?: 'Post';
  createdAt: Scalars['DateTime'];
  discipline?: Maybe<Discipline>;
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
  getCategories: Array<Category>;
  getDisciplines: Array<Discipline>;
  getGoogleCalendars: Array<GoogleCalendar>;
  getGoogleEvents: Array<BothEvents>;
  getPost: Post;
  getPosts: Array<Post>;
  getPublishedPosts: PaginatedPosts;
  getTags: Array<Tag>;
  hello: Scalars['Boolean'];
};


export type QueryGetGoogleEventsArgs = {
  calendarId: Scalars['String'];
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
  category?: Maybe<Category>;
  categoryId: Scalars['String'];
  discipline?: Maybe<Discipline>;
  disciplineId: Scalars['String'];
  events?: Maybe<Array<CalendarEvent>>;
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

export type BothEventsFragment = { __typename?: 'BothEvents', savedEvent?: { __typename?: 'CalendarEvent', name: string, id?: string | null, startDate: any, endDate: any, googleId: string, tags?: Array<{ __typename?: 'Tag', name: string, id: string }> | null } | null, googleEvent: { __typename?: 'GoogleEvent', id: string, name: string, startDate: any, endDate: any } };

export type CalendarEventFragment = { __typename?: 'CalendarEvent', name: string, id?: string | null, startDate: any, endDate: any, googleId: string, tags?: Array<{ __typename?: 'Tag', name: string, id: string }> | null };

export type CategoryFragment = { __typename?: 'Category', id: string, name: string, disciplines?: Array<{ __typename?: 'Discipline', id: string, name: string }> | null };

export type DisciplineFragment = { __typename?: 'Discipline', id: string, name: string };

export type GoogleCalendarFragment = { __typename?: 'GoogleCalendar', name: string, id: string };

export type GoogleEventFragment = { __typename?: 'GoogleEvent', id: string, name: string, startDate: any, endDate: any };

export type PostFragment = { __typename?: 'Post', id: string, createdAt: any, updatedAt: any, title: string, text: string, subtitle?: string | null, publishDate?: any | null, published: boolean, tags?: Array<{ __typename?: 'Tag', name: string, id: string }> | null };

export type PostSnippetFragment = { __typename?: 'Post', id: string, createdAt: any, updatedAt: any, title: string, subtitle?: string | null, publishDate?: any | null, published: boolean, tags?: Array<{ __typename?: 'Tag', name: string, id: string }> | null };

export type TagFragment = { __typename?: 'Tag', name: string, id: string };

export type CreateCategoryMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', createCategory: { __typename?: 'Category', id: string, name: string, disciplines?: Array<{ __typename?: 'Discipline', id: string, name: string }> | null } };

export type CreateDisciplineMutationVariables = Exact<{
  name: Scalars['String'];
  categoryId: Scalars['String'];
}>;


export type CreateDisciplineMutation = { __typename?: 'Mutation', createDiscipline: { __typename?: 'Discipline', id: string, name: string } };

export type CreateTagMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateTagMutation = { __typename?: 'Mutation', createTag: { __typename?: 'Tag', name: string, id: string } };

export type DeleteCategoryMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteCategoryMutation = { __typename?: 'Mutation', deleteCategory: boolean };

export type DeleteDisciplineMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteDisciplineMutation = { __typename?: 'Mutation', deleteDiscipline: boolean };

export type DeletePostMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: boolean };

export type SaveEventMutationVariables = Exact<{
  googleId: Scalars['String'];
  endDate: Scalars['DateTime'];
  startDate: Scalars['DateTime'];
  name: Scalars['String'];
  tagIds?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
}>;


export type SaveEventMutation = { __typename?: 'Mutation', saveEvent: { __typename?: 'CalendarEvent', name: string, id?: string | null, startDate: any, endDate: any, googleId: string, tags?: Array<{ __typename?: 'Tag', name: string, id: string }> | null } };

export type SavePostMutationVariables = Exact<{
  title: Scalars['String'];
  subtitle?: InputMaybe<Scalars['String']>;
  text?: InputMaybe<Scalars['String']>;
  published: Scalars['Boolean'];
  tagIds?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
}>;


export type SavePostMutation = { __typename?: 'Mutation', savePost: { __typename?: 'Post', id: string, createdAt: any, updatedAt: any, title: string, text: string, subtitle?: string | null, publishDate?: any | null, published: boolean, tags?: Array<{ __typename?: 'Tag', name: string, id: string }> | null } };

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = { __typename?: 'Query', getCategories: Array<{ __typename?: 'Category', id: string, name: string, disciplines?: Array<{ __typename?: 'Discipline', id: string, name: string }> | null }> };

export type GetGoogleCalendarsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetGoogleCalendarsQuery = { __typename?: 'Query', getGoogleCalendars: Array<{ __typename?: 'GoogleCalendar', name: string, id: string }> };

export type GetGoogleEventsQueryVariables = Exact<{
  calendarId: Scalars['String'];
}>;


export type GetGoogleEventsQuery = { __typename?: 'Query', getGoogleEvents: Array<{ __typename?: 'BothEvents', savedEvent?: { __typename?: 'CalendarEvent', name: string, id?: string | null, startDate: any, endDate: any, googleId: string, tags?: Array<{ __typename?: 'Tag', name: string, id: string }> | null } | null, googleEvent: { __typename?: 'GoogleEvent', id: string, name: string, startDate: any, endDate: any } }> };

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


export type GetPublishedPostsQuery = { __typename?: 'Query', getPublishedPosts: { __typename?: 'PaginatedPosts', numOfPages: number, posts: Array<{ __typename?: 'Post', id: string, createdAt: any, updatedAt: any, title: string, subtitle?: string | null, publishDate?: any | null, published: boolean, tags?: Array<{ __typename?: 'Tag', name: string, id: string }> | null }> } };

export type GetTagsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTagsQuery = { __typename?: 'Query', getTags: Array<{ __typename?: 'Tag', name: string, id: string }> };

export const TagFragmentDoc = gql`
    fragment Tag on Tag {
  name
  id
}
    `;
export const CalendarEventFragmentDoc = gql`
    fragment CalendarEvent on CalendarEvent {
  name
  id
  startDate
  endDate
  googleId
  tags {
    ...Tag
  }
}
    ${TagFragmentDoc}`;
export const GoogleEventFragmentDoc = gql`
    fragment GoogleEvent on GoogleEvent {
  id
  name
  startDate
  endDate
}
    `;
export const BothEventsFragmentDoc = gql`
    fragment BothEvents on BothEvents {
  savedEvent {
    ...CalendarEvent
  }
  googleEvent {
    ...GoogleEvent
  }
}
    ${CalendarEventFragmentDoc}
${GoogleEventFragmentDoc}`;
export const DisciplineFragmentDoc = gql`
    fragment Discipline on Discipline {
  id
  name
}
    `;
export const CategoryFragmentDoc = gql`
    fragment Category on Category {
  id
  name
  disciplines {
    ...Discipline
  }
}
    ${DisciplineFragmentDoc}`;
export const GoogleCalendarFragmentDoc = gql`
    fragment GoogleCalendar on GoogleCalendar {
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
export const CreateCategoryDocument = gql`
    mutation CreateCategory($name: String!) {
  createCategory(name: $name) {
    ...Category
  }
}
    ${CategoryFragmentDoc}`;

export function useCreateCategoryMutation() {
  return Urql.useMutation<CreateCategoryMutation, CreateCategoryMutationVariables>(CreateCategoryDocument);
};
export const CreateDisciplineDocument = gql`
    mutation CreateDiscipline($name: String!, $categoryId: String!) {
  createDiscipline(name: $name, categoryId: $categoryId) {
    ...Discipline
  }
}
    ${DisciplineFragmentDoc}`;

export function useCreateDisciplineMutation() {
  return Urql.useMutation<CreateDisciplineMutation, CreateDisciplineMutationVariables>(CreateDisciplineDocument);
};
export const CreateTagDocument = gql`
    mutation CreateTag($name: String!) {
  createTag(name: $name) {
    ...Tag
  }
}
    ${TagFragmentDoc}`;

export function useCreateTagMutation() {
  return Urql.useMutation<CreateTagMutation, CreateTagMutationVariables>(CreateTagDocument);
};
export const DeleteCategoryDocument = gql`
    mutation DeleteCategory($id: String!) {
  deleteCategory(id: $id)
}
    `;

export function useDeleteCategoryMutation() {
  return Urql.useMutation<DeleteCategoryMutation, DeleteCategoryMutationVariables>(DeleteCategoryDocument);
};
export const DeleteDisciplineDocument = gql`
    mutation DeleteDiscipline($id: String!) {
  deleteDiscipline(id: $id)
}
    `;

export function useDeleteDisciplineMutation() {
  return Urql.useMutation<DeleteDisciplineMutation, DeleteDisciplineMutationVariables>(DeleteDisciplineDocument);
};
export const DeletePostDocument = gql`
    mutation DeletePost($id: String!) {
  deletePost(id: $id)
}
    `;

export function useDeletePostMutation() {
  return Urql.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument);
};
export const SaveEventDocument = gql`
    mutation SaveEvent($googleId: String!, $endDate: DateTime!, $startDate: DateTime!, $name: String!, $tagIds: [String!], $id: String) {
  saveEvent(
    googleId: $googleId
    endDate: $endDate
    startDate: $startDate
    name: $name
    id: $id
    tagIds: $tagIds
  ) {
    ...CalendarEvent
  }
}
    ${CalendarEventFragmentDoc}`;

export function useSaveEventMutation() {
  return Urql.useMutation<SaveEventMutation, SaveEventMutationVariables>(SaveEventDocument);
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
export const GetCategoriesDocument = gql`
    query GetCategories {
  getCategories {
    ...Category
  }
}
    ${CategoryFragmentDoc}`;

export function useGetCategoriesQuery(options?: Omit<Urql.UseQueryArgs<GetCategoriesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetCategoriesQuery>({ query: GetCategoriesDocument, ...options });
};
export const GetGoogleCalendarsDocument = gql`
    query GetGoogleCalendars {
  getGoogleCalendars {
    ...GoogleCalendar
  }
}
    ${GoogleCalendarFragmentDoc}`;

export function useGetGoogleCalendarsQuery(options?: Omit<Urql.UseQueryArgs<GetGoogleCalendarsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetGoogleCalendarsQuery>({ query: GetGoogleCalendarsDocument, ...options });
};
export const GetGoogleEventsDocument = gql`
    query GetGoogleEvents($calendarId: String!) {
  getGoogleEvents(calendarId: $calendarId) {
    ...BothEvents
  }
}
    ${BothEventsFragmentDoc}`;

export function useGetGoogleEventsQuery(options: Omit<Urql.UseQueryArgs<GetGoogleEventsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetGoogleEventsQuery>({ query: GetGoogleEventsDocument, ...options });
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
    numOfPages
    posts {
      ...PostSnippet
    }
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