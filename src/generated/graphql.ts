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

export type Album = {
  __typename?: 'Album';
  albumId: Scalars['String'];
  coverPhotoBaseUrl: Scalars['String'];
  coverPhotoMediaItemId: Scalars['String'];
  id: Scalars['String'];
  title: Scalars['String'];
};

export type Answer = {
  __typename?: 'Answer';
  answer: Scalars['String'];
  cipher: Cipher;
  cipherId: Scalars['String'];
  className: Scalars['String'];
  correct: Scalars['Boolean'];
  id: Scalars['String'];
  time: Scalars['DateTime'];
};

export type BothAlbums = {
  __typename?: 'BothAlbums';
  googleAlbum: GoogleAlbum;
  savedAlbum?: Maybe<Album>;
};

export type BothEvents = {
  __typename?: 'BothEvents';
  googleEvent: GoogleEvent;
  savedEvent?: Maybe<CalendarEvent>;
};

export type CalendarEvent = {
  __typename?: 'CalendarEvent';
  allDay: Scalars['Boolean'];
  class?: Maybe<Scalars['String']>;
  endDate: Scalars['DateTime'];
  googleId: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  startDate: Scalars['DateTime'];
  tags?: Maybe<Array<Tag>>;
};

export type Category = {
  __typename?: 'Category';
  disciplines?: Maybe<Array<Discipline>>;
  googleCalendarId?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name: Scalars['String'];
  tag: Tag;
};

export type Cipher = {
  __typename?: 'Cipher';
  answers: Answer;
  correctAnswer: Scalars['String'];
  fileLink: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  publishDate?: Maybe<Scalars['DateTime']>;
  published: Scalars['Boolean'];
};

export type Discipline = {
  __typename?: 'Discipline';
  category: Category;
  categoryId: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  tag: Tag;
};

export type GoogleAlbum = {
  __typename?: 'GoogleAlbum';
  coverPhotoBaseUrl: Scalars['String'];
  id: Scalars['String'];
  title: Scalars['String'];
};

export type GoogleCalendar = {
  __typename?: 'GoogleCalendar';
  id: Scalars['String'];
  name: Scalars['String'];
};

export type GoogleEvent = {
  __typename?: 'GoogleEvent';
  allDay: Scalars['Boolean'];
  endDate: Scalars['DateTime'];
  id: Scalars['String'];
  name: Scalars['String'];
  startDate: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  answer: Answer;
  changeRoleOfMe: User;
  changeRoleOfUser: User;
  createCategory: Category;
  createDiscipline: Discipline;
  createTag: Tag;
  deleteAlbum: Scalars['Boolean'];
  deleteCategory: Scalars['Boolean'];
  deleteCipher: Scalars['Boolean'];
  deleteDiscipline: Scalars['Boolean'];
  deleteEvent: Scalars['Boolean'];
  deletePost: Scalars['Boolean'];
  deleteTag: Scalars['Boolean'];
  editDiscipline: Discipline;
  editTag: Tag;
  saveAlbum: Scalars['Boolean'];
  saveCipher: Cipher;
  saveEvent: CalendarEvent;
  savePost: Post;
  setCategoryCalendar: Category;
};


export type MutationAnswerArgs = {
  answer: Scalars['String'];
  cipherId: Scalars['String'];
};


export type MutationChangeRoleOfMeArgs = {
  role: Scalars['String'];
};


