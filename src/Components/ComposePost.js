import { useRef,useState } from 'react'

function ComposePost({ userAvatarUrl }) {
    const [pending, setPending] = useState(false);
    const addPost = async (formData) => {

        const content = formData.get('content')

        setPending(true);

        setPending(false); 
        formData.delete('content');

    }

    return (
        <form action={addPost} className='flex flex-row p-3 border-b border-white/20'>
            <img className='rounded-full w-10 h-10 object-contain mr-4' src={userAvatarUrl} />
            <div className='flex flex-1 flex-col gap-y-4'>
                <textarea
                    name='content'
                    rows={4}
                    className='w-full text-xl bg-white placeholder-gray-500 p-2'
                    placeholder='¡¿Qué está pasando!?'
                ></textarea>
                <button
                    disabled={pending}
                    type='submit'
                    className='bg-sky-500 text-sm disabled:opacity-40 disabled:pointer-events-none font-bold rounded-full px-5 py-2 self-end'
                >
                    {pending ? 'Posting...' : 'Postear'}

                </button>
            </div>
        </form>
    )
}

export default ComposePost;
