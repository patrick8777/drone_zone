import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    forum_posts: [],
    events: [],
    selected_discussion: null,
    selected_discussion_replies: null,
    selected_reply_id: null,
}

const forumEventsSlice = createSlice({
    name: 'forum_event',
    initialState: initialState,
    reducers: {
        createForumPost: (state, action) => {
            state.forum_posts = [...state.forum_posts, action.payload]
        },
        loadForumPosts: (state, action) => {
            state.forum_posts = action.payload;
        },
        selectDiscussion: (state, action) => {
            state.selected_discussion = action.payload;
        },
        selectReplyId: (state, action) => {
            state.selected_reply_id = action.payload;
        },
        addReplySelectedDiscussion: (state, action) => {
            const {images: image, ...restPayload} = action.payload;
            const newReply = {
                ...restPayload,
                image,
            };
            state.selected_discussion.replies = [...state.selected_discussion.replies, newReply];
            state.selected_discussion.reply_count += 1;
        },
        deleteReplySelectedDiscussion: (state) => {
            state.selected_discussion.replies = state.selected_discussion.replies.filter((reply) => reply.id !== state.selected_reply_id)
            state.selected_discussion.reply_count -= 1
        },
        updateReplySelectedDiscussion: (state, action) => {
            console.log(action.payload)
            let refReply = state.selected_discussion.replies.find((reply) => reply.id === state.selected_reply_id);
            if (refReply) {
                refReply['text_content'] = action.payload['text_content']
                refReply['image'] = action.payload['images']
            }
        },
        addCommentSelectedDiscussion: (state, action) => {
            let refReply = state.selected_discussion.replies.find((reply) => reply.id === state.selected_reply_id);
            refReply.comments = [...(refReply.comments || []), action.payload]
            refReply.comments_count += 1
        },
        deleteCommentSelectedDiscussion: (state, action) => {
            let refReply = state.selected_discussion.replies.find((reply) => reply.id === state.selected_reply_id);
            refReply.comments = refReply.comments.filter((comment) => comment.id !== action.payload)
            refReply.comments_count -= 1
        },
        updateCommentSelectedDiscussion: (state, action) => {
            let refReply = state.selected_discussion.replies.find((reply) => reply.id === state.selected_reply_id);
            if (refReply) {
                refReply.comments = refReply.comments.map((comment) =>
                    comment.id === action.payload.id ? {
                        ...comment,
                        text_description: action.payload.text_description
                    } : comment
                );
            }
        },
        createEvents: (state, action) => {
            state.events = [...state.events, action.payload]
        },
        loadEvents: (state, action) => {
            state.events = action.payload;
        },
        toggleEventParticipation: (state, action) => {
            const userId = action.payload.user_id;
            const isUserParticipating = state.selected_discussion.participants.includes(userId);
            if (isUserParticipating) {
                state.selected_discussion.participants = state.selected_discussion.participants.filter((participantId) => participantId !== userId);
                state.selected_discussion.participants_count -= 1
            } else {
                state.selected_discussion.participants = [...state.selected_discussion.participants, userId];
                state.selected_discussion.participants_count += 1
            }
        },
        toggleReplyLike: (state, action) => {
            const userId = action.payload.user_id
            let refReply = state.selected_discussion.replies.find((reply) => reply.id === state.selected_reply_id);
            const userLiked = refReply.users_liked.includes(userId)
            const userDisliked = refReply.users_disliked.includes(userId)
            if (userDisliked) {
                refReply.users_disliked = refReply.users_disliked.filter((userDislikedId) => userDislikedId !== userId)
                refReply.dislike_count -= 1
            }
            if (userLiked) {
                refReply.users_liked = refReply.users_liked.filter((userLikedId) => userLikedId !== userId)
                refReply.likes_count -= 1
            } else {
                refReply.users_liked = [...refReply.users_liked, userId]
                refReply.likes_count += 1
            }

        },
        toggleReplyDislike: (state, action) => {
            const userId = action.payload.user_id
            let refReply = state.selected_discussion.replies.find((reply) => reply.id === state.selected_reply_id);
            const userDisliked = refReply.users_disliked.includes(userId)
            const userLiked = refReply.users_liked.includes(userId)
            if (userLiked) {
                refReply.users_liked = refReply.users_liked.filter((userLikedId) => userLikedId !== userId)
                refReply.likes_count -= 1
            }
            if (userDisliked) {
                refReply.users_disliked = refReply.users_disliked.filter((userDislikedId) => userDislikedId !== userId)
                refReply.dislike_count -= 1
            } else {
                refReply.users_disliked = [...refReply.users_disliked, userId]
                refReply.dislike_count += 1
            }

        },
    }
})

export const {
    updateReplySelectedDiscussion,
    updateCommentSelectedDiscussion,
    toggleReplyDislike,
    toggleReplyLike,
    deleteCommentSelectedDiscussion,
    deleteReplySelectedDiscussion,
    toggleEventParticipation,
    addReplySelectedDiscussion,
    createEvents,
    loadEvents,
    selectReplyId,
    addCommentSelectedDiscussion,
    selectDiscussion,
    createForumPost,
    loadForumPosts
} = forumEventsSlice.actions

export default forumEventsSlice.reducer