export type MutationChangeRoleOfUserArgs = {
  role: Scalars['String'];
  userId: Scalars['String'];
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


export type MutationDeleteAlbumArgs = {
  id: Scalars['String'];
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['String'];
};


export type MutationDeleteCipherArgs = {
  id: Scalars['String'];
};


export type MutationDeleteDisciplineArgs = {
  id: Scalars['String'];
};


export type MutationDeleteEventArgs = {
  id: Scalars['String'];
};


export type MutationDeletePostArgs = {
  id: Scalars['String'];
};


export type MutationDeleteTagArgs = {
  id: Scalars['String'];
};


export type MutationEditDisciplineArgs = {
  id: Scalars['String'];
  name: Scalars['String'];
};


export type MutationEditTagArgs = {
  id: Scalars['String'];
  name: Scalars['String'];
};


export type MutationSaveAlbumArgs = {
  id: Scalars['String'];
};


export type MutationSaveCipherArgs = {
  correctAnswer: Scalars['String'];
  fileLink?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  published: Scalars['Boolean'];
};


export type MutationSaveEventArgs = {
  allDay: Scalars['Boolean'];
  className?: InputMaybe<Scalars['String']>;
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


export type MutationSetCategoryCalendarArgs = {
  calendarId: Scalars['String'];
  categoryId: Scalars['String'];
};

export type PaginatedPosts = {
  __typename?: 'PaginatedPosts';
  numOfPages: Scalars['Int'];
  posts: Array<Post>;
};

export type Photo = {
  __typename?: 'Photo';
  baseUrl: Scalars['String'];
  creationTime: Scalars['String'];
  height: Scalars['Float'];
  id: Scalars['String'];
  width: Scalars['Float'];
};

export type PhotoResponse = {
  __typename?: 'PhotoResponse';
  nextPageToken?: Maybe<Scalars['String']>;
  photos: Array<Photo>;
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
  getAlbums: Array<Album>;
  getAllAnswers: Array<Answer>;
  getAllCiphers: Array<Cipher>;
  getAllPhotos: Scalars['Boolean'];
  getAllUsers: Array<User>;
  getAnswersOfMyClass: Array<Answer>;
  getCategories: Array<Category>;
  getCipher: Cipher;
  getCiphers: Array<Cipher>;
  getDisciplines: Array<Discipline>;
  getEvents: Array<CalendarEvent>;
  getGoogleAlbums: Array<BothAlbums>;
  getGoogleCalendars: Array<GoogleCalendar>;
  getGoogleEvent: GoogleEvent;
  getGoogleEvents: Array<BothEvents>;
  getMyEvents: Array<CalendarEvent>;
  getPhotosFromAlbum: PhotoResponse;
  getPost: Post;
  getPosts: Array<Post>;
  getPublishedPosts: PaginatedPosts;
  getResultsTagId: Scalars['String'];
  getSavedEvent: CalendarEvent;
  getTags: Array<Tag>;
  hello: Scalars['Boolean'];
};


export type QueryGetCipherArgs = {
  id: Scalars['String'];
};


export type QueryGetGoogleEventArgs = {
  calendarId: Scalars['String'];
  id: Scalars['String'];
};


export type QueryGetGoogleEventsArgs = {
  calendarId: Scalars['String'];
};


export type QueryGetPhotosFromAlbumArgs = {
  albumId: Scalars['String'];
  nextPageToken?: InputMaybe<Scalars['String']>;
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
  tagIds?: InputMaybe<Array<Scalars['String']>>;
};


export type QueryGetSavedEventArgs = {
  id: Scalars['String'];
};

export type Tag = {
  __typename?: 'Tag';
  category?: Maybe<Category>;
  categoryId?: Maybe<Scalars['String']>;
  discipline?: Maybe<Discipline>;
  disciplineId?: Maybe<Scalars['String']>;
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

export type AlbumFragment = { __typename?: 'Album', id: string, title: string, albumId: string, coverPhotoBaseUrl: string };

export type AnswerFragment = { __typename?: 'Answer', id: string, className: string, cipherId: string, answer: string, correct: boolean, time: any };

export type BothAlbumsFragment = { __typename?: 'BothAlbums', googleAlbum: { __typename?: 'GoogleAlbum', id: string, title: string, coverPhotoBaseUrl: string }, savedAlbum?: { __typename?: 'Album', id: string, title: string, albumId: string, coverPhotoBaseUrl: string } | null };

export type BothEventsFragment = { __typename?: 'BothEvents', savedEvent?: { __typename?: 'CalendarEvent', name: string, id: string, startDate: any, endDate: any, googleId: string, allDay: boolean, class?: string | null, tags?: Array<{ __typename?: 'Tag', name: string, id: string, categoryId?: string | null, disciplineId?: string | null }> | null } | null, googleEvent: { __typename?: 'GoogleEvent', id: string, name: string, startDate: any, endDate: any, allDay: boolean } };

export type CalendarEventFragment = { __typename?: 'CalendarEvent', name: string, id: string, startDate: any, endDate: any, googleId: string, allDay: boolean, class?: string | null, tags?: Array<{ __typename?: 'Tag', name: string, id: string, categoryId?: string | null, disciplineId?: string | null }> | null };

export type CategoryFragment = { __typename?: 'Category', id: string, name: string, googleCalendarId?: string | null, disciplines?: Array<{ __typename?: 'Discipline', id: string, name: string }> | null, tag: { __typename?: 'Tag', name: string, id: string, categoryId?: string | null, disciplineId?: string | null } };

export type CipherFragment = { __typename?: 'Cipher', id: string, name: string, fileLink: string, correctAnswer: string, published: boolean, publishDate?: any | null };

export type DisciplineFragment = { __typename?: 'Discipline', id: string, name: string, tag: { __typename?: 'Tag', name: string, id: string, categoryId?: string | null, disciplineId?: string | null } };

export type GoogleAlbumFragment = { __typename?: 'GoogleAlbum', id: string, title: string, coverPhotoBaseUrl: string };

export type GoogleCalendarFragment = { __typename?: 'GoogleCalendar', name: string, id: string };

export type GoogleEventFragment = { __typename?: 'GoogleEvent', id: string, name: string, startDate: any, endDate: any, allDay: boolean };

export type PhotoFragment = { __typename?: 'Photo', id: string, baseUrl: string, creationTime: string, width: number, height: number };

export type PostFragment = { __typename?: 'Post', id: string, createdAt: any, updatedAt: any, title: string, text: string, subtitle?: string | null, publishDate?: any | null, published: boolean, tags?: Array<{ __typename?: 'Tag', name: string, id: string, categoryId?: string | null, disciplineId?: string | null }> | null };

export type PostSnippetFragment = { __typename?: 'Post', id: string, createdAt: any, updatedAt: any, title: string, subtitle?: string | null, publishDate?: any | null, published: boolean, tags?: Array<{ __typename?: 'Tag', name: string, id: string, categoryId?: string | null, disciplineId?: string | null }> | null };

export type SimpleCategoryFragment = { __typename?: 'Category', id: string, name: string, googleCalendarId?: string | null };

export type SimpleDisciplineFragment = { __typename?: 'Discipline', id: string, name: string };

export type TagFragment = { __typename?: 'Tag', name: string, id: string, categoryId?: string | null, disciplineId?: string | null };

export type UserFragment = { __typename?: 'User', id: string, email: string, name: string, class?: string | null, role: string };

export type AnswerMutationVariables = Exact<{
  cipherId: Scalars['String'];
  answer: Scalars['String'];
}>;


export type AnswerMutation = { __typename?: 'Mutation', answer: { __typename?: 'Answer', id: string, className: string, cipherId: string, answer: string, correct: boolean, time: any } };

export type ChangeRoleOfUserMutationVariables = Exact<{
  userId: Scalars['String'];
  role: Scalars['String'];
}>;


export type ChangeRoleOfUserMutation = { __typename?: 'Mutation', changeRoleOfUser: { __typename?: 'User', id: string, email: string, name: string, class?: string | null, role: string } };

export type CreateCategoryMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', createCategory: { __typename?: 'Category', id: string, name: string, googleCalendarId?: string | null, disciplines?: Array<{ __typename?: 'Discipline', id: string, name: string }> | null, tag: { __typename?: 'Tag', name: string, id: string, categoryId?: string | null, disciplineId?: string | null } } };

export type CreateDisciplineMutationVariables = Exact<{
  name: Scalars['String'];
  categoryId: Scalars['String'];
}>;


export type CreateDisciplineMutation = { __typename?: 'Mutation', createDiscipline: { __typename?: 'Discipline', id: string, name: string, tag: { __typename?: 'Tag', name: string, id: string, categoryId?: string | null, disciplineId?: string | null } } };

export type CreateTagMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateTagMutation = { __typename?: 'Mutation', createTag: { __typename?: 'Tag', name: string, id: string, categoryId?: string | null, disciplineId?: string | null } };

export type DeleteAlbumMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteAlbumMutation = { __typename?: 'Mutation', deleteAlbum: boolean };

export type DeleteCategoryMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteCategoryMutation = { __typename?: 'Mutation', deleteCategory: boolean };

export type DeleteCipherMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteCipherMutation = { __typename?: 'Mutation', deleteCipher: boolean };

export type DeleteDisciplineMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteDisciplineMutation = { __typename?: 'Mutation', deleteDiscipline: boolean };

export type DeleteEventMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteEventMutation = { __typename?: 'Mutation', deleteEvent: boolean };

export type DeletePostMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: boolean };

export type DeleteTagMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteTagMutation = { __typename?: 'Mutation', deleteTag: boolean };

export type EditDisciplineMutationVariables = Exact<{
  id: Scalars['String'];
  name: Scalars['String'];
}>;


export type EditDisciplineMutation = { __typename?: 'Mutation', editDiscipline: { __typename?: 'Discipline', id: string, name: string } };

export type EditTagMutationVariables = Exact<{
  id: Scalars['String'];
  name: Scalars['String'];
}>;


export type EditTagMutation = { __typename?: 'Mutation', editTag: { __typename?: 'Tag', name: string, id: string, categoryId?: string | null, disciplineId?: string | null } };

export type SaveAlbumMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type SaveAlbumMutation = { __typename?: 'Mutation', saveAlbum: boolean };

export type SaveCipherMutationVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  correctAnswer: Scalars['String'];
  published: Scalars['Boolean'];
  fileLink?: InputMaybe<Scalars['String']>;
}>;


export type SaveCipherMutation = { __typename?: 'Mutation', saveCipher: { __typename?: 'Cipher', id: string, name: string, fileLink: string, correctAnswer: string, published: boolean, publishDate?: any | null } };

export type SaveEventMutationVariables = Exact<{
  googleId: Scalars['String'];
  endDate: Scalars['DateTime'];
  startDate: Scalars['DateTime'];
  name: Scalars['String'];
  allDay: Scalars['Boolean'];
  tagIds?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  className?: InputMaybe<Scalars['String']>;
}>;


export type SaveEventMutation = { __typename?: 'Mutation', saveEvent: { __typename?: 'CalendarEvent', name: string, id: string, startDate: any, endDate: any, googleId: string, allDay: boolean, class?: string | null, tags?: Array<{ __typename?: 'Tag', name: string, id: string, categoryId?: string | null, disciplineId?: string | null }> | null } };

export type SavePostMutationVariables = Exact<{
  title: Scalars['String'];
  subtitle?: InputMaybe<Scalars['String']>;
  text?: InputMaybe<Scalars['String']>;
  published: Scalars['Boolean'];
  tagIds?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
}>;


export type SavePostMutation = { __typename?: 'Mutation', savePost: { __typename?: 'Post', id: string, createdAt: any, updatedAt: any, title: string, text: string, subtitle?: string | null, publishDate?: any | null, published: boolean, tags?: Array<{ __typename?: 'Tag', name: string, id: string, categoryId?: string | null, disciplineId?: string | null }> | null } };

export type SetCategoryCalendarMutationVariables = Exact<{
  categoryId: Scalars['String'];
  calendarId: Scalars['String'];
}>;


export type SetCategoryCalendarMutation = { __typename?: 'Mutation', setCategoryCalendar: { __typename?: 'Category', id: string, name: string, googleCalendarId?: string | null } };

export type GetAlbumsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAlbumsQuery = { __typename?: 'Query', getAlbums: Array<{ __typename?: 'Album', id: string, title: string, albumId: string, coverPhotoBaseUrl: string }> };

export type GetAllAnswersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllAnswersQuery = { __typename?: 'Query', getAllAnswers: Array<{ __typename?: 'Answer', id: string, className: string, cipherId: string, answer: string, correct: boolean, time: any }> };

export type GetAllCiphersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCiphersQuery = { __typename?: 'Query', getAllCiphers: Array<{ __typename?: 'Cipher', id: string, name: string, fileLink: string, correctAnswer: string, published: boolean, publishDate?: any | null }> };

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = { __typename?: 'Query', getAllUsers: Array<{ __typename?: 'User', id: string, email: string, name: string, class?: string | null, role: string }> };

export type GetAnswersOfMyClassQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAnswersOfMyClassQuery = { __typename?: 'Query', getAnswersOfMyClass: Array<{ __typename?: 'Answer', id: string, className: string, cipherId: string, answer: string, correct: boolean, time: any }> };

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = { __typename?: 'Query', getCategories: Array<{ __typename?: 'Category', id: string, name: string, googleCalendarId?: string | null, disciplines?: Array<{ __typename?: 'Discipline', id: string, name: string }> | null, tag: { __typename?: 'Tag', name: string, id: string, categoryId?: string | null, disciplineId?: string | null } }> };

export type GetCipherQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetCipherQuery = { __typename?: 'Query', getCipher: { __typename?: 'Cipher', id: string, name: string, fileLink: string, correctAnswer: string, published: boolean, publishDate?: any | null } };

export type GetCiphersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCiphersQuery = { __typename?: 'Query', getCiphers: Array<{ __typename?: 'Cipher', id: string, name: string, fileLink: string, correctAnswer: string, published: boolean, publishDate?: any | null }> };

export type GetEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEventsQuery = { __typename?: 'Query', getEvents: Array<{ __typename?: 'CalendarEvent', name: string, id: string, startDate: any, endDate: any, googleId: string, allDay: boolean, class?: string | null, tags?: Array<{ __typename?: 'Tag', name: string, id: string, categoryId?: string | null, disciplineId?: string | null }> | null }> };

export type GetGoogleAlbumsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetGoogleAlbumsQuery = { __typename?: 'Query', getGoogleAlbums: Array<{ __typename?: 'BothAlbums', googleAlbum: { __typename?: 'GoogleAlbum', id: string, title: string, coverPhotoBaseUrl: string }, savedAlbum?: { __typename?: 'Album', id: string, title: string, albumId: string, coverPhotoBaseUrl: string } | null }> };

export type GetGoogleCalendarsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetGoogleCalendarsQuery = { __typename?: 'Query', getGoogleCalendars: Array<{ __typename?: 'GoogleCalendar', name: string, id: string }> };

export type GetGoogleEventQueryVariables = Exact<{
  id: Scalars['String'];
  calendarId: Scalars['String'];
}>;


export type GetGoogleEventQuery = { __typename?: 'Query', getGoogleEvent: { __typename?: 'GoogleEvent', id: string, name: string, startDate: any, endDate: any, allDay: boolean } };

export type GetGoogleEventsQueryVariables = Exact<{
  calendarId: Scalars['String'];
}>;


export type GetGoogleEventsQuery = { __typename?: 'Query', getGoogleEvents: Array<{ __typename?: 'BothEvents', savedEvent?: { __typename?: 'CalendarEvent', name: string, id: string, startDate: any, endDate: any, googleId: string, allDay: boolean, class?: string | null, tags?: Array<{ __typename?: 'Tag', name: string, id: string, categoryId?: string | null, disciplineId?: string | null }> | null } | null, googleEvent: { __typename?: 'GoogleEvent', id: string, name: string, startDate: any, endDate: any, allDay: boolean } }> };

export type GetMyEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyEventsQuery = { __typename?: 'Query', getMyEvents: Array<{ __typename?: 'CalendarEvent', name: string, id: string, startDate: any, endDate: any, googleId: string, allDay: boolean, class?: string | null, tags?: Array<{ __typename?: 'Tag', name: string, id: string, categoryId?: string | null, disciplineId?: string | null }> | null }> };

export type GetPhotosFromAlbumQueryVariables = Exact<{
  albumId: Scalars['String'];
  nextPageToken?: InputMaybe<Scalars['String']>;
}>;


export type GetPhotosFromAlbumQuery = { __typename?: 'Query', getPhotosFromAlbum: { __typename?: 'PhotoResponse', nextPageToken?: string | null, photos: Array<{ __typename?: 'Photo', id: string, baseUrl: string, creationTime: string, width: number, height: number }> } };

export type GetPostQueryVariables = Exact<{
  getPostId: Scalars['String'];
}>;


export type GetPostQuery = { __typename?: 'Query', getPost: { __typename?: 'Post', id: string, createdAt: any, updatedAt: any, title: string, text: string, subtitle?: string | null, publishDate?: any | null, published: boolean, tags?: Array<{ __typename?: 'Tag', name: string, id: string, categoryId?: string | null, disciplineId?: string | null }> | null } };

export type GetPostsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Float']>;
  page?: InputMaybe<Scalars['Float']>;
}>;


