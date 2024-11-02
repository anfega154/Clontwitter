import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Post } from './lib/Fetch';


function ComposePost({ userAvatarUrl,iduser }) {
    const [pending, setPending] = useState(false);
    const contentRef = useRef();

    const addPost = async (e) => {
        e.preventDefault();

        const content = contentRef.current.value;

        setPending(true);

        if (!content) {
            setPending(false);
            return;
        }

        if (content.length > 280) {
            toast.error('El contenido no puede superar los 280 caracteres.');
            setPending(false);
            contentRef.current.value = '';
            return;
        }

         await Post('api/v1/tweets', {content});

        setPending(false);
        contentRef.current.value = '';
        // window.location.reload();
    };

    return (
        <form onSubmit={addPost} className='flex flex-row p-3 border-b border-white/20'>
            <img className='rounded-full w-10 h-10 object-contain mr-4' src={userAvatarUrl} alt="" />
            <div className='flex flex-1 flex-col gap-y-4'>
                <textarea
                    ref={contentRef}
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
    );
}

export default ComposePost;
