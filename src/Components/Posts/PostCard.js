import React, { useState, useEffect } from 'react';
import { FaHeart, FaComment, FaRetweet, FaCentos } from 'react-icons/fa';
import { supabase } from './../lib/SupabasseClient'
import {  useAuth } from "../../Auth/AuthContext";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const PostCard = ({ userFullName, username, profileImage, content, postDate, postTime, idPost }) => {
  const { state } = useAuth();
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [avatar] = useState('https://us.123rf.com/450wm/imagevectors/imagevectors1606/imagevectors160600161/58872726-comentario-blanco-icono-en-el-bot%C3%B3n-azul-aislado-en-blanco.jpg');
  const [likes, setLikes] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);
  const [reply, setReply] = useState([]);
  const [existComent, setExistComent] = useState(false);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setCommentText('');
  };

  const openCommentModal = () => {
    setIsCommentModalVisible(true);
  };
  const closeCommentModal = () => {
    setIsCommentModalVisible(false);
  };

  const handleLikeClick = async () => {

    if (state.user && state.user.iduser) {
      setUserId(state.user.iduser);
    }
    try {
      const {error } = await supabase.from('megusta').insert({ id_user: userId, id_post: idPost });
      if (error) {
        toast.error(error.toString());
      }
    } catch (error) {
      toast.error('Error in like:', error.toString());
    }
  };

  const handleCommentClick = () => {

    openModal();
  };

  const handleCommentSubmit = async () => {
    if (state.user && state.user.iduser) {
      setUserId(state.user.iduser);
      setUserName(state.user.username);
    }
    try {
      const {error } = await supabase.from('Reply').insert(
        { content: commentText, id_user: userId, id_post: idPost, user_name: userName });
      if (error) {
        alert(error.toString());
      } else {
        closeModal();
        setCommentText('');
      }
    } catch (error) {
      toast.error('Error in comment:', error.toString());
    }
  };

  const handleRetweetClick = () => {

    toast.success(`Has retwitteado el tweet de ${username}: "${content}"`);
  };

  useEffect(() => {
    const getLikes = () => {
      supabase
        .from('megusta')
        .select('*')
        .eq('id_post', idPost)
        .then(({ data, error }) => {
          if (error) {
            console.log('Error fetching likes:', error);
          } else {
            const count = data.length;
            setLikes(count);
          }
        });
    }
    const intervalId = setInterval(getLikes, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [idPost]);

  const handleViewComent = () => {
    if (state.user && state.user.iduser) {
      setUserName(state.user.username);

    }

    try {
      supabase
        .from('Reply')
        .select('*')
        .eq('id_post', idPost)
        .then(({ data, error }) => {
          if (error) {
            console.error('Error fetching replys:', error);
          } else {
            if (data.length > 0) {
              setExistComent(true);
            }
            setReply(data);
            openCommentModal();
          }
        });
    } catch (error) {
      toast.error('Error:', error.toString());
    }
  }

  useEffect(() => {
    const getComments = () => {
      try {
        supabase
          .from('Reply')
          .select('*')
          .eq('id_post', idPost)
          .then(({ data, error }) => {
            if (error) {
              console.error('Error fetching replys:', error);
            } else {
              if (data) {
                if (data.length > 0) {
                  setExistComent(true);
                }
              }
            }
          });
      } catch (error) {
        toast.error('Error:', error.toString());
      }
    }
    const intervalId = setInterval(getComments, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [idPost]);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 m-4">
      <div className="flex items-center">
        <img src={profileImage} alt={`${username}'s profile`} className="w-12 h-12 rounded-full" />
        <div className="flex flex-col gap-1 items-start justify-center">
          <h4 className="text-small font-semibold leading-none text-default-600">{userFullName}</h4>
          <h5 className="text-small tracking-tight text-default-400">@{username}</h5>
          <p className="text-gray-500 text-sm">{postDate} at {postTime}</p>
        </div>
      </div>
      <p className="mt-4">{content}</p>
      <div className="mt-4 flex items-center">
        <div className="mr-4 flex items-center cursor-pointer" onClick={handleLikeClick}>
          <FaHeart className="text-red-500 text-2xl mr-2" />
          {likes}
        </div>
        <div className="mr-4 cursor-pointer" onClick={handleCommentClick}>
          <FaComment className="text-blue-500 text-2xl" />
        </div>
        {existComent ? (
          <div className="cursor-pointer mr-4" onClick={handleViewComent}>
            <FaCentos className="text-orange-500 text-2xl" />
          </div>
        ) : null}
        <div className="cursor-pointer" onClick={handleRetweetClick}>
          <FaRetweet className="text-green-500 text-2xl" />
        </div>
      </div>
      {isModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-box">
            <p className="text-gray">Comentar en el tweet de {username}:</p>
            <textarea
              placeholder="Escribe tu comentario"
              onChange={(e) => setCommentText(e.target.value)}
              value={commentText}
              className="w-full h-32 p-2 bg-white text-black placeholder-gray-400 rounded"
              rows="4"
            ></textarea>
            <button
              className="w-full bg-blue-400 text-white p-2 rounded hover:bg-blue-500 mb-2"
              onClick={() => handleCommentSubmit(commentText)}
            >
              Comentar
            </button>
            <button className="w-full bg-gray-400 text-white p-2 rounded hover:bg-gray-600" onClick={closeModal}>
              Cancelar
            </button>
          </div>
        </div>
      )}
      {isCommentModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-box max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
            <div className="mb-4">
              <div className="text-2xl font-bold">Comentarios</div>
            </div>
            <div className="space-y-4">
              {reply.map((comment, index) => (
                <div
                  key={index}
                  className="p-4 border-t border-gray-300 flex items-start space-x-4"
                >
                  <div className="flex-shrink-0">
                    <img src={avatar} alt={`${userName}'s profile`} className="w-12 h-12 rounded-full" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold">
                      {comment.user_name}
                    </div>
                    <div className="text-gray-700">{comment.content}</div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full bg-gray-400 text-white p-2 rounded hover:bg-gray-600" onClick={closeCommentModal}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