export type GetPostsQuery = { __typename?: 'Query', getPosts: Array<{ __typename?: 'Post', id: string, createdAt: any, updatedAt: any, title: string, subtitle?: string | null, publishDate?: any | null, published: boolean, tags?: Array<{ __typename?: 'Tag', name: string, id: string, categoryId?: string | null, disciplineId?: string | null }> | null }> };

export type GetPublishedPostsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Float']>;
  page?: InputMaybe<Scalars['Float']>;
  tagIds?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
}>;


export type GetPublishedPostsQuery = { __typename?: 'Query', getPublishedPosts: { __typename?: 'PaginatedPosts', numOfPages: number, posts: Array<{ __typename?: 'Post', id: string, createdAt: any, updatedAt: any, title: string, subtitle?: string | null, publishDate?: any | null, published: boolean, tags?: Array<{ __typename?: 'Tag', name: string, id: string, categoryId?: string | null, disciplineId?: string | null }> | null }> } };

export type GetResultsTagIdQueryVariables = Exact<{ [key: string]: never; }>;


export type GetResultsTagIdQuery = { __typename?: 'Query', getResultsTagId: string };

export type GetSavedEventQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetSavedEventQuery = { __typename?: 'Query', getSavedEvent: { __typename?: 'CalendarEvent', name: string, id: string, startDate: any, endDate: any, googleId: string, allDay: boolean, class?: string | null, tags?: Array<{ __typename?: 'Tag', name: string, id: string, categoryId?: string | null, disciplineId?: string | null }> | null } };

