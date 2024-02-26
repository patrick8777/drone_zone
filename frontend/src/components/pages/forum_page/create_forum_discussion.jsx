import {Link, useNavigate} from "react-router-dom";
import useSetItem from "../../../hooks/useSetItem.js";
import {useDispatch, useSelector} from "react-redux";
import {api} from "../../../api/api.js";
import {createForumPost} from "../../../features/forumEventsSlice.js";

export default function CreateForumDiscussion() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [category, setCategory] = useSetItem()
    const [question, setQuestion] = useSetItem()
    const [text_description, setTextDescription] = useSetItem()
    const validAccessToken = useSelector((state) => state.user.validAccessToken);


    const handleCreateForumDiscussion = async (e) => {
        e.preventDefault()
        let data = {
            category,
            question,
            text_description,
        }

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${validAccessToken}`,
                }
            };
            const res = await api.post(`/forums/new/`, data, config);
            const resolvedData = res.data;
            dispatch(createForumPost(resolvedData));
            navigate('/forum')
        } catch (error) {
            console.log(error);
            console.error("Failed to post review:", error);
        }
    };


    return (
        <form style={{width: '34.875rem', paddingTop: '3rem', paddingBottom: '3rem'}}>
            <div className="space-y-12">
                <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                    <h2 className='text-center text-white text-2xl font-bold leading-9 tracking-tight ring-gray-300'>
                        Start a forum discussion
                    </h2>
                </div>
                <div>
                    <div className="border-b border-blue-500 pb-12">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-2">
                                <label htmlFor="category"
                                       className="block text-sm font-medium leading-6 text-white">
                                    Category
                                </label>
                                <div style={{height: "2rem"}} className="gap-3 flex mt-2">
                                    <p className='gap-2 flex text-white text-lg'>#</p>
                                    <input
                                        onChange={setCategory}
                                        style={{
                                            border: "none",
                                            outline: 'none',
                                            paddingLeft:'1rem',
                                            paddingRight:'1rem',
                                            borderBottom: '1px solid rgb(224 224 224)'
                                        }}
                                        type="category"
                                        name="category"
                                        id="category"
                                        autoComplete="category"
                                        className="block w-full rounded-full border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="title"
                                       className="block text-sm font-medium leading-6 text-white">
                                    Title
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={setQuestion}
                                        type="text"
                                        name="title"
                                        id="title"
                                        autoComplete="given-name"
                                        className="block w-full rounded-full border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="about" className="block text-sm font-medium leading-6 text-white">
                                    Details
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        onChange={setTextDescription}
                                        style={{height: "6rem"}}
                                        id="about"
                                        name="about"
                                        rows={3}
                                        className="block w-full rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        defaultValue={''}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
                <Link to='/forum'>
                    <button style={{alignItems:'center'}} type="button" className="text-white flex-col flex w-[7rem] h-[2rem] justify-center rounded-full bg-transparent border border-blue-500 text-sm font-semibold shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Cancel
                    </button>
                </Link>
                <button
                    onClick={handleCreateForumDiscussion}
                    type="submit"
                    style={{alignItems:'center'}}
                    className="flex-col flex w-[7rem] h-[2rem] justify-center rounded-full bg-blue-500 border border-blue-500 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Post
                </button>

            </div>
        </form>

    )
}