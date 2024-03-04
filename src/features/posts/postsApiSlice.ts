import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { type TPost } from "./post"

type PostsApiResponse = TPost[]

export const postsApiSlice = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://65e5adc3d7f0758a76e70871.mockapi.io/api/v1/posts",
  }),
  tagTypes: ["Posts"],
  endpoints: builder => ({
    getAllPosts: builder.query<PostsApiResponse, void>({
      query: () => "/",
      providesTags: () => [{ type: "Posts", id: "LIST" }],
    }),
    getPostById: builder.query<TPost, string>({
      query: id => `/${id}`,
    }),
    setReaction: builder.mutation<TPost, { id: string; reactions: string[] }>({
      query: ({ id, reactions }) => {
        return {
          url: `/${id}`,
          method: "PUT",
          body: { reactions: [...reactions] },
        }
      },
      invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),
    deleteCard: builder.mutation<TPost, string>({
      query: id => {
        return {
          url: `/${id}`,
          method: "DELETE",
        }
      },
      invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),
  }),
})

export const {
  useGetAllPostsQuery,
  useGetPostByIdQuery,
  useSetReactionMutation,
  useDeleteCardMutation,
} = postsApiSlice