export type GetTagsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTagsQuery = { __typename?: 'Query', getTags: Array<{ __typename?: 'Tag', name: string, id: string, categoryId?: string | null, disciplineId?: string | null }> };

export const AnswerFragmentDoc = gql`
    fragment Answer on Answer {
  id
  className
  cipherId
  answer
  correct
  time
}
    `;
export const GoogleAlbumFragmentDoc = gql`
    fragment GoogleAlbum on GoogleAlbum {
  id
  title
  coverPhotoBaseUrl
}
    `;
export const AlbumFragmentDoc = gql`
    fragment Album on Album {
  id
  title
  albumId
  coverPhotoBaseUrl
}
    `;
export const BothAlbumsFragmentDoc = gql`
    fragment BothAlbums on BothAlbums {
  googleAlbum {
    ...GoogleAlbum
  }
  savedAlbum {
    ...Album
  }
}
    ${GoogleAlbumFragmentDoc}
${AlbumFragmentDoc}`;
export const TagFragmentDoc = gql`
    fragment Tag on Tag {
  name
  id
  categoryId
  disciplineId
}
    `;
export const CalendarEventFragmentDoc = gql`
    fragment CalendarEvent on CalendarEvent {
  name
  id
  startDate
  endDate
  googleId
  allDay
  class
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
  allDay
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
export const SimpleDisciplineFragmentDoc = gql`
    fragment SimpleDiscipline on Discipline {
  id
  name
}
    `;
export const CategoryFragmentDoc = gql`
    fragment Category on Category {
  id
  name
  disciplines {
    ...SimpleDiscipline
  }
  googleCalendarId
  tag {
    ...Tag
  }
}
    ${SimpleDisciplineFragmentDoc}
${TagFragmentDoc}`;
export const CipherFragmentDoc = gql`
    fragment Cipher on Cipher {
  id
  name
  fileLink
  correctAnswer
  published
  publishDate
}
    `;
export const DisciplineFragmentDoc = gql`
    fragment Discipline on Discipline {
  id
  name
  tag {
    ...Tag
  }
}
    ${TagFragmentDoc}`;
export const GoogleCalendarFragmentDoc = gql`
    fragment GoogleCalendar on GoogleCalendar {
  name
  id
}
    `;
export const PhotoFragmentDoc = gql`
    fragment Photo on Photo {
  id
  baseUrl
  creationTime
  width
  height
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
export const SimpleCategoryFragmentDoc = gql`
    fragment SimpleCategory on Category {
  id
  name
  googleCalendarId
}
    `;
export const UserFragmentDoc = gql`
    fragment User on User {
  id
  email
  name
  class
  role
}
    `;
export const AnswerDocument = gql`
    mutation Answer($cipherId: String!, $answer: String!) {
  answer(cipherId: $cipherId, answer: $answer) {
    ...Answer
  }
}
    ${AnswerFragmentDoc}`;

export function useAnswerMutation() {
  return Urql.useMutation<AnswerMutation, AnswerMutationVariables>(AnswerDocument);
};
export const ChangeRoleOfUserDocument = gql`
    mutation ChangeRoleOfUser($userId: String!, $role: String!) {
  changeRoleOfUser(userId: $userId, role: $role) {
    ...User
  }
}
    ${UserFragmentDoc}`;

export function useChangeRoleOfUserMutation() {
  return Urql.useMutation<ChangeRoleOfUserMutation, ChangeRoleOfUserMutationVariables>(ChangeRoleOfUserDocument);
};
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
export const DeleteAlbumDocument = gql`
    mutation DeleteAlbum($id: String!) {
  deleteAlbum(id: $id)
}
    `;

export function useDeleteAlbumMutation() {
  return Urql.useMutation<DeleteAlbumMutation, DeleteAlbumMutationVariables>(DeleteAlbumDocument);
};
export const DeleteCategoryDocument = gql`
    mutation DeleteCategory($id: String!) {
  deleteCategory(id: $id)
}
    `;

export function useDeleteCategoryMutation() {
  return Urql.useMutation<DeleteCategoryMutation, DeleteCategoryMutationVariables>(DeleteCategoryDocument);
};
export const DeleteCipherDocument = gql`
    mutation DeleteCipher($id: String!) {
  deleteCipher(id: $id)
}
    `;

export function useDeleteCipherMutation() {
  return Urql.useMutation<DeleteCipherMutation, DeleteCipherMutationVariables>(DeleteCipherDocument);
};
export const DeleteDisciplineDocument = gql`
    mutation DeleteDiscipline($id: String!) {
  deleteDiscipline(id: $id)
}
    `;

export function useDeleteDisciplineMutation() {
  return Urql.useMutation<DeleteDisciplineMutation, DeleteDisciplineMutationVariables>(DeleteDisciplineDocument);
};
export const DeleteEventDocument = gql`
    mutation DeleteEvent($id: String!) {
  deleteEvent(id: $id)
}
    `;

export function useDeleteEventMutation() {
  return Urql.useMutation<DeleteEventMutation, DeleteEventMutationVariables>(DeleteEventDocument);
};
export const DeletePostDocument = gql`
    mutation DeletePost($id: String!) {
  deletePost(id: $id)
}
    `;

export function useDeletePostMutation() {
  return Urql.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument);
};
export const DeleteTagDocument = gql`
    mutation DeleteTag($id: String!) {
  deleteTag(id: $id)
}
    `;

export function useDeleteTagMutation() {
  return Urql.useMutation<DeleteTagMutation, DeleteTagMutationVariables>(DeleteTagDocument);
};
export const EditDisciplineDocument = gql`
    mutation EditDiscipline($id: String!, $name: String!) {
  editDiscipline(id: $id, name: $name) {
    ...SimpleDiscipline
  }
}
    ${SimpleDisciplineFragmentDoc}`;

export function useEditDisciplineMutation() {
  return Urql.useMutation<EditDisciplineMutation, EditDisciplineMutationVariables>(EditDisciplineDocument);
};
export const EditTagDocument = gql`
    mutation EditTag($id: String!, $name: String!) {
  editTag(id: $id, name: $name) {
    ...Tag
  }
}
    ${TagFragmentDoc}`;

export function useEditTagMutation() {
  return Urql.useMutation<EditTagMutation, EditTagMutationVariables>(EditTagDocument);
};
export const SaveAlbumDocument = gql`
    mutation SaveAlbum($id: String!) {
  saveAlbum(id: $id)
}
    `;

export function useSaveAlbumMutation() {
  return Urql.useMutation<SaveAlbumMutation, SaveAlbumMutationVariables>(SaveAlbumDocument);
};
export const SaveCipherDocument = gql`
    mutation SaveCipher($id: String, $name: String!, $correctAnswer: String!, $published: Boolean!, $fileLink: String) {
  saveCipher(
    id: $id
    name: $name
    correctAnswer: $correctAnswer
    published: $published
    fileLink: $fileLink
  ) {
    ...Cipher
  }
}
    ${CipherFragmentDoc}`;

export function useSaveCipherMutation() {
  return Urql.useMutation<SaveCipherMutation, SaveCipherMutationVariables>(SaveCipherDocument);
};
export const SaveEventDocument = gql`
    mutation SaveEvent($googleId: String!, $endDate: DateTime!, $startDate: DateTime!, $name: String!, $allDay: Boolean!, $tagIds: [String!], $id: String, $className: String) {
  saveEvent(
    googleId: $googleId
    endDate: $endDate
    startDate: $startDate
    name: $name
    allDay: $allDay
    id: $id
    tagIds: $tagIds
    className: $className
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
export const SetCategoryCalendarDocument = gql`
    mutation SetCategoryCalendar($categoryId: String!, $calendarId: String!) {
  setCategoryCalendar(calendarId: $calendarId, categoryId: $categoryId) {
    ...SimpleCategory
  }
}
    ${SimpleCategoryFragmentDoc}`;

export function useSetCategoryCalendarMutation() {
  return Urql.useMutation<SetCategoryCalendarMutation, SetCategoryCalendarMutationVariables>(SetCategoryCalendarDocument);
};
export const GetAlbumsDocument = gql`
    query GetAlbums {
  getAlbums {
    ...Album
  }
}
    ${AlbumFragmentDoc}`;

export function useGetAlbumsQuery(options?: Omit<Urql.UseQueryArgs<GetAlbumsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAlbumsQuery>({ query: GetAlbumsDocument, ...options });
};
export const GetAllAnswersDocument = gql`
    query GetAllAnswers {
  getAllAnswers {
    ...Answer
  }
}
    ${AnswerFragmentDoc}`;

export function useGetAllAnswersQuery(options?: Omit<Urql.UseQueryArgs<GetAllAnswersQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAllAnswersQuery>({ query: GetAllAnswersDocument, ...options });
};
export const GetAllCiphersDocument = gql`
    query GetAllCiphers {
  getAllCiphers {
    ...Cipher
  }
}
    ${CipherFragmentDoc}`;

export function useGetAllCiphersQuery(options?: Omit<Urql.UseQueryArgs<GetAllCiphersQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAllCiphersQuery>({ query: GetAllCiphersDocument, ...options });
};
export const GetAllUsersDocument = gql`
    query GetAllUsers {
  getAllUsers {
    ...User
  }
}
    ${UserFragmentDoc}`;

export function useGetAllUsersQuery(options?: Omit<Urql.UseQueryArgs<GetAllUsersQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAllUsersQuery>({ query: GetAllUsersDocument, ...options });
};
export const GetAnswersOfMyClassDocument = gql`
    query getAnswersOfMyClass {
  getAnswersOfMyClass {
    ...Answer
  }
}
    ${AnswerFragmentDoc}`;

export function useGetAnswersOfMyClassQuery(options?: Omit<Urql.UseQueryArgs<GetAnswersOfMyClassQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAnswersOfMyClassQuery>({ query: GetAnswersOfMyClassDocument, ...options });
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
export const GetCipherDocument = gql`
    query GetCipher($id: String!) {
  getCipher(id: $id) {
    ...Cipher
  }
}
    ${CipherFragmentDoc}`;

export function useGetCipherQuery(options: Omit<Urql.UseQueryArgs<GetCipherQueryVariables>, 'query'>) {
  return Urql.useQuery<GetCipherQuery>({ query: GetCipherDocument, ...options });
};
export const GetCiphersDocument = gql`
    query GetCiphers {
  getCiphers {
    ...Cipher
  }
}
    ${CipherFragmentDoc}`;

export function useGetCiphersQuery(options?: Omit<Urql.UseQueryArgs<GetCiphersQueryVariables>, 'query'>) {
  return Urql.useQuery<GetCiphersQuery>({ query: GetCiphersDocument, ...options });
};
export const GetEventsDocument = gql`
    query GetEvents {
  getEvents {
    ...CalendarEvent
  }
}
    ${CalendarEventFragmentDoc}`;

export function useGetEventsQuery(options?: Omit<Urql.UseQueryArgs<GetEventsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetEventsQuery>({ query: GetEventsDocument, ...options });
};
export const GetGoogleAlbumsDocument = gql`
    query GetGoogleAlbums {
  getGoogleAlbums {
    ...BothAlbums
  }
}
    ${BothAlbumsFragmentDoc}`;

export function useGetGoogleAlbumsQuery(options?: Omit<Urql.UseQueryArgs<GetGoogleAlbumsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetGoogleAlbumsQuery>({ query: GetGoogleAlbumsDocument, ...options });
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
export const GetGoogleEventDocument = gql`
    query GetGoogleEvent($id: String!, $calendarId: String!) {
  getGoogleEvent(id: $id, calendarId: $calendarId) {
    ...GoogleEvent
  }
}
    ${GoogleEventFragmentDoc}`;

export function useGetGoogleEventQuery(options: Omit<Urql.UseQueryArgs<GetGoogleEventQueryVariables>, 'query'>) {
  return Urql.useQuery<GetGoogleEventQuery>({ query: GetGoogleEventDocument, ...options });
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
export const GetMyEventsDocument = gql`
    query GetMyEvents {
  getMyEvents {
    ...CalendarEvent
  }
}
    ${CalendarEventFragmentDoc}`;

export function useGetMyEventsQuery(options?: Omit<Urql.UseQueryArgs<GetMyEventsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetMyEventsQuery>({ query: GetMyEventsDocument, ...options });
};
export const GetPhotosFromAlbumDocument = gql`
    query GetPhotosFromAlbum($albumId: String!, $nextPageToken: String) {
  getPhotosFromAlbum(albumId: $albumId, nextPageToken: $nextPageToken) {
    photos {
      ...Photo
    }
    nextPageToken
  }
}
    ${PhotoFragmentDoc}`;

export function useGetPhotosFromAlbumQuery(options: Omit<Urql.UseQueryArgs<GetPhotosFromAlbumQueryVariables>, 'query'>) {
  return Urql.useQuery<GetPhotosFromAlbumQuery>({ query: GetPhotosFromAlbumDocument, ...options });
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
    query GetPublishedPosts($limit: Float, $page: Float, $tagIds: [String!]) {
  getPublishedPosts(limit: $limit, page: $page, tagIds: $tagIds) {
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
export const GetResultsTagIdDocument = gql`
    query GetResultsTagId {
  getResultsTagId
}
    `;

export function useGetResultsTagIdQuery(options?: Omit<Urql.UseQueryArgs<GetResultsTagIdQueryVariables>, 'query'>) {
  return Urql.useQuery<GetResultsTagIdQuery>({ query: GetResultsTagIdDocument, ...options });
};
export const GetSavedEventDocument = gql`
    query GetSavedEvent($id: String!) {
  getSavedEvent(id: $id) {
    ...CalendarEvent
  }
}
    ${CalendarEventFragmentDoc}`;

export function useGetSavedEventQuery(options: Omit<Urql.UseQueryArgs<GetSavedEventQueryVariables>, 'query'>) {
  return Urql.useQuery<GetSavedEventQuery>({ query: GetSavedEventDocument, ...options });
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